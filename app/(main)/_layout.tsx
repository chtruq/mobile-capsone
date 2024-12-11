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
        options={{
          headerShown: true,
          headerTitle: "Chủ đầu tư",
          headerBackTitle: "Trở lại",
        }}
      />
      <Stack.Screen
        name="deposit"
        options={{
          headerTitle: "Đặt căn hộ",
          headerTitleStyle: { fontSize: 24 },
          headerTitleAlign: "center",
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
      <Stack.Screen name="chat" options={{ headerShown: false }} />
      <Stack.Screen
        name="project-detail/[id]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default MainLayout;
