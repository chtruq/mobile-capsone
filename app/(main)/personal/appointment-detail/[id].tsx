import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  cancelAppointment,
  getAppointmentDetail,
} from "@/services/api/appointment";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const AppointmentDetails = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = React.useState<Appointment>();
  const [visible, setVisible] = React.useState(false);

  const fetchAppointmentDetails = async () => {
    try {
      const res = await getAppointmentDetail(id?.toString());
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppointmentDetails();
  }, []);

  const getStatusStyle = (status: appointmentStatus) => {
    switch (status) {
      case "Confirmed":
        return { backgroundColor: "#D4EDDA", borderColor: "#28A745" }; // Green
      case "InProcressing":
        return { backgroundColor: "#FFF3CD", borderColor: "#FFC107" }; // Yellow
      case "Done":
        return { backgroundColor: "#D1ECF1", borderColor: "#17A2B8" }; // Blue
      case "Canceled":
        return { backgroundColor: "#F8D7DA", borderColor: "#DC3545" }; // Red
      case "Updated":
        return { backgroundColor: "#E2E3E5", borderColor: "#6C757D" }; // Gray
      default:
        return { backgroundColor: "#FFFFFF", borderColor: "#000000" }; // Default white
    }
  };

  const getStatusText = (status: appointmentStatus) => {
    switch (status) {
      case "Confirmed":
        return "Đã xác nhận";
      case "InProcressing":
        return "Đang xử lí";
      case "Done":
        return "Hoàn thành";
      case "Canceled":
        return "Đã hủy";
      case "Updated":
        return "Đã cập nhật";
      default:
        return "Không xác định";
    }
  };

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          padding: 10,
          backgroundColor: "#FFFFFF",
          margin: 10,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View
          style={{
            ...getStatusStyle(data?.appointmentStatus as appointmentStatus),
            padding: 5,
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <ThemedText type="heading">
            {getStatusText(data?.appointmentStatus as appointmentStatus)}
          </ThemedText>
          <ThemedText type="defaultSemiBold">{data?.title}</ThemedText>
        </View>
        <View style={style.rowItem}>
          <Text>Mã lịch hẹn:</Text>
          <Text>{data?.appointmentCode}</Text>
        </View>
        <View style={style.rowItem}>
          <Text>Ngày hẹn:</Text>
          <Text>
            {data?.appointmentDate
              ? new Date(data.appointmentDate).toLocaleDateString()
              : "N/A"}
          </Text>
        </View>
        <View style={style.rowItem}>
          <Text>Thời gian:</Text>
          <Text>{data?.startTime?.split(":").slice(0, 2).join(":")}</Text>
        </View>
        <View style={style.rowItem}>
          <Text>Địa điểm:</Text>
          <Text>{data?.location}</Text>
        </View>
      </View>

      <View
        style={{
          padding: 10,
          backgroundColor: "#FFFFFF",
          margin: 10,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <ThemedText type="heading">Nhân viên phụ trách </ThemedText>
        <View style={style.rowItem}>
          <Text>Tên nhân viên:</Text>
          <Text>{data?.sellerName}</Text>
        </View>
        <View style={style.rowItem}>
          <Text>Số điện thoại:</Text>
          <Text>{data?.sellerPhone}</Text>
        </View>
      </View>
      <View></View>
      {data?.appointmentStatus === "Confirmed" && (
        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            right: 10,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 10,
              margin: 10,
              borderRadius: 10,
              backgroundColor: "#F8D7DA",
              alignItems: "center",
            }}
            onPress={() => {
              setVisible(true);
            }}
          >
            <ThemedText type="red">Huỷ lịch hẹn</ThemedText>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View>
            <View
              style={{
                padding: 10,
                backgroundColor: "#FFFFFF",
                margin: 10,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <ThemedText type="heading">
                Bạn có chắc chắn muốn huỷ lịch hẹn này?
              </ThemedText>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    padding: 10,
                    margin: 10,
                    borderRadius: 10,
                    backgroundColor: "#D9D9D9",
                  }}
                  onPress={() => {
                    setVisible(false);
                  }}
                >
                  <ThemedText type="default">Không</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    margin: 10,
                    borderRadius: 10,
                    backgroundColor: "#F8D7DA",
                  }}
                  onPress={() => {
                    // cancelAppointment(id?.toString());
                    // router.navigate("/(main)/personal/appointment");
                    router.back();
                    Alert.alert("Huỷ lịch hẹn thành công");
                    setVisible(false);
                  }}
                >
                  <ThemedText type="red">Có</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
};

const style = StyleSheet.create({
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});

export default AppointmentDetails;
