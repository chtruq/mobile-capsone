import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { FC, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { getDepositDetail } from "@/services/api/deposit";
import ApartmentTransCard from "@/components/transaction/ApartmentTransCard";
import { Deposit } from "@/model/deposit";
import { apartmentsDetail } from "@/services/api/apartments";
import { Apartment } from "@/model/apartments";
import { formatCurrency, numberToWords } from "@/model/other";
import Line from "@/components/other/Line";
import { AntDesign } from "@expo/vector-icons";
import Button from "@/components/button/Button";

enum DepositStatus {
  Active = 0,
  Request = 1,
  Accept = 2,
  Reject = 3,
  Disable = 4,
  PaymentFailed = 5,
  Paid = 6,
}
interface TransactionStatusProps {
  status: DepositStatus;
}

const TransactionStatus: FC<TransactionStatusProps> = ({ status }) => {
  const statusColors: { [key in DepositStatus]: string } = {
    [DepositStatus.Request]: Colors.light.primary,
    [DepositStatus.Accept]: Colors.light.success,
    [DepositStatus.Reject]: Colors.light.cancel,
    [DepositStatus.Paid]: Colors.light.success,
    [DepositStatus.PaymentFailed]: Colors.light.cancel,
    [DepositStatus.Active]: Colors.light.primary,
    [DepositStatus.Disable]: Colors.light.cancel,
  };

  const backgroundColor = statusColors[status] || Colors.light.background;
  const statusIcon = (() => {
    switch (status) {
      case 1:
        return "🔍";
      case 2:
        return "✅";
      case 3:
        return "❌";
      default:
        return "❔";
    }
  })();
  const textContent = (() => {
    switch (status) {
      case DepositStatus.Request:
        return "Đang chờ xác nhận";
      case DepositStatus.Accept:
        return "Xác nhận giao dịch";
      case DepositStatus.Reject:
        return "Giao dịch đã huỷ";
      case DepositStatus.Paid:
        return "Giao dịch hoàn tất";
      case DepositStatus.PaymentFailed:
        return "Thanh toán thất bại";
      default:
        return "Trạng thái không xác định";
    }
  })();
  const textContentNote = (() => {
    switch (status) {
      case 1:
        return "Giao dịch đang chờ xác nhận từ bên bán";
      case 2:
        return "Giao dịch đã hoàn tất";
      case 3:
        return "Giao dịch này đã huỷ do lý do gì đó. Bạn có thể tham khảo thông tin chi tiết bên dưới.";
      default:
        return "Không xác định";
    }
  })();
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View
        style={{
          width: "80%",
        }}
      >
        <ThemedText type="heading">{textContent}</ThemedText>
        <ThemedText
          style={{
            fontSize: 14,
          }}
          type="default"
        >
          {textContentNote}
        </ThemedText>
      </View>

      <View
        style={{
          borderColor: "#FF4040",
          borderWidth: 1,
          width: 40,
          height: 40,
          borderRadius: 100,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedText style={{ color: "#FF4040" }} type="subtitle">
          {statusIcon}
        </ThemedText>
      </View>
    </View>
  );
};

const TransactionProcess: FC<TransactionStatusProps> = ({ status }) => {
  //item
  const ProcessItems = ({
    title,
    currentStatus,
  }: {
    title: string;
    currentStatus: DepositStatus;
  }) => {
    const isActive = status >= currentStatus;
    const backgroundColor = isActive ? Colors.light.success : "#ccc";
    const isCancelled =
      status === DepositStatus.Reject ||
      status === DepositStatus.Disable ||
      status === DepositStatus.PaymentFailed;

    return (
      <View style={styles.processItem}>
        <View style={[styles.processIcon, { backgroundColor }]}>
          {isActive && !isCancelled && (
            <Text style={styles.processIconText}>✓</Text>
          )}
          {isCancelled && currentStatus === status && (
            <Text style={styles.processIconText}>✕</Text>
          )}
        </View>
        <Text>{title}</Text>
      </View>
    );
  };

  //list
  const ProcessList = () => {
    return (
      <View>
        <ProcessItems
          currentStatus={DepositStatus.Paid}
          title="Hợp đồng mua bán"
        />
        <ProcessItems
          currentStatus={DepositStatus.Paid}
          title="Thoả thuận đặt cọc"
        />
        <ProcessItems
          currentStatus={DepositStatus.Accept}
          title="Xác nhận giao dịch"
        />
        <ProcessItems
          currentStatus={DepositStatus.Request}
          title="Đã tạo yêu cầu giao dịch"
        />
      </View>
    );
  };
  return (
    <View style={{ padding: 20 }}>
      <ThemedText type="defaultSemiBold">
        Theo dõi tiến trình đặt cọc
      </ThemedText>
      <ProcessList />
    </View>
  );
};

const TransactionDetail = () => {
  const { id } = useLocalSearchParams();
  const [apartmentDetail, setApartmentDetail] = useState<Apartment>();
  const [data, setData] = useState<Deposit>();
  const fetchDepositDetail = async () => {
    try {
      const res = await getDepositDetail(id);
      setData(res);
    } catch (error) {
      console.error("Get deposit detail API error:", error);
      throw error;
    }
  };

  React.useEffect(() => {
    fetchDepositDetail();
  }, []);

  const apartmentID = data?.apartmentID;

  const getApartmentDetail = async () => {
    try {
      const response = await apartmentsDetail(String(apartmentID));
      setApartmentDetail(response.data);
      return response.data;
    } catch (error) {
      console.error("Get apartment detail API error:", error);
      throw error;
    }
  };

  React.useEffect(() => {
    getApartmentDetail();
  }, [apartmentID]);

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <View
          style={{
            backgroundColor: "#ececec",
          }}
        >
          <ThemedView>
            <TransactionStatus status={4} />
            <TransactionProcess status={4} />
          </ThemedView>

          <ThemedView
            style={{
              padding: 20,
              marginTop: 10,
            }}
          >
            <ThemedText type="defaultSemiBold">Thông tin giao dịch</ThemedText>
            <View>
              {data?.apartmentID ? (
                <ApartmentTransCard id={data.apartmentID} />
              ) : (
                <ThemedText type="default">
                  No Apartment ID available
                </ThemedText>
              )}
            </View>
            <Line width={"100%"} />
            <View>
              <ThemedText type="defaultSemiBold">
                Chi tiết thanh toán
              </ThemedText>
              <View style={styles.transactionInfoCol}>
                <ThemedText type="small">Phương thức thanh toán</ThemedText>
                <ThemedText style={styles.transactionInfoTitle} type="default">
                  Thanh toán bằng vốn tự có
                </ThemedText>
              </View>
              <View style={styles.transactionInfoCol}>
                <ThemedText type="small">Giá trị giao dịch</ThemedText>
                <ThemedText
                  style={styles.transactionInfoTitle}
                  type="defaultSemiBold"
                >
                  {formatCurrency(apartmentDetail?.price)}
                </ThemedText>
              </View>
              <Line width={"100%"} />

              <View style={styles.transactionInfoCol}>
                <ThemedText type="small">Số tiền cần phải đặt cọc</ThemedText>
                <View
                  style={{
                    flexWrap: "wrap",
                    alignItems: "flex-end",
                  }}
                >
                  <ThemedText type="price">
                    {formatCurrency(data?.depositAmount)}
                  </ThemedText>
                  <ThemedText
                    style={styles.transactionInfoTitle}
                    type="default"
                  >
                    ({numberToWords(data?.depositAmount)})
                  </ThemedText>
                </View>
              </View>
              <Line width={"100%"} />
              <View style={styles.transactionInfoCol}>
                <ThemedText type="small">Mã giao dịch</ThemedText>
                <ThemedText style={styles.transactionInfoTitle} type="default">
                  {data?.depositID}
                </ThemedText>
              </View>
            </View>
          </ThemedView>
          <ThemedView
            style={{
              padding: 20,
              marginTop: 10,
            }}
          >
            <View>
              <ThemedText type="defaultSemiBold">
                Thông tin khách hàng
              </ThemedText>
              <View
                style={{
                  marginTop: 10,
                  backgroundColor: "#ececec",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <ThemedText style={styles.transactionInfoTitle} type="default">
                  {data?.depositProfile[0].fullName}
                </ThemedText>
                <ThemedText style={styles.transactionInfoTitle} type="default">
                  {data?.depositProfile[0].phoneNumber}
                </ThemedText>
              </View>
            </View>
          </ThemedView>
          <ThemedView
            style={{
              padding: 20,
              marginTop: 10,
              paddingBottom: 30,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ThemedText>Uỷ nhiệm chi & Giấy tờ tuỳ thân</ThemedText>
              <AntDesign name="right" size={20} color="#000" />
            </TouchableOpacity>
          </ThemedView>
        </View>
      </ScrollView>

      {data?.depositStatus === DepositStatus.Accept && (
        <>
          <Line width={"100%"} />
          <ThemedView
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 20,
            }}
          >
            <Button title="Thanh toán tiền cọc" width={"90%"} />
          </ThemedView>
        </>
      )}
    </ThemedView>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    borderColor: "#FF4040",
    borderWidth: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  processItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  processIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  processIconText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  confirmationIcon: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    padding: 30,
    marginTop: 30,
  },
  confirmationText: {
    color: Colors.light.background,
    fontSize: 25,
    textAlign: "center",
    lineHeight: 60,
  },
  centerText: {
    textAlign: "center",
    marginBottom: 10,
  },
  transactionInfo: {
    padding: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    margin: 20,
    borderRadius: 10,
  },
  transactionInfoCol: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  transactionInfoTitle: {
    fontSize: 14,
  },
});
