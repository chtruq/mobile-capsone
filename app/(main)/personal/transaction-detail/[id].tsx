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
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import {
  getDepositDetail,
  sendRequestRefundDeposit,
} from "@/services/api/deposit";
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
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
interface TransactionStatusProps {
  status: DepositStatus;
}

interface TransactionProcessProps {
  statusData: DepositStatus;
  disbursementStatusData?: DisbursementStatus;
}

const TransactionStatus: FC<TransactionStatusProps> = ({ status }) => {
  const statusColors: { [key in DepositStatus]: string } = {
    [DepositStatus.Pending]: "#ccc",
    [DepositStatus.Accept]: "#ffe9b8",
    [DepositStatus.Reject]: "#ccc",
    [DepositStatus.Disable]: "#ffc6c6",
    [DepositStatus.PaymentFailed]: "#ffc6c6",
    [DepositStatus.Paid]: "#32CD32",
    [DepositStatus.TradeRequested]: "#c4e39f",
    [DepositStatus.Exported]: "#0000FF",
    [DepositStatus.RefundRequest]: "#28aad1",
    [DepositStatus.Refund]: "#bfeddf",
  };

  const backgroundColor = statusColors[status] || Colors.light.background;
  const statusIcon = (() => {
    switch (status) {
      case DepositStatus.Pending:
        // return "🔍";
        return;
      case DepositStatus.Accept:
        // return "✅";
        return;

      case DepositStatus.Reject:
        return;
      // return "❌";
      case DepositStatus.Disable:
        // return "❌";
        return;

      case DepositStatus.PaymentFailed:
        // return "❌";
        return;

      case DepositStatus.Paid:
        return;
      // return "✅";

      case DepositStatus.TradeRequested:
        return;
      // return "🔄";
      case DepositStatus.RefundRequest:
        return;

      case DepositStatus.Refund:
        return;
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
      case DepositStatus.RefundRequest:
        return "Yêu cầu hoàn tiền";
      case DepositStatus.Refund:
        return "Đã hoàn tiền";
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
        return "Đã thanh toán khoản tiền giữ chỗ";
      case DepositStatus.TradeRequested:
        return "Giao dịch trao đổi đã được yêu cầu";
      case DepositStatus.RefundRequest:
        return "Yêu cầu hoàn tiền đã được gửi";
      case DepositStatus.Refund:
        return "Tiền đã được hoàn về tài khoản của bạn, hãy kiểm tra tài khoản ngân hàng của bạn";
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
          // borderColor: "#FF4040",
          // borderWidth: 1,
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
  const [modalVisible, setModalVisible] = useState(false);
  const [note, setNote] = useState("");
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

  const sendRequestRefund = async () => {
    if (note === "") {
      Alert.alert("Bạn vui lòng nhập lý do muốn huỷ giao dịch");
      return false;
    }
    try {
      if (data?.depositID) {
        const res = await sendRequestRefundDeposit(data.depositID, note);
        console.log("Send request refund", res);
        setModalVisible(false);
        router.back();
        return res;
      }
      // return res.url;
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  React.useEffect(() => {
    fetchDepositDetail();
  }, []);

  const calculateTimeLeft = () => {
    type TimeLeft = {
      hours: number;
      minutes: number;
      seconds: number;
    };
    const difference = data?.expiryDate
      ? new Date(data.expiryDate).getTime() - Date.now()
      : 0;
    let timeLeft: TimeLeft = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [data?.expiryDate]);

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

            {data?.depositStatus === DepositStatus.Refund ||
            data?.depositStatus === DepositStatus.RefundRequest ? (
              <></>
            ) : (
              <>
                <TransactionProcess
                  statusData={data?.depositStatus as DepositStatus}
                  disbursementStatusData={data?.disbursementStatus}
                />
              </>
            )}

            <ThemedView
              style={{
                padding: 20,
              }}
            >
              {(data?.depositStatus === DepositStatus.Accept &&
                data?.updateDate !== data?.createDate &&
                timeLeft &&
                timeLeft.hours != 0) ||
                timeLeft.minutes != 0 ||
                (timeLeft.seconds != 0 && (
                  <View
                    style={{
                      width: "100%",
                      alignItems: "flex-end",
                    }}
                  >
                    <ThemedText type="default">
                      Bạn cần phải thanh toán trong:{" "}
                    </ThemedText>
                    <ThemedText
                      style={{
                        fontSize: 18,
                        textAlign: "right",
                        borderWidth: 1,
                        borderColor: "red",
                        borderRadius: 5,
                        padding: 5,
                      }}
                      type="price"
                    >
                      {timeLeft.hours} tiếng {timeLeft.minutes} phút{" "}
                      {timeLeft.seconds} giây
                    </ThemedText>
                  </View>
                ))}

              {/* show skeleton */}
              {data &&
                data?.depositStatus === DepositStatus.Accept &&
                new Date(data?.expiryDate).getTime() - Date.now() < 0 && (
                  <View style={{ width: "100%", alignItems: "flex-end" }}>
                    <ContentLoader
                      speed={2}
                      width="100%"
                      height={40}
                      viewBox="0 0 400 40"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                      style={{ alignSelf: "flex-end" }}
                    >
                      <Rect
                        x="0"
                        y="10"
                        rx="4"
                        ry="4"
                        width="200"
                        height="10"
                      />
                      <Rect
                        x="0"
                        y="30"
                        rx="4"
                        ry="4"
                        width="250"
                        height="10"
                      />
                    </ContentLoader>
                  </View>
                )}

              {data &&
                data?.depositStatus === DepositStatus.Accept &&
                new Date(data?.expiryDate).getTime() - Date.now() < 0 && (
                  <ThemedText
                    style={{
                      textAlign: "right",
                      marginTop: 10,
                    }}
                    type="red"
                  >
                    Đã hết hạn thanh toán
                  </ThemedText>
                )}
            </ThemedView>
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
              {data?.depositStatus === DepositStatus.RefundRequest && (
                <View>
                  <ThemedText type="defaultSemiBold">
                    Số tiền hoàn tiền:{" "}
                    <ThemedText type="price">
                      {formatCurrency(data?.disbursementDeposit)}
                    </ThemedText>
                  </ThemedText>
                  <ThemedText
                    style={[
                      styles.transactionInfoTitle,
                      {
                        width: "100%",
                        flexWrap: "wrap",
                        textAlign: "right",
                      },
                    ]}
                    type="defaultSemiBold"
                  >
                    (Đang chờ xác nhận hoàn tiền)
                  </ThemedText>
                </View>
              )}

              {data?.depositStatus === DepositStatus.Refund ? (
                <View>
                  <View style={styles.transactionInfoCol}>
                    <ThemedText type="small">Số tiền đã hoàn: </ThemedText>
                    <ThemedText type="price">
                      {formatCurrency(data?.disbursementDeposit)}
                    </ThemedText>
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
                    (Đã hoàn tiền)
                  </ThemedText>
                </View>
              ) : (
                <></>
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
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/personal/personal-identify",
                  params: {
                    depositId: data?.depositID,
                  },
                });
              }}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <ThemedText type="defaultSemiBold" style={{ padding: 10 }}>
                Uỷ nhiệm chi & Giấy tờ tuỳ thân
              </ThemedText>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="right" size={20} color="#000" />
              </View>
            </TouchableOpacity>
          </ThemedView>
        </View>
      </ScrollView>

      {data?.depositStatus === DepositStatus.Accept &&
        new Date(data.expiryDate).getTime() - Date.now() > 0 && (
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
        new Date(data?.expiryDate).getTime() - Date.now() > 0 && (
          <ThemedView
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 20,
            }}
          >
            <Button
              backgroundColor="#ffc6c6"
              textColor="#FF4040"
              handlePress={() => {
                setModalVisible(true);
              }}
              title="Không còn nhu cầu mua nữa? 
              Gửi yêu cầu hoàn tiền?"
              width={"90%"}
            />
          </ThemedView>
        )}

      <PaymentModal
        paymentModalVisible={paymentModalVisible}
        setPaymentModalVisible={setPaymentModalVisible}
        paymentUrl={paymentUrl || ""}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                height: 500,
                position: "absolute",
                bottom: 0,
              }}
            >
              <ThemedText type="heading" style={{ padding: 20 }}>
                Nhập lý do muốn huỷ giao dịch
              </ThemedText>
              <TextInput
                placeholder="Nhập lý do"
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 20,
                  height: 100,
                  textAlignVertical: "top",
                }}
                value={note}
                onChangeText={(text) => setNote(text)}
                multiline={true}
                numberOfLines={5}
              />
              <ThemedText type="default">
                Bạn sẽ nhận lại được khoản tiền là{" "}
                <ThemedText type="price">
                  {" "}
                  {formatCurrency(data?.disbursementDeposit)}
                </ThemedText>{" "}
                nếu yêu cầu được xác nhận
              </ThemedText>
              <ThemedText type="default">
                Lưu ý: Yêu cầu hoàn tiền sẽ được xử lý trong vòng 7 ngày làm
                việc sau khi yêu cầu được xác nhận.
              </ThemedText>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 60,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    sendRequestRefund();
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
        </TouchableWithoutFeedback>
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
