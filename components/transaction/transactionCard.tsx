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
  RefundRequest = "RefundRequest",
  Refund = "Refund",
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
      case DepositStatus.RefundRequest:
        return styles.statusRefundRequest;
      case DepositStatus.Refund:
        return styles.statusRefund;
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
          borderRadius: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      >
        <View>
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
                  ? "Đã bị huỷ"
                  : data?.depositStatus === "Disable"
                  ? "Đã bị huỷ"
                  : data?.depositStatus === "PaymentFailed"
                  ? "Giao dịch thất bại"
                  : data?.depositStatus === "Paid"
                  ? "Đã thanh toán"
                  : data?.depositStatus === "TradeRequested"
                  ? "Đã gửi yêu cầu trao đổi"
                  : data?.depositStatus === "RefundRequest"
                  ? "Yêu cầu hoàn tiền"
                  : data?.depositStatus === "Refund"
                  ? "Đã hoàn tiền"
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
                <ThemedText type="small">Số tiền đặt cọc giữ chỗ:</ThemedText>
                <ThemedText type="defaultSemiBold">
                  {formatCurrency(data?.depositAmount)}
                </ThemedText>
              </View>
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
    backgroundColor: "#ffe9b8",
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
    backgroundColor: "#c4e39f",
    color: "#fff",
  },
  statusTradeRequested: {
    borderRadius: 10,
    paddingVertical: 5,
    backgroundColor: "#fdff",
  },
  statusRefundRequest: {
    borderRadius: 10,
    paddingVertical: 5,
    backgroundColor: "#28aad1",
  },
  statusRefund: {
    borderRadius: 10,
    paddingVertical: 5,
    backgroundColor: "#bfeddf",
  },
});

export default TransactionCard;
