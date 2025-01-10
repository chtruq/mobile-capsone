import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";

export default function NotifyLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="noti"
        options={{
          headerTitle: "Thông báo",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
