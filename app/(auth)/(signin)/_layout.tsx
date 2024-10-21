import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";

export default function SignIn() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Sign In",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
