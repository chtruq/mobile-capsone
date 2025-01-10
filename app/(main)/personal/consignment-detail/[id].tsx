import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/button/Button";
import { router, useLocalSearchParams } from "expo-router";
import { getConsignmentDetail } from "@/services/api/consignment";
import { formatCurrency, formatCurrency3Zero } from "@/model/other";

const ConsignmentDetail = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = React.useState<Property>();
  const [requestStatus, setRequestStatus] = React.useState<string>("");
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
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
      case "Accepted":
        return {
          label: "Đã được xác nhận",
          color: "#66BB6A",
          background: "#E8F5E9",
        };
      case "Expirated":
        return {
          label: "Hết thời gian xác nhận",
          color: "#66BB6A",
          background: "#E8F5E9",
        };
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
            {requestStatus === "Accepted" &&
              "Yêu cầu của bạn đã được xác nhận."}
            {requestStatus === "Expirated" && "Yêu cầu của bạn đã hết hạn."}
          </Text>
        </View>

        {/* Thông tin căn hộ */}
        <View style={styles.section}>
          <ThemedText type="heading">Thông tin căn hộ</ThemedText>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ThemedText
              style={{
                width: "50%",
              }}
            >
              Giá mong muốn:{" "}
            </ThemedText>
            <ThemedText style={styles.boldText}>
              {formatCurrency3Zero(data?.expectedPrice ?? 0)} VND
            </ThemedText>
          </View>

          <View style={styles.row}>
            <ThemedText>Tên căn hộ: </ThemedText>
            <ThemedText style={styles.boldText}>
              {data?.propertyName}
            </ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText>Địa chỉ: </ThemedText>
            <ThemedText style={styles.boldText}>{data?.address}</ThemedText>
          </View>

          <View style={styles.row}>
            <ThemedText>Mô tả: </ThemedText>
            <ThemedText style={styles.boldText}>{data?.description}</ThemedText>
          </View>
        </View>

        {/* Thông tin liên hệ */}
        <View style={styles.section}>
          <ThemedText type="heading">Thông tin liên hệ</ThemedText>
          <View style={styles.row}>
            <ThemedText>Họ và tên: </ThemedText>
            <ThemedText style={styles.boldText}>{data?.userName}</ThemedText>
          </View>

          <View style={styles.row}>
            <ThemedText>Email: </ThemedText>
            <ThemedText style={styles.boldText}>{data?.email}</ThemedText>
          </View>

          <View style={styles.row}>
            <ThemedText>Số điện thoại: </ThemedText>
            <ThemedText style={styles.boldText}>{data?.phoneNumber}</ThemedText>
          </View>

          <View style={styles.row}>
            <ThemedText>Ngày tạo: </ThemedText>
            <ThemedText style={styles.boldText}>
              {new Date(data?.requestDate ?? "").toLocaleString()}
            </ThemedText>
          </View>

          <View style={styles.row}>
            <ThemedText>Mã yêu cầu: </ThemedText>
            <ThemedText style={styles.boldText}>
              {data?.propertyRequestCode || "Không có"}
            </ThemedText>
          </View>

          <View style={styles.row}>
            <ThemedText>Loại yêu cầu: </ThemedText>
            <ThemedText style={styles.boldText}>Yêu cầu ký gửi</ThemedText>
          </View>
        </View>
      </ScrollView>
      {requestStatus === "Pending" && (
        <View
          style={{
            alignItems: "center",
            marginTop: 20,
            position: "absolute",
            bottom: 20,
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={{
              padding: 20,
              alignItems: "center",
              backgroundColor: "#ffc6c6",
              borderRadius: 8,
              width: "80%",
            }}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <ThemedText type="red">Hủy yêu cầu</ThemedText>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: "100%",
              padding: 20,
              borderRadius: 10,
              height: 200,
              position: "absolute",
              bottom: 0,
            }}
          >
            <ThemedText type="heading" style={{ padding: 20 }}>
              Bạn có chắc chắn muốn huỷ yêu cầu này không?
            </ThemedText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  router.back();
                }}
                style={{
                  borderWidth: 2,
                  borderColor: "#ffd4d4",
                  borderRadius: 5,
                  width: "40%",
                  alignItems: "center",
                }}
              >
                <ThemedText
                  style={{
                    fontSize: 20,
                    padding: 10,
                    fontWeight: "bold",
                  }}
                  type="red"
                >
                  Xác nhận
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={{
                  backgroundColor: "#",
                  borderRadius: 5,
                  width: "40%",
                  alignItems: "center",
                }}
              >
                <ThemedText
                  style={{
                    fontSize: 20,
                    padding: 10,
                  }}
                  type="default"
                >
                  Huỷ
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "600",
    color: "#000",
  },
});

export default ConsignmentDetail;
