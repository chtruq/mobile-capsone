import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CircleMinus from "@/assets/icon/personal/CircleMinus";
import { router } from "expo-router";

const TransactionManage = () => {
  const data = [
    {
      id: 1,
      title: "Thanh toán đặt cọc căn hộ 1",
      date: "2021-10-10",
      amount: 100000,
      type: "income",
    },
    {
      id: 2,
      title: "Thanh toán đặt cọc căn hộ 2",
      date: "2021-10-10",
      amount: 200000,
      type: "expense",
    },
    {
      id: 3,
      title: "Thanh toán đặt cọc căn hộ 3",
      date: "2021-10-10",
      amount: 300000,
      type: "income",
    },
    {
      id: 4,
      title: "Thanh toán đặt cọc căn hộ 4",
      date: "2021-10-10",
      amount: 400000,
      type: "expense",
    },
    {
      id: 5,
      title: "Thanh toán đặt cọc căn hộ 5",
      date: "2021-10-10",
      amount: 500000,
      type: "income",
    },
  ];

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <ThemedText></ThemedText>

      {data ? (
        <View>
          {data.map((item) => (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/personal/transaction-detail/[id]",
                  params: { id: item.id },
                });
              }}
              key={item.id}
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            >
              <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
              <ThemedText type="small">{item.date}</ThemedText>
              <ThemedText type="price">{item.amount} VND</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <CircleMinus />
          <ThemedText
            style={{
              marginTop: 20,
              textAlign: "center",
            }}
            type="defaultSemiBold"
          >
            Chưa có giao dịch nào
          </ThemedText>
          <ThemedText
            style={{
              textAlign: "center",
            }}
          >
            Hệ thống sẽ tự động cập nhật giao dịch mới nhất nếu có phát sinh
          </ThemedText>
        </View>
      )}
    </ThemedView>
  );
};

export default TransactionManage;
