import { View, Text } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";

const OrderStatus = () => {
  return (
    <ThemedView
      style={{
        paddingBottom: 300,
      }}
    >
      <ThemedText type="heading">Trạng thái đặt cọc</ThemedText>
      <ThemedView
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 15,
          borderColor: "#ccc",
          borderWidth: 1,
          margin: 15,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            borderRadius: 100,
            backgroundColor: Colors.light.primary,
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: Colors.light.background,
              fontSize: 30,
            }}
          >
            !
          </Text>
        </View>
        <View>
          <ThemedText
            style={{
              alignSelf: "center",
            }}
            type="heading"
          >
            Đang chờ xác thực
          </ThemedText>
          <ThemedText type="default">
            Yêu cầu đặt cọc căn hộ của bạn đang kiểm duyệt vui lòng chờ tới
            trong 24 giờ.
          </ThemedText>
        </View>
      </ThemedView>
    </ThemedView>
  );
};

export default OrderStatus;
