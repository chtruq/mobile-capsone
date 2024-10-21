import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";

export default function SignUpLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Sign Up",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
