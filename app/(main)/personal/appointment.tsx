import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { getUserAppoinment } from "@/services/api/appointment";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";

const Appointment = () => {
  const { userInfo } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const fetchAppointments = async () => {
    try {
      const res = await getUserAppoinment(userInfo?.id);
      console.log(res?.data?.appointments);
      setAppointments(res?.data?.appointments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
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

  const getAppointmentTypeText = (type: string) => {
    switch (type) {
      case "Appointment":
        return "Đặt lịch hẹn";
      case "Property":
        return "Lịch hẹn xem nhà";
      default:
        return "Không xác định";
    }
  };

  return (
    <ThemedView
      style={{
        flex: 1,
        backgroundColor: "#f0f0f0",
      }}
    >
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.appointmentID}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/(main)/personal/appointment-detail/[id]",
                params: { id: item.appointmentID },
              });
            }}
            style={{
              padding: 10,
              margin: 10,
              borderRadius: 10,
              backgroundColor: "#FFFFFF",
            }}
          >
            <View
              style={{
                ...getStatusStyle(item.appointmentStatus),
                padding: 5,
                borderRadius: 5,
                borderWidth: 1,
                width: 100,
                alignItems: "center",
              }}
            >
              <Text>{getStatusText(item.appointmentStatus)}</Text>
            </View>
            <View style={style.rowItem}>
              <Text>Mã lịch hẹn:</Text>
              <Text>{item.appointmentCode}</Text>
            </View>
            <View style={style.rowItem}>
              <Text>Ngày hẹn:</Text>
              <Text>{new Date(item.assignedDate).toLocaleString()}</Text>
            </View>
            <View style={style.rowItem}>
              <Text>Địa điểm:</Text>
              <Text>{item.location}</Text>
            </View>
            <View style={style.rowItem}>
              <Text>Loại lịch hẹn:</Text>
              <Text>{getAppointmentTypeText(item?.appointmentTypes)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
};

const style = StyleSheet.create({
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
});

export default Appointment;
