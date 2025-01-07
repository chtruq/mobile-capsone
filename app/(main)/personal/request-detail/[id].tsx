import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { getDepositDetail } from "@/services/api/deposit";
import { Deposit, DepositStatus } from "@/model/deposit";

const RequestDetail = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = React.useState<Deposit>();

  const getRequestData = async () => {
    try {
      const res = await getDepositDetail(id?.toString());
      console.log("API detailsss:", res);
      setData(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRequestData();
  }, []);

  const getStatusStyle = (status: DepositStatus) => {
    switch (status) {
      case DepositStatus.Pending:
        return { backgroundColor: "#FFF3CD", borderColor: "#FFC107" }; // Yellow
      case DepositStatus.Accept:
        return { backgroundColor: "#D4EDDA", borderColor: "#28A745" }; // Green
      case DepositStatus.Reject:
        return { backgroundColor: "#F8D7DA", borderColor: "#DC3545" }; // Red
      case DepositStatus.Disable:
        return { backgroundColor: "#E2E3E5", borderColor: "#6C757D" }; // Gray
      case DepositStatus.PaymentFailed:
        return { backgroundColor: "#F8D7DA", borderColor: "#FF0000" }; // Dark Red
      case DepositStatus.Paid:
        return { backgroundColor: "#D1ECF1", borderColor: "#17A2B8" }; // Blue
      case DepositStatus.TradeRequested:
        return { backgroundColor: "#FFD447", borderColor: "#123ADA" }; // Light Blue
      case DepositStatus.Exported:
        return { backgroundColor: "#E8F5E9", borderColor: "#1B5E20" }; // Green Shade
      default:
        return { backgroundColor: "#FFFFFF", borderColor: "#000000" }; // Default white
    }
  };

  const getStatusText = (status: DepositStatus) => {
    switch (status) {
      case DepositStatus.Pending:
        return "Đang chờ xử lý";
      case DepositStatus.Accept:
        return "Đã chấp nhận";
      case DepositStatus.Reject:
        return "Bị từ chối";
      case DepositStatus.Disable:
        return "Đã vô hiệu";
      case DepositStatus.PaymentFailed:
        return "Thanh toán thất bại";
      case DepositStatus.Paid:
        return "Đã thanh toán";
      case DepositStatus.TradeRequested:
        return "Yêu cầu trao đổi";
      case DepositStatus.Exported:
        return "Đã xuất";
      default:
        return "Unknown";
    }
  };

  return (
    <ThemedView style={styles.container}>
      {data ? (
        <View>
          <View
            style={{
              ...styles.detailContainer,
              ...getStatusStyle(data.depositStatus),
            }}
          >
            <ThemedText type="defaultSemiBold">
              {getStatusText(data.depositStatus)}
            </ThemedText>
            <ThemedText>{data.note}</ThemedText>
          </View>
          <ThemedText type="heading">{data.depositCode}</ThemedText>
          <ThemedText>Mã căn hộ: {data.apartmentCode}</ThemedText>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailContainer: {
    padding: 20,
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default RequestDetail;
