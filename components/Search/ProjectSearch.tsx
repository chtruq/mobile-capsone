import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  ScrollView,
} from "react-native";
import React, { FC, useEffect } from "react";
import { ThemedView } from "../ThemedView";
import FilterIcon from "@/assets/icon/search/FilterIcon";
import { ThemedText } from "../ThemedText";
import { Feather } from "@expo/vector-icons";
import HCMCData from "../../utils/address/HCMC_tree.json";
import { Picker } from "@react-native-picker/picker";
import { getProjects, projectsSearch } from "@/services/api/project";
import ProjectCard from "./Project/ProjectCard";
import { ProjectApartment } from "@/model/projects";

interface ProjectSearchProps {
  searchQuery?: string;
}

const ProjectSearch: FC<ProjectSearchProps> = ({ searchQuery }) => {
  const [filterVisible, setFilterVisible] = React.useState(false);
  const [selectedSort, setSelectedSort] = React.useState("Mới nhất");
  const options = [
    { label: "Mới nhất", value: "" },
    { label: "Giá tăng dần", value: "ascprice" },
    { label: "Giá giảm dần", value: "desprice" },
  ];
  const [visible, setVisible] = React.useState(false);
  const [selected, setSelected] = React.useState(options[0]);
  const [amount, setAmount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [projectsData, setProjectsData] = React.useState<ProjectApartment[]>(
    []
  );
  const [loading, setLoading] = React.useState(false);

  const [selectedDistrict, setSelectedDistrict] = React.useState(null);
  const [selectedWard, setSelectedWard] = React.useState(null);
  const [isDistrictOpen, setIsDistrictOpen] = React.useState(false);
  const [isWardOpen, setIsWardOpen] = React.useState(false);

  const [formParams, setFormParams] = React.useState({
    district: "",
    ward: "",
  });

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

  const clearFilter = () => {
    setSelectedDistrict(null);
    setSelectedWard(null);
    setFormParams({
      district: "",
      ward: "",
    });
  };

  const getProjectData = async (page: number) => {
    try {
      setLoading(true);
      const response = await projectsSearch(searchQuery || "", page);
      setProjectsData((prevData) => [...prevData, ...response?.data?.projects]);
      setAmount(response?.data?.totalItems);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setProjectsData([]);
    setPage(1);
    getProjectData(1);
  }, [searchQuery]);

  const handleLoadMore = () => {
    if (!loading) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        getProjectData(nextPage);
        return nextPage;
      });
    }
  };

  const handleSelect = (item: { label: string; value: string }) => {
    setSelectedSort(item.label);
    setVisible(false);
  };

  return (
    <ThemedView
      style={{
        justifyContent: "center",
        marginHorizontal: 10,
        paddingBottom: 100,
      }}
    >
      <View style={styles.filerout}>
        <TouchableOpacity
          onPress={() => {
            setFilterVisible(!filterVisible);
          }}
          style={styles.filterItem}
        >
          <FilterIcon />
          <ThemedText type="defaultSemiBold">Bộ lọc</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <ThemedText type="small">{amount} dự án được tìm thấy</ThemedText>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            setVisible(true);
          }}
        >
          <ThemedText type="small">{selectedSort}</ThemedText>
          <Feather name="chevron-down" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={projectsData}
        keyExtractor={(item) => item.projectApartmentID.toString()}
        renderItem={({ item }) => <ProjectCard data={item} />}
        ListEmptyComponent={<Text>Không có dự án nào</Text>}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <Text>Loading...</Text> : null}
      />

      <Modal
        transparent={true}
        visible={visible}
        animationType="fade"
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
              style={[
                styles.filter,
                { flexDirection: "row", justifyContent: "center" },
              ]}
            >
              <ThemedText>Huỷ</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={filterVisible}
        onRequestClose={() => {
          setFilterVisible(!filterVisible);
        }}
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
              <TouchableOpacity
                // onPress={clearFilter}
                style={styles.filter}
              >
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
            <View style={styles.filterModelContent}>
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
            </View>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  filter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 8,
  },
  filerout: {
    width: "20%",
    marginTop: 15,
  },
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 5,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
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
  dropdownText: {
    textAlign: "center",
  },
});

export default ProjectSearch;
