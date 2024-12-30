import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

const TradeRequested = () => {
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: Colors.light.primary,
          padding: 10,
          borderRadius: 50,
          marginBottom: 20,
        }}
      >
        <Ionicons name="checkmark-outline" size={50} color="white" />
      </View>
      <ThemedText>Bạn đã gửi yêu cầu trao đổi căn hộ thành công</ThemedText>
      <ThemedText>Sẽ sớm có nhân viên liên hệ lại với bạn </ThemedText>

      <TouchableOpacity
        style={{
          backgroundColor: Colors.light.primary,
          padding: 10,
          borderRadius: 50,
          marginTop: 20,
        }}
        onPress={() => {
          router.dismissAll();
          //   router.replace("/(main)/(tabs)/(home)");
        }}
      >
        <ThemedText style={{ color: "white" }}>
          Quay về Quản lí giao dịch
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default TradeRequested;
