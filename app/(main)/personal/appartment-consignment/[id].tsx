import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
  RefreshControl,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { router, useLocalSearchParams } from "expo-router";
import {
  cancelConsignment,
  getApartmentStatistic,
  getConsignmentDetail,
} from "@/services/api/consignment";
import { useAuth } from "@/context/AuthContext";
import { getApartmentByOwner } from "@/services/api/apartments";
import { Apartment } from "@/model/apartments";
import { ThemedText } from "@/components/ThemedText";
import ApartmentDetails from "@/components/details/ApartmentDetails";
import BathRoomIcon from "@/assets/icon/details/bathroom";
import BedIcon from "@/assets/icon/details/bedroom";
import AreaIcon from "@/assets/icon/details/area";
import PriceIcon from "@/assets/icon/details/price";
import { formatArea, formatCurrency } from "@/model/other";
import HouseDirectionIcon from "@/assets/icon/details/direction";
import BalconyDirectionIcon from "@/assets/icon/details/balcony";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import View360 from "@/assets/icon/360";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { formatDirection } from "@/utils/format/direction";

const ApartmentConsignmentDetails = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = React.useState<Apartment>();
  const { userInfo } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [statistics, setStatistics] = useState<{
    likesCount: number;
    historyCount: number;
  }>();

  //refresh
  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const fetchConsignmentDetail = async () => {
    try {
      const res = await getApartmentByOwner(id?.toString(), userInfo?.id);
      setData(res.data);
      console.log("consignment", res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const res = await getApartmentStatistic(id?.toString());
      setStatistics(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / 360);
    setCurrentIndex(index);
  };
  React.useEffect(() => {
    fetchConsignmentDetail();
  }, []);

  return (
    <ThemedScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
      }
    >
      <ThemedText type="heading">Chi tiết căn hộ</ThemedText>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
          height: 300,
        }}
      >
        <FlatList
          data={
            data?.images.map((image) => {
              return { uri: image?.imageUrl };
            }) || []
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={360}
          snapToAlignment="center"
          decelerationRate="fast"
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Pressable>
              <Image
                source={item}
                style={{
                  width: 350,
                  height: 300,
                  marginHorizontal: 5,
                }}
                // resizeMode="contain"
                resizeMethod="auto"
              />
            </Pressable>
          )}
          contentContainerStyle={{
            height: 300,
          }}
          style={{
            width: "100%",
          }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "rgba(166, 166, 166, 0.65)",
            width: 50,
            borderRadius: 10,
            marginRight: 10,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginVertical: 10,
              color: "white",
            }}
          >
            {currentIndex + 1}/{data?.images?.length}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginHorizontal: 10,
        }}
      >
        <ThemedText
          type="title"
          style={{
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          {data?.apartmentName}
        </ThemedText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="location-on" size={16} color="#53587A" />
          <TouchableOpacity>
            <ThemedText
              type="default"
              style={{
                fontSize: 16,
                color: "gray",
                textDecorationLine: "underline",
              }}
            >
              {data?.address}
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* price/ Area */}
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
              gap: 20,
            }}
          >
            <View>
              <ThemedText>Mức giá:</ThemedText>
              <ThemedText type="price">
                {formatCurrency(data?.price) || "Liên hệ"}
              </ThemedText>
            </View>
            <View>
              <ThemedText>Diện tích:</ThemedText>
              <ThemedText type="defaultSemiBold">
                {formatArea(data?.area)}
              </ThemedText>
            </View>
          </View>
          {Array.isArray(data?.vrVideoUrls) && data?.vrVideoUrls.length > 0 ? (
            <TouchableOpacity
              style={{
                borderRadius: 100,
                backgroundColor: "#F4F4F4",
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                router.push({
                  pathname: "/(main)/vr/vrview",
                  params: {
                    id: data?.apartmentID,
                  },
                });
              }}
            >
              {/* <Link href="/(main)/vr/vrview"> */}
              <View360 height={40} width={40} />
              {/* </Link> */}
            </TouchableOpacity>
          ) : (
            <View>
              <ThemedText type="default">Không có ảnh 360</ThemedText>
            </View>
          )}
        </View>

        <View style={{ marginVertical: 10 }}>
          <ThemedText type="heading">Mô tả</ThemedText>
          <ThemedText numberOfLines={showFullDescription ? undefined : 6}>
            {data?.description}
          </ThemedText>
          <Pressable
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 5,
            }}
            onPress={toggleDescription}
          >
            <ThemedText type="red">
              {showFullDescription ? "Thu gọn" : "Xem thêm"}
            </ThemedText>
          </Pressable>
        </View>

        <View
          style={{
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ThemedText type="heading">Đặc điểm bất động sản</ThemedText>
          </View>
          <View>
            <ApartmentDetails
              data={formatCurrency(data?.price) || "Liên hệ"}
              Icon={<PriceIcon width={20} height={20} />}
              title="Mức giá"
            />
            <ApartmentDetails
              data={formatArea(data?.area)}
              Icon={<AreaIcon width={20} height={20} />}
              title="Diện tích"
            />
            <ApartmentDetails
              data={data?.numberOfRooms}
              Icon={<BedIcon width={20} height={20} />}
              title="Số phòng ngủ"
            />
            <ApartmentDetails
              data={data?.numberOfBathrooms}
              Icon={<BathRoomIcon width={20} height={20} />}
              title="Số phòng tắm"
            />
            <ApartmentDetails
              data={formatDirection(data?.direction || "")}
              Icon={<HouseDirectionIcon width={20} height={20} />}
              title="Hướng nhà"
            />
            <ApartmentDetails
              data={formatDirection(data?.balconyDirection || "")}
              Icon={<BalconyDirectionIcon width={20} height={20} />}
              title="Hướng ban công"
            />
          </View>
        </View>
      </View>

      <ThemedText type="heading">Thống kê căn hộ</ThemedText>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginVertical: 10,
        }}
      >
        <View
          style={{
            width: 150,
            height: 150,
            borderWidth: 1,
            borderRadius: 20,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <ThemedText
              style={{
                textAlign: "center",
              }}
              type="defaultSemiBold"
            >
              Số lượt xem:
            </ThemedText>
            <ThemedText
              style={{
                textAlign: "center",
                marginTop: 10,
                fontSize: 30,
              }}
              type="heading"
            >
              {statistics?.historyCount}
              <AntDesign name="eyeo" size={24} color="black" />
            </ThemedText>
          </View>
        </View>
        <View
          style={{
            width: 150,
            height: 150,
            borderWidth: 1,
            borderRadius: 20,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <ThemedText
              style={{
                textAlign: "center",
              }}
              type="defaultSemiBold"
            >
              Số lượt thích:
            </ThemedText>
            <ThemedText
              style={{
                textAlign: "center",
                marginTop: 10,
                fontSize: 30,
              }}
              type="heading"
            >
              {statistics?.historyCount}
              <AntDesign name="heart" size={24} color="red" />
            </ThemedText>
          </View>
        </View>
      </View>

      <ThemedText type="heading">Xác nhận tình trạng căn hộ</ThemedText>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <ThemedText type="defaultSemiBold">
          Không còn nhu cầu bán nữa ?{" "}
        </ThemedText>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <ThemedText
          style={{
            fontSize: 20,
          }}
          type="heading"
        >
          Huỷ{" "}
        </ThemedText>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <ThemedText
            style={{
              color: "#FF0000",
            }}
            type="heading"
          >
            tại đây
          </ThemedText>
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: 200,
        }}
      ></View>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          //   onPress={() => {
          //     setModalVisible(!modalVisible);
          //   }}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              borderRadius: 20,
              padding: 20,
              bottom: 0,
              height: 200,
              position: "absolute",
            }}
          >
            <View>
              <ThemedText type="heading">Xác nhận huỷ</ThemedText>
              <ThemedText type="default">
                Không còn nhu cầu bán căn hộ nữa
              </ThemedText>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginVertical: 10,
                  width: "80%",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    cancelConsignment(data?.apartmentID || "");
                    setModalVisible(!modalVisible);
                    router.back();
                  }}
                >
                  <ThemedText type="heading">Xác nhận huỷ</ThemedText>
                </TouchableOpacity>
                <Pressable
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    router.back();
                  }}
                >
                  <ThemedText
                    style={{
                      color: "#FF0000",
                    }}
                    type="heading"
                  >
                    Đóng
                  </ThemedText>
                </Pressable>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </ThemedScrollView>
  );
};

export default ApartmentConsignmentDetails;
