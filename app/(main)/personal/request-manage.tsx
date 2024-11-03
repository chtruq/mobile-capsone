import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import RequestItem from "@/components/personal/RequestItem";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { getDepositHistory } from "@/services/api/deposit";
import { Deposit } from "@/model/deposit";
import { ThemedText } from "@/components/ThemedText";

const RequestManage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { status } = useLocalSearchParams();
  const { userInfo } = useAuth();
  const [data, setData] = useState([]);

  console.log("userInfo:", userInfo?.id);

  const getListRequestDeposit = async () => {
    try {
      const res = await getDepositHistory(userInfo?.id);
      console.log("API response:", res.data);
      setData(res.data);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      throw error;
    }
  };

  const getListAppointment = async () => {
    try {
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (status === "0") {
      getListRequestDeposit();
    } else {
      getListAppointment();
    }
  }, []);

  // const requests = [
  //   {
  //     id: "0912123",
  //     status: "canceled",
  //     requestType: "Yêu cầu tham quan",
  //     createTime: "16/20/2024 - 15:50",
  //     appointmentTime: "16/20/2024 - 15:50",
  //   },
  //   {
  //     id: "0912124",
  //     status: "processed",
  //     requestType: "Yêu cầu tham quan",
  //     createTime: "16/20/2024 - 15:50",
  //     appointmentTime: "16/20/2024 - 15:50",
  //   },
  //   {
  //     id: "0912125",
  //     status: "pending",
  //     requestType: "Yêu cầu tham quan",
  //     createTime: "16/20/2024 - 15:50",
  //     appointmentTime: "16/20/2024 - 15:50",
  //   },
  //   {
  //     id: "0912126",
  //     status: "canceled",
  //     requestType: "Yêu cầu tham quan",
  //     createTime: "16/20/2024 - 15:50",
  //     appointmentTime: "16/20/2024 - 15:50",
  //   },
  // ];

  const EmptyRequestView = () => {
    return (
      <View>
        <ThemedText type="defaultSemiBold">Chưa có yêu cầu nào!</ThemedText>
      </View>
    );
  };

  const renderContent = () => {
    const filterData = (
      number1: number,
      number2?: number,
      number3?: number
    ) => {
      return data.filter((item: Deposit) =>
        [number1, number2, number3].includes(item.depositStatus)
      );
    };

    switch (selectedIndex) {
      case 0:
        return (
          <View>
            {data.length > 0 ? (
              <FlatList
                data={data}
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
        const pendingStatus = filterData(0, 1);

        return (
          <View>
            {pendingStatus.length > 0 ? (
              <FlatList
                data={pendingStatus}
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
      case 2:
        const successStatus = filterData(1);
        return (
          <View>
            {successStatus.length > 0 ? (
              <FlatList
                data={successStatus}
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
      case 3:
        const cancelStatus = filterData(4);
        return (
          <View>
            {cancelStatus.length > 0 ? (
              <FlatList
                data={cancelStatus}
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
      default:
        return null;
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SegmentedControl
        values={["Tất cả", "Chưa xử lý", "Đã xử lý", "Đã hủy"]}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
        tintColor={Colors.light.primary}
        fontStyle={{ color: "#000" }}
        activeFontStyle={{ color: "#FFFFFF", fontWeight: "bold" }}
        backgroundColor="#FFFFFF"
      />
      <View style={styles.contentContainer}>{renderContent()}</View>
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
