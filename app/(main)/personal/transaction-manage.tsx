import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CircleMinus from "@/assets/icon/personal/CircleMinus";
import { router } from "expo-router";
import { getDepositHistory } from "@/services/api/deposit";
import { useAuth } from "@/context/AuthContext";
import { Deposit } from "@/model/deposit";
import TransactionCard from "@/components/transaction/transactionCard";

const TransactionManage = () => {
  const { userInfo } = useAuth();

  const [data, setData] = React.useState([]);
  const fetchData = async () => {
    try {
      const res = await getDepositHistory(userInfo.id);
      setData(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <ThemedText></ThemedText>

      {data ? (
        <ScrollView>
          {data?.map((item: Deposit) => (
            <TransactionCard key={item.depositID} data={item} />
          ))}
        </ScrollView>
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
