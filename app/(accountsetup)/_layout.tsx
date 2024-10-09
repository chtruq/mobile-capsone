import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AcouuntSetupLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="user"
        options={{
          headerTitle: "Thiết lập tài khoản",
          headerTitleAlign: "center",
          headerBackTitle: "Trở về",
          headerBackTitleStyle: { fontSize: 16 },
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Thiết lập tài khoản",
          headerTitleAlign: "center",
          headerBlurEffect: "light",
          headerBackTitle: "Trở về",
          headerBackTitleStyle: { fontSize: 16 },
        }}
      />
      <Stack.Screen
        name="success-modal"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AcouuntSetupLayout;
