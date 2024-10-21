import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // Nếu người dùng đã xác thực, điều hướng đến (main)
      router.replace("/(main)");
    }
  }, [isAuthenticated]);

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
