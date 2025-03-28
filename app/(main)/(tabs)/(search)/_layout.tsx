import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Tìm kiếm",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
