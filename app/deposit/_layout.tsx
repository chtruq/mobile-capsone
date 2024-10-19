import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function DepositLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Deposit",
          headerTitleStyle: { fontSize: 24 },
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
