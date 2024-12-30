import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CircleMinus from "@/assets/icon/personal/CircleMinus";
import { router } from "expo-router";
import {
  getDepositHistory,
  getDepositHistoryByAccount,
} from "@/services/api/deposit";
import { useAuth } from "@/context/AuthContext";
import { Deposit } from "@/model/deposit";
import TransactionCard from "@/components/transaction/transactionCard";

const TransactionManage = () => {
  const { userInfo } = useAuth();

  const [data, setData] = React.useState<Deposit[]>([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const fetchData = async (pageNumber: number) => {
    try {
      setLoading(true);
      const res = await getDepositHistoryByAccount(userInfo.id, pageNumber);
      if (pageNumber === 1) {
        setData(res?.deposits || []);
      } else {
        setData((prev) => [...prev, ...(res?.deposits || [])]);
      }
      setHasMore(res?.deposits?.length > 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
      fetchData(page + 1);
    }
  };
  useEffect(() => {
    fetchData(1);
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData(1).then(() => {
      setRefreshing(false);
      setPage(1);
    });
  }, []);
  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      {data ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TransactionCard key={item.depositID} data={item} />
          )}
          keyExtractor={(item: Deposit) => item.depositID.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
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
