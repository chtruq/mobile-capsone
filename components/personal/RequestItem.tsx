import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Deposit } from "@/model/deposit";

interface RequestItemProps {
  data: Deposit;
}

const RequestItem: FC<RequestItemProps> = ({ data }) => {
  // Set status styles
  let statusStyle = styles.statusPending;
  let statusText = "Chờ xử lý";

  switch (data.depositStatus) {
    case 1:
      statusStyle = styles.statusProcessed;
      statusText = "Chờ xử lý";
      break;
    case 2:
      statusStyle = styles.statusPaymentWaiting;
      statusText = "Chờ thanh toán";
      break;
    case 3:
      statusStyle = styles.statusCanceled;
      statusText = "Bị từ chối";
      break;
    case 4:
      statusStyle = styles.statusCanceled;
      statusText = "Đã bị huỷ";
      break;
    case 5:
      statusStyle = styles.statusCanceled;
      statusText = "Thanh toán thất bại";
      break;
    case 6:
      statusStyle = styles.statusProcessed;
      statusText = "Đã thanh toán";
      break;
    case 7:
      statusStyle = styles.statusProcessed;
      statusText = "Đã gửi yêu cầu trao đổi";
      break;
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
          pathname: "/(main)/personal/request-detail/[id]",
          params: { id: data?.depositID },
        });
      }}
    >
      <View style={[styles.statusIndicator, statusStyle]}>
        <Text style={styles.statusText}>{statusText}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.requestId}>Mã yêu cầu: {data?.depositCode}</Text>
        <Text style={styles.requestType}>{data?.description}</Text>
        <View style={styles.timeRow}>
          <View style={styles.timeInfo}>
            <View>
              <Text style={styles.timeText}>Thời gian tạo</Text>
              <Text style={styles.timeValue}>{data?.createDate}</Text>
            </View>
          </View>
          <View style={styles.timeInfo}>
            <View>
              {/* <Text style={styles.timeText}>Thời gian hẹn</Text> */}
              {/* <Text style={styles.timeValue}>{appointmentTime}</Text> */}
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
  statusFailed: {
    backgroundColor: "#FF5722", // Red
  },
  statusSuccess: {
    backgroundColor: "#4CAF50", // Green
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
  statusPaymentWaiting: {
    backgroundColor: "#FFC107",
  },
});

export default RequestItem;
