import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const VRLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="vrview"
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack>
  );
};

export default VRLayout;
