import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import RequestItem from "@/components/personal/RequestItem";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { getDepositHistory, getTradeList } from "@/services/api/deposit";
import { Deposit } from "@/model/deposit";
import { ThemedText } from "@/components/ThemedText";
import { getRequestAppointmentList } from "@/services/api/appointment";
import AppoinmentRequest from "@/components/personal/AppoinmentRequest";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getPropertyList } from "@/services/api/property";
import CalendarIcon from "@/assets/icon/consignment/calendar";

const RequestManage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { status } = useLocalSearchParams();
  const { userInfo } = useAuth();
  const [exchangeData, setExchangeData] = useState([]);
  const [listAppointmentData, setListAppointmentData] = useState([]);
  const [consignmentData, setConsignmentData] = useState([]);
  const navigation = useNavigation();

  // useEffect(() => {
  //   let title = "Quản lý yêu cầu"; // Tiêu đề mặc định
  //   if (status === "0") title = "Danh sách yêu cầu";
  //   // if (status === "1") title = "Danh sách lịch hẹn";
  //   // Cập nhật tiêu đề của header
  //   navigation.setOptions({ headerTitle: title });
  // }, [status]);

  const getListTradeDeposit = async () => {
    try {
      const res = await getTradeList(userInfo?.id);
      console.log("traderes", res?.deposits);
      setExchangeData(res?.deposits);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      throw error;
    }
  };

  const getListAppointmentRequest = async () => {
    try {
      const res = await getRequestAppointmentList(userInfo?.id);
      console.log("API response:", res);
      setListAppointmentData(res?.data?.results);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      throw error;
    }
  };

  const getListRequestProperty = async () => {
    try {
      const res = await getPropertyList(userInfo?.id);
      console.log("API response:", res);
      setConsignmentData(res?.data?.results);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      throw error;
    }
  };

  console.log("userInfo", userInfo);

  // const

  // const getListAppointment = async () => {
  //   try {
  //     const res = await getRequestAppointmentList(userInfo?.id);
  //     console.log("API response:", res);
  //     setData(res?.data?.results);
  //   } catch (error) {
  //     console.error("Có lỗi xảy ra:", error);
  //     throw error;
  //   }
  // };

  useEffect(() => {
    if (status === "0") {
      getListTradeDeposit();
      getListAppointmentRequest();
      getListRequestProperty();
    }
  }, []);

  const EmptyRequestView = () => {
    return (
      <View>
        <ThemedText type="defaultSemiBold">Chưa có yêu cầu nào!</ThemedText>
      </View>
    );
  };

  const renderContentDeposit = () => {
    switch (selectedIndex) {
      case 0:
        return (
          <View>
            {exchangeData?.length > 0 ? (
              <FlatList
                data={exchangeData}
                keyExtractor={(item: Deposit) => item.depositID}
                style={{ width: "100%" }}
                renderItem={({ item }) => <RequestItem data={item} />}
              />
            ) : (
              <>
                <EmptyRequestView />
              </>
            )}
          </View>
        );
      case 1:
        return (
          <View>
            {listAppointmentData ? (
              <FlatList
                data={listAppointmentData}
                keyExtractor={(item: AppointmentRequest) => item.requestID}
                style={{ width: "100%" }}
                renderItem={({ item }) => <AppoinmentRequest data={item} />}
              />
            ) : (
              <>
                <EmptyRequestView />
              </>
            )}
          </View>
        );
      case 2:
        return (
          <View>
            {consignmentData ? (
              <FlatList
                data={consignmentData}
                keyExtractor={(item: PropertyRequest) => item.requestID}
                style={{ width: "100%" }}
                renderItem={({ item }) => (
                  <Pressable
                    style={{
                      width: "100%",
                      padding: 10,
                      marginBottom: 10,
                      borderRadius: 8,
                      // shadowColor: "#000",
                      // shadowOffset: {
                      //   width: 0,
                      //   height: 2,
                      // },
                      // shadowOpacity: 0.25,
                      // shadowRadius: 3.84,
                      // elevation: 5,
                      // backgroundColor: "#fff",
                      // display: "flex",
                      // justifyContent: "center",
                      borderColor: "#ccc",
                      borderWidth: 1,
                    }}
                    onPress={() => {
                      router.push({
                        pathname: "/(main)/personal/consignment-detail/[id]",
                        params: { id: item.requestID },
                      });
                    }}
                  >
                    <View>
                      <ThemedText
                        type="defaultSemiBold"
                        style={{
                          display: "flex",
                          color:
                            item.requestStatus == "Pending"
                              ? "#f0ad4e"
                              : item.requestStatus == "InProgressing"
                              ? "blue"
                              : item.requestStatus == "Accepted"
                              ? "#c0df9c"
                              : item.requestStatus == "Completed"
                              ? "green"
                              : item.requestStatus == "Rejected"
                              ? "#ccc"
                              : undefined,
                          backgroundColor:
                            item.requestStatus == "Pending"
                              ? "#fff"
                              : item.requestStatus == "InProgressing"
                              ? "#ccc"
                              : item.requestStatus == "Accepted"
                              ? "#ccc"
                              : item.requestStatus == "Completed"
                              ? "#ccc"
                              : item.requestStatus == "Rejected"
                              ? "#ccc"
                              : undefined,
                        }}
                      >
                        {(item.requestStatus == "Pending" &&
                          "Đang chờ xác nhận") ||
                          (item.requestStatus == "InProgressing" &&
                            "Đang tiến hành xác nhận") ||
                          (item.requestStatus == "Accepted" && "Đã xác nhận") ||
                          (item.requestStatus == "Completed" &&
                            "Đã hoàn thành") ||
                          (item.requestStatus == "Rejected" && "Đã từ chối")}
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
                          <ThemedText type="small">Mã yêu cầu: </ThemedText>
                          <Text>{item.propertyRequestCode}</Text>
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
                          {item.requestDate &&
                            new Date(item.requestDate).toLocaleString()}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                )}
              />
            ) : (
              <>
                <EmptyRequestView />
              </>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  // const renderContentAppointment = () => {
  //   return (
  //     <View>
  //       {data?.length > 0 ? (
  //         <FlatList
  //           data={data}
  //           keyExtractor={(item: Deposit) => item.depositID}
  //           style={{ width: "100%" }}
  //           renderItem={({ item }) => <RequestItem data={item} />}
  //         />
  //       ) : (
  //         <>
  //           <EmptyRequestView />
  //         </>
  //       )}
  //     </View>
  //   );
  // };

  return (
    <ThemedView style={styles.container}>
      <SegmentedControl
        values={["Trao đổi", "Tư vấn", "Ký gửi"]}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
        tintColor={Colors.light.primary}
        fontStyle={{ color: "#000" }}
        activeFontStyle={{ color: "#FFFFFF", fontWeight: "bold" }}
        backgroundColor="#FFFFFF"
      />
      <View style={styles.contentContainer}>{renderContentDeposit()}</View>
    </ThemedView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FFFFFF",
    padding: 16,
  },
  contentContainer: {
    marginTop: 20,
    width: "100%",
  },
  emptyText: {
    color: "#999999",
    fontSize: 16,
  },
});

export default RequestManage;
