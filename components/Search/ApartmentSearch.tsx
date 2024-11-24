import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Touchable,
  ScrollView,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
import { ThemedView } from "../ThemedView";
import FilterIcon from "@/assets/icon/search/FilterIcon";
import { ThemedText } from "../ThemedText";
import { AntDesign, Feather } from "@expo/vector-icons";
import Button from "../button/Button";
import HCMCData from "../../utils/address/HCMC_tree.json";
import { Picker } from "@react-native-picker/picker";
import { Apartment, ApartmentTypes } from "@/model/apartments";
import Checkbox from "expo-checkbox";
import PriceRanges from "./filter/PriceRanges";
import AreaRanges from "./filter/AreaRanges";
import RoomRanges from "./filter/RoomRanges";
import ApartmentDirection from "./filter/ApartmentDirection";
import { apartmentsSearch } from "@/services/api/apartments";
import ApartmentCard from "./Apartment/ApartmentCard";
import { useAuth } from "@/context/AuthContext";
interface ApartmentSearchProps {
  data: any;
  searchQuery: string;
}

interface ItemCheckboxProps {
  item: { label: string; value: number };
  handlePress: (value: number) => void;
  selected?: boolean;
}

const ItemCheckbox: FC<ItemCheckboxProps> = ({
  item,
  handlePress,
  selected,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
      }}
      onPress={() => {
        handlePress(item.value);
      }}
    >
      <ThemedText>{item.label}</ThemedText>
      <Checkbox
        value={selected}
        onValueChange={() => handlePress(item.value)}
        color={selected ? "#4630EB" : undefined}
      />
    </TouchableOpacity>
  );
};

