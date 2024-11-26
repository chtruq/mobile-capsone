import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { FC, useEffect } from "react";
import { Deposit } from "@/model/deposit";
import { router } from "expo-router";
import { ThemedText } from "../ThemedText";
import { apartmentsDetail } from "@/services/api/apartments";
import { Apartment } from "@/model/apartments";
import { formatCurrency } from "@/model/other";

interface TransProps {
  data: Deposit;
}
enum DepositStatus {
  Pending = "Pending",
  Accept = "Accept",
  Reject = "Reject",
  Disable = "Disable",
  PaymentFailed = "PaymentFailed",
  Paid = "Paid",
  TradeRequested = "TradeRequested",
  Exported = "Exported",
}

const TransactionCard: FC<TransProps> = ({ data }) => {
  const apartmentID = data.apartmentID.toString();
  const [apartmentDetail, setApartmentDetail] = React.useState<Apartment>();

  const getApartmentDetail = async () => {
    try {
      const response = await apartmentsDetail(apartmentID);
      console.log("Get apartment detail API response:", response?.data);
      setApartmentDetail(response?.data);
      return response.data;
    } catch (error) {
      console.error("Get apartment detail API error:", error);
      throw error;
    }
  };

  useEffect(() => {
    getApartmentDetail();
  }, []);

  const getStatusStyle = (status: DepositStatus) => {
    switch (status) {
      case DepositStatus.Pending:
        return styles.statusPending;
      case DepositStatus.Accept:
        return styles.statusAccept;
      case DepositStatus.Reject:
        return styles.statusReject;
      case DepositStatus.Disable:
        return styles.statusDisable;
      case DepositStatus.PaymentFailed:
        return styles.statusPaymentFailed;
      case DepositStatus.Paid:
        return styles.statusPaid;
      case DepositStatus.TradeRequested:
        return styles.statusTradeRequested;
      default:
        return {};
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/(main)/personal/transaction-detail/[id]",
            params: { id: data.depositID },
          });
        }}
        key={data.depositID}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <View style={getStatusStyle(data?.depositStatus)}>
            <ThemedText
              style={{
                fontSize: 14,
                paddingHorizontal: 5,
              }}
              type="defaultSemiBold"
            >
              {data?.depositStatus === "Pending"
                ? "Đang chờ xác nhận"
                : data?.depositStatus === "Accept"
                ? "Đang chờ thanh toán"
                : data?.depositStatus === "Reject"
                ? "Đang chờ xử lý"
                : data?.depositStatus === "Disable"
                ? "Đã bị huỷ"
                : data?.depositStatus === "PaymentFailed"
                ? "Giao dịch đã bị huỷ"
                : data?.depositStatus === "Paid"
                ? "Đã thanh toán"
                : data?.depositStatus === "TradeRequested"
                ? "Đã gửi yêu cầu trao đổi"
                : "Không xác định"}
            </ThemedText>
          </View>

          <ThemedText type="small">
            Mã căn:
            <ThemedText>{data?.depositCode}</ThemedText>
          </ThemedText>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View>
            <Image
              source={{ uri: apartmentDetail?.images[0]?.imageUrl }}
              style={{ width: 90, height: 90, borderRadius: 20 }}
            />
          </View>
          <View
            style={{
              marginLeft: 10,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <ThemedText type="price">
              {formatCurrency(apartmentDetail?.price)}
            </ThemedText>
            <ThemedText type="defaultSemiBold">
              {apartmentDetail?.apartmentName}
            </ThemedText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ThemedText type="small">Số tiền đặt cọc:</ThemedText>
              <ThemedText type="defaultSemiBold">
                {formatCurrency(data?.depositAmount)}
              </ThemedText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  statusPending: {
    backgroundColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 12,
  },
  statusAccept: {
    backgroundColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 5,
  },
  statusReject: {
    borderRadius: 10,
    paddingVertical: 5,
    backgroundColor: "#ccc",
  },
  statusDisable: {
    borderRadius: 10,
    backgroundColor: "#ffc6c6",
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  statusPaymentFailed: {
    borderRadius: 10,
    backgroundColor: "#ccc",
    paddingVertical: 5,
    color: "#0091ff",
  },
  statusPaid: {
    borderRadius: 10,
    paddingVertical: 5,
    backgroundColor: "#49cc90",
    color: "#fff",
  },
  statusTradeRequested: {
    borderRadius: 10,
    paddingVertical: 5,
    backgroundColor: "#fdff",
  },
});

export default TransactionCard;
