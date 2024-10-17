import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(signin)"
        options={{
          headerShown: false,
          headerTitle: "Đăng nhập",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 24 },
          headerBlurEffect: "light",
          headerBackTitle: "Trở về",
          headerBackTitleStyle: { fontSize: 16 },
        }}
      />

      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "Tạo tài khoản",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 24 },
          headerBlurEffect: "light",
          headerBackTitle: "Trở về",
          // headerBackTitleVisible: false,
          headerBackTitleStyle: { fontSize: 16 },
        }}
      />
      <Stack.Screen
        name="otp"
        options={{
          headerTitle: "Xác thực OTP",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 24 },
          headerBlurEffect: "light",
          headerBackTitle: "Trở về",
          // headerBackTitleVisible: false,
          headerBackTitleStyle: { fontSize: 16 },
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
