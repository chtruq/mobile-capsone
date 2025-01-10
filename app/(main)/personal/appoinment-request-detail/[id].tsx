import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import React, { useEffect } from "react";
import { ThemedView } from "@/components/ThemedView";
import { router, useLocalSearchParams } from "expo-router";
import {
  cancelAppointmentRequest,
  getAppointmentRequestDetail,
} from "@/services/api/appointment";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { apartmentsDetail } from "@/services/api/apartments";
import { Apartment } from "@/model/apartments";
import ApartmentCard from "@/components/Search/Apartment/ApartmentCard";

const AppoinmentRequestDetail = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = React.useState<AppointmentRequest>();
  const [apartmentData, setApartmentData] = React.useState<Apartment>();
  const [visible, setModalVisible] = React.useState(false);
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
  } else if (data?.status === "Disabled") {
    statusStyle = styles.statusDisabled;
    statusText = "Đã bị huỷ";
    statusNoti = "Yêu cầu tư vấn tham quan dự án của Quý Khách hàng đã bị huỷ.";
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
      <ScrollView
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
                {data?.apartmentCode || "N/A"}
              </ThemedText>
            </View>
            <View style={styles.row}>
              <ThemedText>Thời gian hẹn: </ThemedText>
              <ThemedText style={styles.boldText}>
                {data?.preferredDate
                  ? new Date(data?.preferredDate).toLocaleDateString()
                  : "N/A"}{" "}
                -{" "}
                {data?.preferredTime?.split(":").slice(0, 2).join(":") || "N/A"}
              </ThemedText>
            </View>
            <View style={styles.row}>
              <ThemedText>Loại lịch hẹn: </ThemedText>
              <ThemedText style={styles.boldText}>Yêu cầu tư vấn</ThemedText>
            </View>
            <View style={styles.row}></View>
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

        {data?.status === "Pending" && (
          <TouchableOpacity
            style={{
              borderRadius: 10,
              marginHorizontal: 15,
              marginVertical: 10,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
              padding: 20,
              backgroundColor: "#ffd4d4",
              alignItems: "center",
              marginBottom: 20,
            }}
            onPress={() => {
              setModalVisible(!visible);
            }}
          >
            <ThemedText
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
              type="red"
            >
              Huỷ yêu cầu
            </ThemedText>
          </TouchableOpacity>
        )}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setModalVisible(!visible);
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
            <ThemedText type="heading" style={{ textAlign: "center" }}>
              Bạn có chắc muốn huỷ yêu cầu này không ?
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
                  cancelAppointmentRequest(id?.toString());
                  setModalVisible(!visible);
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
                  setModalVisible(!visible);
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
    backgroundColor: "#ffe9b8",
  },
  statusProcessed: {
    backgroundColor: "#cacb32",
  },
  statusDisabled: {
    backgroundColor: "#ffc6c6",
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
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});

export default AppoinmentRequestDetail;
