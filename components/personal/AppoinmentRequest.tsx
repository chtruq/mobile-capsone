import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { router } from "expo-router";

interface AppoinmentRequestProps {
  data: AppointmentRequest;
}

const AppoinmentRequest: FC<AppoinmentRequestProps> = ({ data }) => {
  let statusStyle = styles.statusPending;
  let statusText = "Chờ xử lý";
  switch (data.status) {
    case "Pending":
      statusStyle = styles.statusPending;
      statusText = "Chờ xử lý";
      break;
    case "Accepted":
      statusStyle = styles.statusProcessed;
      statusText = "Đã xác nhận";
      break;
    case "Completed":
      statusStyle = styles.statusCompleted;
      statusText = "Đã hoàn thành";
      break;
    case "Rejected":
      statusStyle = styles.statusRejected;
      statusText = "Bị từ chối";
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
          pathname: "/(main)/personal/appoinment-request-detail/[id]",
          params: { id: data?.requestID },
        });
      }}
    >
      <View style={[styles.statusIndicator, statusStyle]}>
        <Text style={styles.statusText}>{statusText}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.requestId}>
          Mã yêu cầu: {data?.appointmentRequestCode}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.requestType}>
          Mã căn hộ: {data?.apartmentCode}
        </Text>
        <View style={styles.timeRow}>
          <View style={styles.timeInfo}>
            <View>
              <Text style={styles.timeText}>Thời gian tạo</Text>
              <Text style={styles.timeValue}>
                {new Date(data?.createDate).toLocaleString()}
              </Text>
            </View>
          </View>
          <View style={styles.timeInfo}>
            <View></View>
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
    backgroundColor: "#cacb32",
  },
  statusPending: {
    backgroundColor: "#FFB412",
  },
  statusRejected: {
    backgroundColor: "#B0BEC5",
  },
  statusFailed: {
    backgroundColor: "#FF5722",
  },
  statusCompleted: {
    backgroundColor: "#8bc840",
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

export default AppoinmentRequest;
