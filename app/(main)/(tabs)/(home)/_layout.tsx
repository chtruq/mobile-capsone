import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Home",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
