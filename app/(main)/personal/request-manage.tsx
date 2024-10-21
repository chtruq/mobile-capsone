import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import RequestItem from "@/components/personal/RequestItem";

const RequestManage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const requests = [
    {
      id: "0912123",
      status: "canceled",
      requestType: "Yêu cầu tham quan",
      createTime: "16/20/2024 - 15:50",
      appointmentTime: "16/20/2024 - 15:50",
    },
    {
      id: "0912124",
      status: "processed",
      requestType: "Yêu cầu tham quan",
      createTime: "16/20/2024 - 15:50",
      appointmentTime: "16/20/2024 - 15:50",
    },
    {
      id: "0912125",
      status: "pending",
      requestType: "Yêu cầu tham quan",
      createTime: "16/20/2024 - 15:50",
      appointmentTime: "16/20/2024 - 15:50",
    },
    {
      id: "0912126",
      status: "canceled",
      requestType: "Yêu cầu tham quan",
      createTime: "16/20/2024 - 15:50",
      appointmentTime: "16/20/2024 - 15:50",
    },
  ];

  const renderContent = () => {
    switch (selectedIndex) {
      case 0:
        return (
          <View>
            {requests.length > 0 ? (
              <FlatList
                data={requests}
                keyExtractor={(item) => item.id}
                style={{ width: "100%" }}
                renderItem={({ item }) => (
                  <RequestItem
                    status={item.status}
                    requestId={item.id}
                    requestType={item.requestType}
                    createTime={item.createTime}
                    appointmentTime={item.appointmentTime}
                  />
                )}
              />
            ) : (
              <View>
                <Text style={styles.emptyText}>Chưa có yêu cầu nào</Text>
              </View>
            )}
          </View>
        );
      case 1:
        return <Text style={styles.emptyText}>Chưa xử lý yêu cầu</Text>;
      case 2:
        return <Text style={styles.emptyText}>Đã xử lý yêu cầu</Text>;
      case 3:
        return <Text style={styles.emptyText}>Đã hủy yêu cầu</Text>;
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
