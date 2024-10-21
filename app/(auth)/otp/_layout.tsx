import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";

export default function OtpLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "OTP",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
