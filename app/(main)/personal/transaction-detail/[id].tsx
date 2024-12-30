import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Touchable,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { FC, useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { getDepositDetail } from "@/services/api/deposit";
import ApartmentTransCard from "@/components/transaction/ApartmentTransCard";
import {
  Deposit,
  DepositStatus,
  DepositType,
  DisbursementStatus,
} from "@/model/deposit";
import { apartmentsDetail } from "@/services/api/apartments";
import { Apartment } from "@/model/apartments";
import { formatCurrency, numberToWords } from "@/model/other";
import Line from "@/components/other/Line";
import { AntDesign } from "@expo/vector-icons";
import Button from "@/components/button/Button";
import { createPayment } from "@/services/api/payment";
import { WebView } from "react-native-webview";
import PaymentModal from "@/components/payment/paymentModal/PaymentModal";
interface TransactionStatusProps {
  status: DepositStatus;
}

interface TransactionProcessProps {
  statusData: DepositStatus;
  disbursementStatusData?: DisbursementStatus;
}

const TransactionStatus: FC<TransactionStatusProps> = ({ status }) => {
  const statusColors: { [key in DepositStatus]: string } = {
    [DepositStatus.Pending]: "#FFD700",
    [DepositStatus.Accept]: "#32CD32",
    [DepositStatus.Reject]: "#FF4040",
    [DepositStatus.Disable]: "#ccc",
    [DepositStatus.PaymentFailed]: "#FF4040",
    [DepositStatus.Paid]: "#32CD32",
    [DepositStatus.TradeRequested]: "#FFD700",
    [DepositStatus.Exported]: "#0000FF",
  };

  const backgroundColor = statusColors[status] || Colors.light.background;
  const statusIcon = (() => {
    switch (status) {
      case DepositStatus.Pending:
        return "🔍";
      case DepositStatus.Accept:
        return "✅";
      case DepositStatus.Reject:
        return "❌";
      case DepositStatus.Disable:
        return "❌";
      case DepositStatus.PaymentFailed:
        return "❌";
      case DepositStatus.Paid:
        return "✅";
      case DepositStatus.TradeRequested:
        return "🔄";
      default:
        return "❔";
    }
  })();
  const textContent = (() => {
    switch (status) {
      case DepositStatus.Pending:
        return "Đang chờ xác nhận";
      case DepositStatus.Accept:
        return "Đang chờ thanh toán";
      case DepositStatus.Reject:
        return "Giao dịch đã huỷ";
      case DepositStatus.Disable:
        return "Đã bị huỷ";
      case DepositStatus.PaymentFailed:
        return "Thanh toán thất bại";
      case DepositStatus.Paid:
        return "Đã thanh toán";
      case DepositStatus.TradeRequested:
        return "Giao dịch trao đổi đã được yêu cầu";
      default:
        return "Trạng thái không xác định";
    }
  })();
  const textContentNote = (() => {
    switch (status) {
      case DepositStatus.Pending:
        return "Sẽ có nhân viên liên hệ và tiến hành xác nhận yêu cầu của bạn";
      case DepositStatus.Accept:
        return "Yêu cầu giao dịch đã được tạo thành công";
      case DepositStatus.Reject:
        return "Giao dịch đã bị huỷ";
      case DepositStatus.Disable:
        return "Giao dịch đã bị vô hiệu hóa, vì các lý do sau: không thanh toán, không xác nhận giao dịch";
      case DepositStatus.PaymentFailed:
        return "Thanh toán thất bại";
      case DepositStatus.Paid:
        return "Đã thanh toán";
      case DepositStatus.TradeRequested:
        return "Giao dịch trao đổi đã được yêu cầu";

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

const TransactionProcess: FC<TransactionProcessProps> = ({
  statusData,
  disbursementStatusData,
}) => {
  //item
  const ProcessItems = ({
    title,
    currentStatus,
    disbursementStatus,
    stepIndex,
  }: {
    title: string;
    currentStatus: DepositStatus;
    disbursementStatus?: DisbursementStatus;
    stepIndex: number;
  }) => {
    const isCompleted = (() => {
      if (stepIndex === 0) {
        // Step 1: "Đã tạo yêu cầu giao dịch" is completed when depositStatus is Pending or beyond
        return true;
      } else if (stepIndex === 1) {
        // Step 2: "Xác nhận giao dịch" is completed when depositStatus is Paid or PaymentFailed
        return (
          currentStatus === DepositStatus.Paid ||
          currentStatus === DepositStatus.PaymentFailed
        );
      } else if (stepIndex === 2) {
        // Step 3: "Thoả thuận đặt cọc giữ chỗ" is completed when disbursementStatus is ProcessingDisbursement
        return (
          disbursementStatus === DisbursementStatus.ProcessingDisbursement &&
          currentStatus === DepositStatus.Paid
        );
      } else if (stepIndex === 3) {
        // Step 4: "Thoả thuận đặt cọc" is completed when disbursementStatus is DisbursementCompleted
        return (
          disbursementStatus === DisbursementStatus.DisbursementCompleted &&
          currentStatus === DepositStatus.Paid
        );
      }
      return false;
    })();

    const backgroundColor = isCompleted ? Colors.light.success : "#ccc";
    const isCancelled =
      currentStatus === DepositStatus.Reject ||
      currentStatus === DepositStatus.Disable ||
      currentStatus === DepositStatus.PaymentFailed;

    const processIcon = (() => {
      if (isCompleted) {
        return "✓";
      }
      if (isCancelled) {
        return "✕";
      }
      if (disbursementStatus === DisbursementStatus.ProcessingDisbursement) {
        return "";
      }
      return "";
    })();

    return (
      <View style={styles.processItem}>
        <View style={[styles.processIcon, { backgroundColor }]}>
          <Text style={styles.processIconText}>{processIcon}</Text>
        </View>
        <Text>{title}</Text>
      </View>
    );
  };

  //list
  const ProcessList = () => {
    return (
      <View>
        {/* <DisbursementProcess
          title="Hợp đồng mua bán"
          currentDisbursementStatus="PendingDisbursement"
        />
        <DisbursementProcess
          title="Thoả thuận đặt cọc giữ chỗ"
          currentDisbursementStatus="PendingDisbursement"
        /> */}

        {/* <ProcessItems
          currentStatus={DepositStatus.Paid}
          title="Hợp đồng thanh toán"
          disbursementStatus={DisbursementStatus.ProcessingDisbursement}
        />
        <ProcessItems
          currentStatus={DepositStatus.Paid}
          title="Thoả thuận đặt cọc giữ chỗ"
          disbursementStatus={DisbursementStatus.Pendingdisbursement}
        />
        <ProcessItems
          currentStatus={DepositStatus.Accept}
          title="Xác nhận giao dịch"
        />
        <ProcessItems
          currentStatus={DepositStatus.Accept}
          title="Đã tạo yêu cầu giao dịch"
        /> */}
        <ProcessItems
          disbursementStatus={disbursementStatusData}
          currentStatus={statusData}
          title="Thoả thuận đặt cọc"
          stepIndex={3}
        />
        <ProcessItems
          disbursementStatus={disbursementStatusData}
          currentStatus={statusData}
          title="Thoả thuận đặt cọc giữ chỗ"
          stepIndex={2}
        />
        <ProcessItems
          currentStatus={statusData}
          title="Xác nhận giao dịch"
          stepIndex={1}
        />
        <ProcessItems
          currentStatus={statusData}
          title="Đã tạo yêu cầu giao dịch"
          stepIndex={0}
        />
      </View>
    );
  };
  return (
    <View style={{ padding: 20 }}>
      <ThemedText type="defaultSemiBold">
        Theo dõi tiến trình đặt cọc giữ chỗ
      </ThemedText>
      <ProcessList />
    </View>
  );
};

const TransactionDetail = () => {
  const { id } = useLocalSearchParams();
  const [apartmentDetail, setApartmentDetail] = useState<Apartment>();
  const [data, setData] = useState<Deposit>();
  const [paymentUrl, setPaymentUrl] = useState<string>();
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [tradeModalVisible, setTradeModalVisible] = useState(false);
  const fetchDepositDetail = async () => {
    try {
      const res = await getDepositDetail(id);
      console.log("Get deposit detail", res);
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
      console.log("Get apartment detail", response?.data);
      setApartmentDetail(response?.data);
      return response?.data;
    } catch (error) {
      console.error("Get apartment detail API error:", error);
      throw error;
    }
  };

  React.useEffect(() => {
    if (data?.apartmentID) getApartmentDetail();
  }, [apartmentID]);

  const onPayment = async () => {
    try {
      const res = await createPayment(data?.depositID);
      setPaymentUrl(res.url);
      setPaymentModalVisible(true);
      // return res.url;
    } catch (error) {
      console.error(error);
    }
  };

  const onTradeRequest = () => {
    router.push({
      pathname: "/personal/pick-trade-apartment",
      params: {
        apartmentId: data?.apartmentID,
        depositId: data?.depositID,
      },
    });
  };

  React.useEffect(() => {
    if (data?.depositStatus === DepositStatus.Paid) {
      setPaymentModalVisible(false);
    }
  }, [data?.depositStatus]);

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
            <TransactionStatus status={data?.depositStatus as DepositStatus} />
            <TransactionProcess
              statusData={data?.depositStatus as DepositStatus}
              disbursementStatusData={data?.disbursementStatus}
            />
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
                <ThemedText type="small">Số tiền đặt cọc giữ chỗ</ThemedText>
                <View
                  style={{
                    flexWrap: "wrap",
                    alignItems: "flex-end",
                  }}
                >
                  <ThemedText type="price">
                    {formatCurrency(data?.paymentAmount)}
                  </ThemedText>
                </View>
              </View>

              <ThemedText
                style={[
                  styles.transactionInfoTitle,
                  {
                    width: "100%",
                    flexWrap: "wrap",
                    textAlign: "right",
                  },
                ]}
                type="default"
              >
                ({numberToWords(data?.paymentAmount as number)})
              </ThemedText>
              {data?.depositType === DepositType.Trade &&
                data?.depositStatus === DepositStatus.Accept && (
                  <View>
                    <ThemedText
                      type="default"
                      style={[
                        styles.transactionInfoTitle,
                        {
                          width: "100%",
                          flexWrap: "wrap",
                          textAlign: "right",
                        },
                      ]}
                    >
                      *(Đã bao gồm{" "}
                      <ThemedText type="defaultSemiBold">
                        {formatCurrency(data?.tradeFee as number)}
                      </ThemedText>{" "}
                      tiền phí trao đổi và trừ đi khoản tiền mà bạn đã thanh
                      toán trước đó)
                    </ThemedText>
                  </View>
                )}

              <Line width={"100%"} />
              <View style={styles.transactionInfoCol}>
                <ThemedText type="small">Mã giao dịch</ThemedText>
                <ThemedText style={styles.transactionInfoTitle} type="default">
                  {data?.depositCode}
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
            <TouchableOpacity style={{ backgroundColor: "#", padding: 10 }}>
              <Link
                href="/personal/personal-identify"
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#ececec",
                }}
              >
                <ThemedText>Uỷ nhiệm chi & Giấy tờ tuỳ thân</ThemedText>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="right" size={20} color="#000" />
                </View>
              </Link>
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
            <Button
              handlePress={() => {
                onPayment();
              }}
              title="Thanh toán tiền cọc"
              width={"90%"}
            />
          </ThemedView>
        </>
      )}

      {data?.depositStatus === DepositStatus.Paid &&
        data?.updateDate !== data?.createDate && (
          // data?.disbursementStatus == "PendingDisbursement" &&
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 30,
              borderTopWidth: 1,
              paddingTop: 20,
            }}
            onPress={() => {
              setTradeModalVisible(true);
            }}
          >
            <ThemedText type="defaultSemiBold">Có nhu cầu trao đổi?</ThemedText>
          </TouchableOpacity>
        )}

      <PaymentModal
        paymentModalVisible={paymentModalVisible}
        setPaymentModalVisible={setPaymentModalVisible}
        paymentUrl={paymentUrl || ""}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={tradeModalVisible}
        onRequestClose={() => {
          setTradeModalVisible(false);
        }}
        onPointerCancel={() => {
          setTradeModalVisible(false);
        }}
      >
        <ThemedView style={styles.tradeModalContainer}>
          <ThemedView
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThemedText type="defaultSemiBold">
              Gửi yêu cầu trao đổi căn hộ
            </ThemedText>
            <ThemedText style={styles.centerText}>
              Bạn có muốn trao đổi lên căn hộ khác
            </ThemedText>
            <ThemedText style={styles.centerText}>
              Lưu ý: Bạn chỉ có thể trao đổi căn hộ cùng giá trị hoặc cao hơn,
              ngoài ra bạn sẽ phải chịu thêm một khoản phí cho việc trao đổi
              này.
            </ThemedText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
                gap: 10,
              }}
            >
              <Button
                handlePress={() => {
                  setTradeModalVisible(false);
                }}
                title="Hủy"
                width={"45%"}
                backgroundColor="#CCC"
              />
              <Button
                handlePress={() => {
                  onTradeRequest();
                  setTradeModalVisible(false);
                }}
                title="Chọn căn hộ "
                width={"45%"}
              />
            </View>
          </ThemedView>
        </ThemedView>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  webView: {
    flex: 1,
    width: "100%",
  },
  tradeModalContainer: {
    marginTop: 20,
    borderColor: "#ccc",
    padding: 20,
    borderRadius: 10,
  },
});
