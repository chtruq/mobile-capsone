import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

const TransactionDetail = () => {
  const { id } = useLocalSearchParams();

  const data = {
    id: 1,
    title: "Thanh toán đặt cọc căn hộ 1",
    date: "2021-10-10",
    code: "0123456789",
    amount: 100000,
    type: "Chuyển tiền thông qua VN pay",
    note: "Đặt cọc căn hộ với mã 091241",
  };

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          paddingVertical: 10,
          padding: 30,
          marginTop: 30,
        }}
      >
        <View
          style={{
            height: 60,
            backgroundColor: Colors.light.primary,
            width: 60,
            borderRadius: 100,
          }}
        >
          <Text
            style={{
              color: Colors.light.background,
              fontSize: 25,
              textAlign: "center",
              lineHeight: 60,
            }}
          >
            ✓
          </Text>
        </View>
      </View>
      <ThemedText
        style={{
          textAlign: "center",
          marginBottom: 10,
        }}
        type="price"
      >
        {data.amount}
      </ThemedText>
      <ThemedText
        style={{
          textAlign: "center",
          marginBottom: 10,
        }}
        type="success"
      >
        Chuyển khoản thành công
      </ThemedText>
      <View
        style={{
          padding: 20,
          borderColor: "#ccc",
          borderWidth: 1,
          margin: 20,
          borderRadius: 10,
        }}
      >
        <ThemedText type="defaultSemiBold">Thông tin đơn hàng: </ThemedText>
        <ThemedText type="small">Thời gian</ThemedText>
        <ThemedText type="default">{data.date}</ThemedText>
        <ThemedText type="small">Mã giao dịch</ThemedText>
        <ThemedText type="default">{data.code}</ThemedText>
        <ThemedText type="small">Loại giao dịch</ThemedText>
        <ThemedText type="default">{data.type}</ThemedText>
        <ThemedText type="small">Nội dung</ThemedText>
        <ThemedText type="default">{data.note}</ThemedText>
      </View>
    </ThemedView>
  );
};

export default TransactionDetail;
