import { View, Text, TouchableOpacity, Image } from "react-native";
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

const TransactionCard: FC<TransProps> = ({ data }) => {
  const apartmentID = data.apartmentID.toString();
  const [apartmentDetail, setApartmentDetail] = React.useState<Apartment>();

  const getApartmentDetail = async () => {
    try {
      const response = await apartmentsDetail(apartmentID);
      setApartmentDetail(response.data);
      return response.data;
    } catch (error) {
      console.error("Get apartment detail API error:", error);
      throw error;
    }
  };

  useEffect(() => {
    getApartmentDetail();
  }, []);

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
          <ThemedText type="defaultSemiBold">
            {data?.depositStatus === 1
              ? "Đang chờ xác nhận"
              : data?.depositStatus === 2
              ? "Tạo giao dịch thành công"
              : data?.depositStatus === 3
              ? "Đã từ chối"
              : data?.depositStatus === 4
              ? "Giao dịch đã bị huỷ"
              : "Không xác định"}
          </ThemedText>
          <ThemedText type="small">
            Mã căn:
            <ThemedText>{data?.depositID}</ThemedText>
          </ThemedText>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View>
            <Image
              source={{ uri: apartmentDetail?.images[0].imageUrl }}
              style={{ width: 90, height: 90, borderRadius: 20 }}
            />
          </View>
          <View
            style={{
              marginLeft: 10,
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
                {formatCurrency(data.depositAmount)}
              </ThemedText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default TransactionCard;
