import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface RequestItemProps {
  status: string;
  requestId: string;
  requestType: string;
  createTime: string;
  appointmentTime: string;
}

const RequestItem: FC<RequestItemProps> = ({
  status,
  requestId,
  requestType,
  createTime,
  appointmentTime,
}) => {
  // Set status styles
  let statusStyle = styles.statusPending;
  let statusText = "Chờ xử lý";

  switch (status) {
    case "processed":
      statusStyle = styles.statusProcessed;
      statusText = "Đã xử lý";
      break;
    case "canceled":
      statusStyle = styles.statusCanceled;
      statusText = "Đã hủy";
      break;
    case "pending":
    default:
      statusStyle = styles.statusPending;
      statusText = "Chờ xử lý";
      break;
  }

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        router.push({
          pathname: "/personal/request-detail/[id]",
          params: { id: requestId },
        });
      }}
    >
      <View style={[styles.statusIndicator, statusStyle]}>
        <Text style={styles.statusText}>{statusText}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.requestId}>Mã yêu cầu: {requestId}</Text>
        <Text style={styles.requestType}>{requestType}</Text>
        <View style={styles.timeRow}>
          <View style={styles.timeInfo}>
            <View>
              <Text style={styles.timeText}>Thời gian tạo</Text>
              <Text style={styles.timeValue}>{createTime}</Text>
            </View>
          </View>
          <View style={styles.timeInfo}>
            <View>
              <Text style={styles.timeText}>Thời gian hẹn</Text>
              <Text style={styles.timeValue}>{appointmentTime}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  statusIndicator: {
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 6,
  },
  statusProcessed: {
    backgroundColor: "#8BC34A", // Green
  },
  statusPending: {
    backgroundColor: "#FFC107", // Orange
  },
  statusCanceled: {
    backgroundColor: "#B0BEC5", // Grey
  },
  statusText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  requestId: {
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  requestType: {
    color: "#555555",
    marginBottom: 10,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    marginLeft: 4,
    color: "#999999",
    fontSize: 12,
  },
  timeValue: {
    marginLeft: 4,
    color: "#333333",
    fontSize: 12,
  },
});

export default RequestItem;