const ApartmentSearch: FC<ApartmentSearchProps> = ({ data, searchQuery }) => {
  const [selectedSort, setSelectedSort] = React.useState("");

  const [ApartmentData, setApartmentData] = React.useState<Apartment[]>([]);

  const [visible, setVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const options = [
    { label: "Mới nhất", value: "" },
    { label: "Giá tăng dần", value: "ascprice" },
    { label: "Giá giảm dần", value: "desprice" },
  ];
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [isWardOpen, setIsWardOpen] = useState(false);
  const { userInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [formParams, setFormParams] = useState({
    apartmentName: searchQuery,
    district: "",
    ward: "",
    apartmentTypes: [] as number[],
    minPrice: 0,
    maxPrice: 0,
    minArea: 0,
    maxArea: 0,
    numberOfRooms: 0,
    numberOfBathrooms: 0,
    directions: [] as number[],
    balconyDirections: [] as number[],
    accountId: userInfo?.id,
  });

  const handleSelect = (item: any) => {
    setSelectedSort(item.label);
    setVisible(false);
  };

  const handleSelectFilter = (item: any) => {
    setFilterVisible(false);
  };

  const districtMapping = Object.values(HCMCData["quan-huyen"]).reduce(
    (acc: any, district: any) => {
      if (district.code === null) {
        acc[district.code] = "Chọn quận huyện";
      } else {
        acc[district.code] = district.name_with_type;
      }
      return acc;
    },
    { null: "Chọn quận huyện" }
  );

  const wardMapping = Object.values(HCMCData["quan-huyen"]).reduce(
    (acc: any, district: any) => {
      acc[district.code] = Object.values(district["xa-phuong"]).reduce(
        (wardAcc: any, ward: any) => {
          if (ward.code === null) {
            wardAcc[ward.code] = "Phường, Xã";
          } else {
            wardAcc[ward.code] = ward.name_with_type;
          }
          return wardAcc;
        },
        { null: "Phường, Xã" } // Ensure the default value is included
      );
      return acc;
    },
    {}
  );

  const renderDistrictPickerItems = () => {
    return Object.values(HCMCData["quan-huyen"]).map((district) => (
      <Picker.Item
        key={district.code}
        label={district.name}
        value={district.code}
      />
    ));
  };

  const renderWardPickerItems = () => {
    if (!selectedDistrict) return null;
    const wards = HCMCData["quan-huyen"][selectedDistrict]?.["xa-phuong"];
    if (!wards) return null;
    return Object.values(wards).map((ward: any) => (
      <Picker.Item key={ward.code} label={ward.name} value={ward.code} />
    ));
  };

  //loai hinh

  const renderApartmentType = () => {
    return ApartmentTypes.map((item) => (
      <ItemCheckbox
        key={item.value}
        item={item}
        handlePress={(value) => handleApartmentTypePress(value)}
        selected={formParams.apartmentTypes.includes(item.value)}
      />
    ));
  };

  const handleApartmentTypePress = (value: number) => {
    setFormParams((prevParams) => {
      const isSelected = prevParams.apartmentTypes.includes(value);
      const newApartmentTypes = isSelected
        ? prevParams.apartmentTypes.filter((type) => type !== value)
        : [...prevParams.apartmentTypes, value];
      return { ...prevParams, apartmentTypes: newApartmentTypes };
    });
  };

  //khoang gia

  const handlePriceRangePress = (min: number, max: number) => {
    setFormParams((prevParams) => {
      return { ...prevParams, minPrice: min, maxPrice: max };
    });
    console.log("formParams", formParams);
  };

  const handleAreaRangePress = (min: number, max: number) => {
    setFormParams((prevParams) => {
      return { ...prevParams, minArea: min, maxArea: max };
    });
  };

  const handleBedroomRangePress = (numberofrooms: number) => {
    setFormParams((prevParams) => {
      return { ...prevParams, numberOfRooms: numberofrooms };
    });
  };

  const handleBathroomRangePress = (numberofbathrooms: number) => {
    setFormParams((prevParams) => {
      return { ...prevParams, numberOfBathrooms: numberofbathrooms };
    });
  };

  const handleDirectionPress = (value: number) => {
    setFormParams((prevParams) => {
      const isSelected = prevParams.directions.includes(value);
      const newDirections = isSelected
        ? prevParams.directions.filter((direction) => direction !== value)
        : [...prevParams.directions, value];
      return { ...prevParams, directions: newDirections };
    });
  };

  const handleBalconyDirectionPress = (value: number) => {
    setFormParams((prevParams) => {
      const isSelected = prevParams.balconyDirections.includes(value);
      const newBalconyDirections = isSelected
        ? prevParams.balconyDirections.filter(
            (direction) => direction !== value
          )
        : [...prevParams.balconyDirections, value];
      return { ...prevParams, balconyDirections: newBalconyDirections };
    });
  };

  // useEffect(() => {
  //   console.log("formParams", formParams);
  // }, [formParams]);

  const processFormData = (formParams: any) => {
    // Example: Remove empty or null values
    const processedParams = { ...formParams };

    // Remove empty or null values
    Object.keys(processedParams).forEach((key) => {
      if (
        processedParams[key] === null ||
        processedParams[key] === "" ||
        (Array.isArray(processedParams[key]) &&
          processedParams[key].length === 0)
      ) {
        delete processedParams[key];
      }
    });

    if (processedParams.apartmentName === "") {
      delete processedParams.apartmentName;
    }

    if (processedParams.district === "Chọn quận huyện") {
      delete processedParams.district;
    }
    if (processedParams.ward === "Chọn phường xã") {
      delete processedParams.ward;
    }

    if (processedParams.numberOfRooms === 0) {
      delete processedParams.numberOfRooms;
    }
    if (processedParams.numberOfBathrooms === 0) {
      delete processedParams.numberOfBathrooms;
    }
    if (processedParams.minPrice === 0) {
      delete processedParams.minPrice;
    }
    if (processedParams.maxPrice === 0) {
      delete processedParams.maxPrice;
    }
    if (processedParams.minArea === 0) {
      delete processedParams.minArea;
    }
    if (processedParams.maxArea === 0) {
      delete processedParams.maxArea;
    }

    return processedParams;
  };

  const getApartmentData = async () => {
    if (isLoading || (!hasMore && isLoadMore)) return;

    setIsLoading(true);
    const processedParams = processFormData({
      ...formParams,
      pageIndex: pageNumber,
      pageSize: 10,
    });
    try {
      const response = await apartmentsSearch(processedParams);
      if (isLoadMore) {
        setApartmentData((prev) => [...prev, ...response.data?.apartments]);
      } else {
        setApartmentData(response.data?.apartments);
      }
      setHasMore(response.data?.apartments.length === 10); // Kiểm tra còn data không
      setPageNumber(pageNumber);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApartmentData();
  }, []);

  const clearAllFilters = () => {
    setFormParams({
      apartmentName: "",
      district: "",
      ward: "",
      apartmentTypes: [],
      minPrice: 0,
      maxPrice: 0,
      minArea: 0,
      maxArea: 0,
      numberOfRooms: 0,
      numberOfBathrooms: 0,
      directions: [],
      balconyDirections: [],
      accountId: userInfo?.id,
    });
    setSelectedDistrict(null);
    setSelectedWard(null);
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getApartmentData();
    setRefreshing(false);
    clearAllFilters();
  }, []);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setIsLoadMore(true);
      setPageNumber((prev) => prev + 1);
      getApartmentData();
    }
  };

  return (
    <ThemedView
      style={{
        padding: 8,
      }}
    >
      <ScrollView
        style={{
          marginBottom: 110,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#4630EB"]}
          />
        }
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 20;

          if (isCloseToBottom) {
            handleLoadMore();
          }
        }}
        scrollEventThrottle={400}
      >
        {isLoading && (
          <View style={{ padding: 10 }}>
            <ActivityIndicator size="small" color="#4630EB" />
          </View>
        )}
        <View style={styles.filter}>
          <TouchableOpacity
            onPress={() => {
              setFilterVisible(!filterVisible);
            }}
            style={styles.filterItem}
          >
            <FilterIcon />
            <ThemedText type="defaultSemiBold">Bộ lọc</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterItem}>
            <ThemedText type="defaultSemiBold">Loại hình</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterItem}>
            <ThemedText type="defaultSemiBold">Khoảng giá</ThemedText>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <ThemedText type="small">
              {ApartmentData.length} căn hộ được tìm thấy
            </ThemedText>
          </View>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            onPress={() => setVisible(true)}
          >
            <ThemedText type="small">
              {selectedSort ? selectedSort : "Mới nhất"}
            </ThemedText>
            <AntDesign name="down" size={16} color="#252B5C" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {ApartmentData.length === 0 && (
            <ThemedText>Không tìm thấy căn hộ nào</ThemedText>
          )}
          {ApartmentData?.length > 0 &&
            ApartmentData.map((item: Apartment) => (
              <ApartmentCard key={item.apartmentID} data={item} />
            ))}
        </View>
      </ScrollView>
      {/* sortby */}
      <Modal
        transparent={true}
        visible={visible}
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.filter}
            >
              <ThemedText>Huỷ</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* filter */}
      <Modal
        transparent={true}
        visible={filterVisible}
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.filterModelBackground}>
          <View style={styles.filterModelContainer}>
            <View style={styles.filterModelHeader}>
              <TouchableOpacity
                onPress={() => setFilterVisible(false)}
                style={styles.filter}
              >
                <Feather name="x" size={24} color="black" />
              </TouchableOpacity>

              <ThemedText type="heading">Bộ lọc</ThemedText>
              <TouchableOpacity onPress={clearAllFilters} style={styles.filter}>
                <ThemedText
                  style={{
                    textDecorationLine: "underline",
                  }}
                  type="defaultSemiBold"
                >
                  Đặt lại
                </ThemedText>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.filterModelContent}>
              <View>
                <ThemedText type="heading">Địa điểm</ThemedText>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setIsDistrictOpen(!isDistrictOpen);
                      if (isWardOpen) setIsWardOpen(false);
                    }}
                    style={styles.address}
                  >
                    <Text style={styles.dropdownText}>
                      {selectedDistrict
                        ? districtMapping[selectedDistrict]
                        : "Chọn quận/huyện"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      if (!selectedDistrict) return;
                      if (isWardOpen) setIsWardOpen(false);
                      if (selectedDistrict === null) return;
                      if (selectedDistrict !== null) setIsWardOpen(!isWardOpen);
                      // setIsWardOpen(!isWardOpen);
                    }}
                    style={styles.address}
                  >
                    <Text style={styles.dropdownText}>
                      {selectedWard && selectedDistrict
                        ? wardMapping[selectedDistrict][selectedWard]
                        : "Chọn phường/xã"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {isDistrictOpen && (
                  <Picker
                    selectedValue={selectedDistrict}
                    onValueChange={(itemValue) => {
                      setSelectedDistrict(itemValue);
                      setSelectedWard(null); // Reset ward when district changes
                      setIsDistrictOpen(false);
                      setFormParams((prevParams) => ({
                        ...prevParams,
                        district: selectedDistrict
                          ? districtMapping[selectedDistrict]
                          : "",
                      }));
                    }}
                  >
                    <Picker.Item label="Chọn quận/huyện" value={null} />
                    {renderDistrictPickerItems()}
                  </Picker>
                )}

                {selectedDistrict &&
                  isWardOpen &&
                  selectedDistrict !== null && (
                    <Picker
                      selectedValue={selectedWard}
                      onValueChange={(itemValue) => {
                        setSelectedWard(itemValue);
                        setIsWardOpen(false);
                        setFormParams((prevParams) => ({
                          ...prevParams,
                          ward: selectedWard
                            ? wardMapping[selectedDistrict][selectedWard]
                            : "",
                        }));
                      }}
                    >
                      <Picker.Item label="Chọn phường/xã" value={""} />
                      {renderWardPickerItems()}
                    </Picker>
                  )}
              </View>
              <View>
                <ThemedText type="heading">Loại hình</ThemedText>
                {renderApartmentType()}
              </View>
              <View
                style={{
                  width: "100%",
                }}
              >
                <ThemedText type="heading">Khoảng giá</ThemedText>
                <PriceRanges
                  onPress={handlePriceRangePress}
                  selectedMin={formParams.minPrice}
                  selectedMax={formParams.maxPrice}
                />
                <ThemedText>Hoặc nhập khoảng (đơn vị VND)</ThemedText>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    placeholder="Tối thiểu"
                    style={styles.priceInput}
                    value={formParams.minPrice.toString()}
                    onChangeText={(text) =>
                      setFormParams((prevParams) => ({
                        ...prevParams,
                        minPrice: parseInt(text),
                      }))
                    }
                  />
                  <ThemedText type="default"> - </ThemedText>
                  <TextInput
                    placeholder="Tối đa"
                    style={styles.priceInput}
                    value={formParams.maxPrice.toString()}
                    onChangeText={(text) =>
                      setFormParams((prevParams) => ({
                        ...prevParams,
                        maxPrice: parseInt(text),
                      }))
                    }
                  />
                </View>
              </View>
              <View>
                <ThemedText type="heading">Diện tích</ThemedText>
                <AreaRanges
                  onPress={handleAreaRangePress}
                  selectedMin={formParams.minArea}
                  selectedMax={formParams.maxArea}
                />
                <ThemedText>Hoặc nhập khoảng (đơn vị m2)</ThemedText>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    placeholder="Tối thiểu"
                    style={styles.priceInput}
                    value={formParams.minArea.toString()}
                    onChangeText={(text) =>
                      setFormParams((prevParams) => ({
                        ...prevParams,
                        minArea: parseInt(text),
                      }))
                    }
                  />
                  <ThemedText type="default"> - </ThemedText>
                  <TextInput
                    placeholder="Tối đa"
                    style={styles.priceInput}
                    value={formParams.maxArea.toString()}
                    onChangeText={(text) =>
                      setFormParams((prevParams) => ({
                        ...prevParams,
                        maxArea: parseInt(text),
                      }))
                    }
                  />
                </View>
              </View>
              <View>
                <ThemedText type="heading">Phòng ngủ và Toilet</ThemedText>
                <ThemedText type="defaultSemiBold">Phòng ngủ</ThemedText>
                <RoomRanges
                  onPress={handleBedroomRangePress}
                  selectedRoom={formParams.numberOfRooms}
                />
                <ThemedText type="defaultSemiBold">Toilet</ThemedText>
                <RoomRanges
                  onPress={handleBathroomRangePress}
                  selectedRoom={formParams.numberOfBathrooms}
                />
              </View>
              <View>
                <ThemedText type="heading">Hướng nhà</ThemedText>
                <ApartmentDirection
                  onPress={handleDirectionPress}
                  selectedDirections={formParams.directions}
                />
              </View>
              <View>
                <ThemedText type="heading">Hướng ban công</ThemedText>
                <ApartmentDirection
                  onPress={handleBalconyDirectionPress}
                  selectedDirections={formParams.balconyDirections}
                />
              </View>
            </ScrollView>
            <View style={styles.filterModelFooter}>
              <Button
                width={"100%"}
                title="Áp dụng"
                handlePress={getApartmentData}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
};

export default ApartmentSearch;

const styles = StyleSheet.create({
  filter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 16,
    padding: 8,
  },

  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 5,
  },
  dropdown: {
    width: 200,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  dropdownText: {
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 250,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
  filterModelBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
  },
  filterModelContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    height: "100%",
  },
  filterModelHeader: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  filterModelContent: {
    padding: 5,
    marginBottom: 100,
  },
  filterModelFooter: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    paddingBottom: 10,
    height: 100,
  },
  address: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    width: 150,
    height: 60,
  },
  priceInput: {
    width: "48%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    padding: 20,
    fontSize: 16,
  },
});
