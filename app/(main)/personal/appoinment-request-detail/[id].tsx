import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { getAppointmentRequestDetail } from "@/services/api/appointment";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { apartmentsDetail } from "@/services/api/apartments";
import { Apartment } from "@/model/apartments";
import ApartmentCard from "@/components/Search/Apartment/ApartmentCard";

const AppoinmentRequestDetail = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = React.useState<AppointmentRequest>();
  const [apartmentData, setApartmentData] = React.useState<Apartment>();

  const getDetailAppointmentRequest = async () => {
    try {
      const res = await getAppointmentRequestDetail(id?.toString());
      setData(res?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getApartmentDetail = async () => {
    try {
      const res = await apartmentsDetail(data?.apartmentID.toString() || "");
      setApartmentData(res?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDetailAppointmentRequest();
  }, []);

  useEffect(() => {
    if (data) {
      getApartmentDetail();
    }
  }, [data]);

  let statusStyle = styles.statusPending;
  let statusText = "Chờ xử lý";
  let statusNoti =
    "Yêu cầu tư vấn tham quan dự án của Quý Khách hàng đang chờ xử lý.";
  if (data?.status === "Accepted") {
    statusStyle = styles.statusProcessed;
    statusText = "Đã xác nhận";
    statusNoti =
      "Yêu cầu tư vấn tham quan dự án của Quý Khách hàng đã được xác nhận.";
  } else if (data?.status === "Completed") {
    statusStyle = styles.statusCompleted;
    statusText = "Đã hoàn thành";
    statusNoti =
      "Yêu cầu tư vấn tham quan dự án của Quý Khách hàng đã hoàn thành.";
  } else if (data?.status === "Rejected") {
    statusStyle = styles.statusRejected;
    statusText = "Bị từ chối";
    statusNoti =
      "Yêu cầu tư vấn tham quan dự án của Quý Khách hàng đã bị từ chối.";
  } else {
    // statusStyle = styles.statusPending;
    statusStyle = styles.statusPending;
    statusText = "Chờ xử lý";
    statusNoti =
      "Yêu cầu tư vấn tham quan dự án của Quý Khách hàng đang chờ xử lý.";
  }

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <View style={[styles.statusIndicator, statusStyle]}>
        <View>
          <ThemedText type="heading" style={styles.statusText}>
            {statusText}
          </ThemedText>
          <ThemedText style={styles.statusText}>{statusNoti}</ThemedText>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#f5f4f8",
          borderRadius: 10,
          marginHorizontal: 15,
          marginVertical: 10,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
          padding: 10,
        }}
      >
        <ThemedText style={styles.headingText}>Thông tin lịch hẹn</ThemedText>
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <ThemedText>Mã lịch hẹn: </ThemedText>
            <ThemedText style={styles.boldText}>
              {data?.appointmentRequestCode || "N/A"}
            </ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText>Mã căn hộ: </ThemedText>
            <ThemedText style={styles.boldText}>
              {data?.appointmentRequestCode || "N/A"}
            </ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText>Thời gian hẹn: </ThemedText>
            <ThemedText style={styles.boldText}>
              {data?.preferredDate
                ? new Date(data?.preferredDate).toLocaleDateString()
                : "N/A"}{" "}
              - {data?.preferredTime?.split(":").slice(0, 2).join(":") || "N/A"}
            </ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText>Loại lịch hẹn: </ThemedText>
            <ThemedText style={styles.boldText}>Yêu cầu tư vấn</ThemedText>
          </View>
          <View style={styles.row}>
            {/* <ThemedText>Địa chỉ: </ThemedText>
      <ThemedText style={styles.boldText}>
        {data?.address || "Lô 9, khu công nghệ cao, Thủ Đức"}
      </ThemedText> */}
          </View>
          <View style={styles.row}>
            <ThemedText>Ghi chú: </ThemedText>
            <ThemedText style={styles.italicText}>
              {data?.note || "(Không có ghi chú)"}
            </ThemedText>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#f5f4f8",
          borderRadius: 10,
          marginHorizontal: 15,
          marginVertical: 10,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
          padding: 10,
        }}
      >
        <ThemedText style={styles.headingText}>Thông tin căn hộ</ThemedText>
        {apartmentData && (
          <View>
            <ApartmentCard data={apartmentData} />
          </View>
        )}
      </View>

      {/* <View
        style={{
          backgroundColor: "#f5f4f8",
          borderRadius: 10,
          marginHorizontal: 15,
          marginVertical: 10,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <ThemedText style={styles.headingText}>Thông tin nhân viên liên hệ</ThemedText>
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <ThemedText>Tên nhân viên: </ThemedText>
            <ThemedText style={styles.boldText}>
              {data?.sellerName?  || "N/A"}
            </ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText>Số điện thoại: </ThemedText>
            <ThemedText style={styles.boldText}>
              {data?.sellerPhoneNumber || "N/A"}
            </ThemedText>
          </View>
         
        </View>
      </View> */}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  statusIndicator: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffe9b8",
  },
  statusText: {
    color: "#000",
  },
  statusDescription: {
    fontSize: 14,
    color: "#BDBDBD",
    marginTop: 5,
  },
  statusPending: {
    backgroundColor: "#FFB412",
  },
  statusProcessed: {
    backgroundColor: "#cacb32",
  },
  statusCompleted: {
    backgroundColor: "#8bc840",
  },
  statusRejected: {
    backgroundColor: "#B0BEC5",
  },
  headingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  infoContainer: {
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
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
  italicText: {
    fontStyle: "italic",
    color: "#757575",
  },
});

export default AppoinmentRequestDetail;
