import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const RequestDetail = () => {
  const { id } = useLocalSearchParams();

  let statusStyle = styles.statusPending;
  let statusText = "Chờ xử lý";
  let statusNoti =
    "Yêu cầu tư vấn tham quan dự án của Quý Khách hàng đang chờ xử lý.";

  const status = "processed";

  switch (status) {
    case "processed":
      statusStyle = styles.statusProcessed;
      statusText = "Đã xử lý";
      statusNoti =
        "Yêu cầu tư vấn tham quan dự án của Quý Khách hàng đã được xử lý.";
      break;
    case "canceled":
      statusStyle = styles.statusCanceled;
      statusText = "Đã hủy";
      statusNoti =
        "Yêu cầu tư vấn tham quan dự án của Quý Khách hàng đã bị hủy.";
      break;
    case "pending":
    default:
      statusStyle = styles.statusPending;
      statusText = "Chờ xử lý";
      statusNoti =
        "Yêu cầu tư vấn tham quan dự án của Quý Khách hàng đang chờ xử lý.";
      break;
  }

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.statusIndicator, statusStyle]}>
        <View>
          <ThemedText type="heading" style={styles.statusText}>
            {statusText}
          </ThemedText>
          <ThemedText style={styles.statusText}>{statusNoti}</ThemedText>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.requestId}>Mã yêu cầu: {id}</Text>
        <Text style={styles.requestType}>Yêu cầu tham quan</Text>
        <View style={styles.timeRow}>
          <View style={styles.timeInfo}>
            <View>
              <Text style={styles.timeText}>Thời gian tạo</Text>
              <Text style={styles.timeValue}>16/20/2024 - 15:50</Text>
            </View>
          </View>
          <View style={styles.timeInfo}>
            <View>
              <Text style={styles.timeText}>Thời gian hẹn</Text>
              <Text style={styles.timeValue}>16/20/2024 - 15:50</Text>
            </View>
          </View>
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusPending: {
    backgroundColor: "#FFB412",
  },
  statusProcessed: {
    backgroundColor: "#8BC840",
  },
  statusCanceled: {
    backgroundColor: "#5C6085",
  },
  statusIndicator: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    justifyContent: "center",
    // alignItems: "center",
  },
  statusText: {
    color: "#FFFFFF",
  },
  contentContainer: {
    padding: 10,
  },
  requestId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  requestType: {
    fontSize: 16,
  },
  timeRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  timeInfo: {
    flex: 1,
  },
  timeText: {
    color: "#999999",
  },
  timeValue: {
    color: "#333333",
  },
});

export default RequestDetail;
