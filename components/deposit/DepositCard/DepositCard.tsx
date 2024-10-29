import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import React, { FC } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Apartment } from "@/model/apartments";
import { formatCurrency } from "@/model/other";

interface DepositCardProps {
  data: Apartment | undefined;
}

const DepositCard: FC<DepositCardProps> = ({ data }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}
      >
        <Image
          style={{
            width: 100,
            height: 100,
          }}
          source={{ uri: data?.images[0].imageUrl }}
        />
        <View
          style={{
            marginLeft: 10,
            width: "70%",
          }}
        >
          <ThemedText
            type="price"
            style={{
              marginBottom: 5,
            }}
          >
            {formatCurrency(data?.price)}
          </ThemedText>
          <ThemedText type="default" numberOfLines={3}>
            {data?.apartmentName}
          </ThemedText>
        </View>
      </View>
      <View
        style={{
          marginVertical: 10,
        }}
      >
        <ThemedText type="heading">Chi tiết thanh toán</ThemedText>
        <View
          style={{
            marginVertical: 10,
            borderBlockColor: "#000",
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}
        >
          <View style={styles.flexRow}>
            <ThemedText type="default">Phí đặt cọc căn hộ</ThemedText>
            <ThemedText type="default">
              {formatCurrency(data?.pricePerSquareMeter)}
            </ThemedText>
          </View>
          <View style={styles.flexRow}>
            <ThemedText type="default">Phí dịch vụ phát sinh</ThemedText>
            <ThemedText type="default">{"0"}</ThemedText>
          </View>
        </View>
        <View
          style={{
            borderBlockColor: "#000",
            borderBottomWidth: 1,
            paddingBottom: 10,
          }}
        >
          <View style={styles.flexRow}>
            <ThemedText type="default">Tổng tiền tạm tính</ThemedText>
            <ThemedText type="default">
              {formatCurrency(data?.pricePerSquareMeter)}
            </ThemedText>
          </View>
          <View style={styles.flexRow}>
            <ThemedText type="default">Số lượng căn hộ</ThemedText>
            <ThemedText type="default">{"1"} căn</ThemedText>
          </View>
        </View>

        <View style={[styles.flexRow, styles.endRow]}>
          <ThemedText>Phải thanh toán</ThemedText>
          <ThemedText type="price">{data?.pricePerSquareMeter} VND </ThemedText>
        </View>
      </View>
    </View>
  );
};

export default DepositCard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingTop: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  endRow: {
    marginTop: 10,
  },
});
