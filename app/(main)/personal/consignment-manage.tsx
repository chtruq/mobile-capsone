import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { ThemedView } from "@/components/ThemedView";
import {
  getConsigmentApartment,
  getListConsignmentsByAccount,
} from "@/services/api/consignment";
import CircleMinusIcon from "@/assets/icon/minus";
import Button from "@/components/button/Button";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { ThemedText } from "@/components/ThemedText";
import CalendarIcon from "@/assets/icon/consignment/calendar";
import { Apartment } from "@/model/apartments";

const ConsignmentList = () => {
  const [consignmentList, setConsignmentList] = React.useState<Apartment[]>();
  const { userInfo } = useAuth();
  const getConsignments = async () => {
    // call api get consignments
    try {
      const response = await getConsigmentApartment(userInfo?.id);
      console.log(response.data?.apartments);
      setConsignmentList(response.data?.apartments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getConsignments();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {!consignmentList || consignmentList.length === 0 ? (
          <>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircleMinusIcon width={35} height={35} />
              <Text>Hiện bạn chưa có căn hộ ký gửi nào</Text>
            </View>
          </>
        ) : (
          <FlatList
            contentContainerStyle={{
              padding: 10,
            }}
            style={{
              width: "100%",
            }}
            data={consignmentList}
            keyExtractor={(item) => item.apartmentID}
            renderItem={({ item }) => (
              <Pressable
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 5,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  backgroundColor: "#fff",
                  display: "flex",
                  justifyContent: "center",
                }}
                onPress={() => {
                  router.push({
                    pathname: "/(main)/personal/appartment-consignment/[id]",
                    params: { id: item.apartmentID },
                  });
                }}
              >
                <View>
                  <ThemedText
                    type="defaultSemiBold"
                    style={{
                      display: "flex",
                      color:
                        item.apartmentStatus == "Pending"
                          ? "#f0ad4e"
                          : item.apartmentStatus == "InProgressing"
                          ? "blue"
                          : item.apartmentStatus == "Accepted"
                          ? "#c0df9c"
                          : item.apartmentStatus == "Completed"
                          ? "green"
                          : item.apartmentStatus == "Rejected"
                          ? "#ccc00"
                          : item.apartmentStatus == "Unavailable"
                          ? "#ccc00"
                          : undefined,
                      backgroundColor:
                        item.apartmentStatus == "Pending"
                          ? "#fff"
                          : item.apartmentStatus == "InProgressing"
                          ? "#blue"
                          : item.apartmentStatus == "Accepted"
                          ? "#c0df9c"
                          : item.apartmentStatus == "Completed"
                          ? "#green"
                          : item.apartmentStatus == "Rejected"
                          ? "#fff"
                          : item.apartmentStatus == "Unavailable"
                          ? "#fff"
                          : undefined,
                    }}
                  >
                    {(item.apartmentStatus == "Pending" &&
                      "Đang chờ xác nhận") ||
                      (item.apartmentStatus == "InProgressing" &&
                        "Đang tiến hành xác nhận") ||
                      (item.apartmentStatus == "Accepted" && "Đã xác nhận") ||
                      (item.apartmentStatus == "Completed" &&
                        "Đã hoàn thành") ||
                      (item.apartmentStatus == "Rejected" && "Đã bị từ chối") ||
                      (item.apartmentStatus == "Unavailable" && "Đã hủy")}
                  </ThemedText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      marginRight: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#e8fdf9",
                      width: 80,
                      height: 80,
                    }}
                  >
                    <CalendarIcon width={40} height={40} />
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        marginBottom: 5,
                      }}
                    >
                      <ThemedText type="small">Mã căn hộ: </ThemedText>
                      <Text>{item.apartmentCode}</Text>
                    </View>
                    <ThemedText
                      style={{
                        marginBottom: 5,
                      }}
                      type="small"
                    >
                      Thời gian tạo:{" "}
                    </ThemedText>
                    <Text>
                      {item.effectiveStartDate &&
                        new Date(item.expiryDate).toLocaleString()}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        )}
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: 20,
        }}
      >
        <Button
          title="Tiến hành ký gửi"
          width={"100%"}
          handlePress={() => {
            console.log("Tiến hành ký gửi");
            router.push({
              pathname: "/(main)/personal/consignment-request",
            });
          }}
        />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ConsignmentList;
