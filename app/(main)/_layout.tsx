import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      // Nếu người dùng chưa xác thực, điều hướng đến (auth)
      router.replace("/(auth)");
    }
  }, [isAuthenticated]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="details/[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="provider-detail/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="deposit"
        options={{
          headerTitle: "Đặt căn hộ",
          headerTitleStyle: { fontSize: 24 },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="personal"
        options={{
          headerTitle: "Cá nhân",
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default MainLayout;
