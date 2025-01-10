import { View, Text } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";

const ProviderListLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="list"
        options={{
          headerTitle: "Danh sách nhà cung cấp",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ProviderListLayout;
