import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/button/Button";
import { useLocalSearchParams } from "expo-router";
import { getConsignmentDetail } from "@/services/api/consignment";

const ConsignmentDetail = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = React.useState<Property>();
  const [requestStatus, setRequestStatus] = React.useState<string>("");
  const getPropertyDetail = async () => {
    try {
      const res = await getConsignmentDetail(id?.toString());
      console.log("API response:", res);
      setData(res?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPropertyDetail();
  }, []);

  // Màu trạng thái
  const getStatusStyles = () => {
    switch (requestStatus) {
      case "Pending":
        return { label: "Đang xử lý", color: "#000", background: "#ffe9b8" };
      case "Rejected":
        return { label: "Đã hủy", color: "#FF5252", background: "#FFEBEE" };
      case "Completed":
        return { label: "Hoàn thành", color: "#66BB6A", background: "#E8F5E9" };
      default:
        return {
          label: "Không xác định",
          color: "#BDBDBD",
          background: "#F5F5F5",
        };
    }
  };

  useEffect(() => {
    if (data) setRequestStatus(data?.requestStatus);
  }, [data]);

  const { label, color, background } = getStatusStyles();

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        {/* Trạng thái yêu cầu */}
        <View style={[styles.statusContainer, { backgroundColor: background }]}>
          <Text style={[styles.statusText, { color }]}>{label}</Text>
          <Text style={styles.statusDescription}>
            {requestStatus === "Pending" &&
              "Yêu cầu ký gửi của bạn đang chờ xử lý."}
            {requestStatus === "Rejected" && "Yêu cầu đã bị từ chối."}
            {requestStatus === "Completed" && "Yêu cầu đã được hoàn thành."}
          </Text>
        </View>

        {/* Thông tin căn hộ */}
        <View style={styles.section}>
          <ThemedText type="heading">Thông tin căn hộ</ThemedText>
          <Text style={styles.infoText}>
            Giá mong muốn: {data?.expectedPrice} VND
          </Text>
          <Text style={styles.infoText}>Địa chỉ: {data?.address}</Text>
          <Text style={styles.infoText}>Mô tả: {data?.description}</Text>
        </View>

        {/* Thông tin liên hệ */}
        <View style={styles.section}>
          <ThemedText type="heading">Thông tin liên hệ</ThemedText>
          <Text style={styles.infoText}>Tên liên hệ: {data?.userName}</Text>
          <Text style={styles.infoText}>
            Số điện thoại: {data?.phoneNumber}
          </Text>
          <Text style={styles.infoText}>
            Ngày tạo: {new Date(data?.requestDate ?? "").toLocaleString()}
          </Text>
          <Text style={styles.infoText}>
            Mã yêu cầu: {data?.propertyRequestCode || "Không có"}
          </Text>
          <Text style={styles.infoText}>Loại yêu cầu: Yêu cầu ký gửi</Text>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  statusContainer: {
    padding: 20,
    marginBottom: 10,
    // borderRadius: 8,
    // marginHorizontal: 10,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statusDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  section: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
  },
  infoText: {
    fontSize: 16,
    marginVertical: 5,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: "#FFF",
  },
});

export default ConsignmentDetail;
