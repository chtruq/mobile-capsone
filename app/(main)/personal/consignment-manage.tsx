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
import { getListConsignmentsByAccount } from "@/services/api/consignment";
import CircleMinusIcon from "@/assets/icon/minus";
import Button from "@/components/button/Button";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { ThemedText } from "@/components/ThemedText";
import CalendarIcon from "@/assets/icon/consignment/calendar";

const ConsignmentList = () => {
  const [consignmentList, setConsignmentList] = React.useState<Property[]>();
  const { userInfo } = useAuth();
  const getConsignments = async () => {
    // call api get consignments
    try {
      const res = await getListConsignmentsByAccount(userInfo?.id);
      // const res = await getListConsignmentsByAccount(
      //   "373c06ff-936d-4f76-80b2-08dcf1ada0ec"
      // );
      console.log("API response:", res);
      setConsignmentList(res.data?.results);
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
            keyExtractor={(item) => item.requestID}
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
                    {(item.requestStatus == "Pending" && "Đang chờ xác nhận") ||
                      (item.requestStatus == "InProgressing" &&
                        "Đang tiến hành xác nhận") ||
                      (item.requestStatus == "Accepted" && "Đã xác nhận") ||
                      (item.requestStatus == "Completed" && "Đã hoàn thành") ||
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
