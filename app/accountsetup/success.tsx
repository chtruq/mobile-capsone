import { View, Text } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function success() {
  return (
    <ThemedView>
      <ThemedText>Đăng kí thành công</ThemedText>
      <ThemedText>Trở về trang đăng nhập</ThemedText>
    </ThemedView>
  );
}
