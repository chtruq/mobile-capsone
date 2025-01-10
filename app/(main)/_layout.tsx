import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      // Nếu người dùng chưa xác thực, điều hướng đến (auth)
      router.replace("/(auth)/(signin)");
    }
  }, [isAuthenticated]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="details/[id]"
        options={{ headerShown: false, headerBackTitle: "Trở lại" }}
      />
      <Stack.Screen
        name="provider-detail/[id]"
        options={{
          headerShown: true,
          headerTitle: "Nhà cung cấp",
          headerBackTitle: "Trở lại",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="deposit"
        options={{
          headerTitle: "Đặt căn hộ",
          headerTitleStyle: { fontSize: 24 },
          headerTitleAlign: "center",
          headerBackTitle: "Trở lại",
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
      <Stack.Screen
        name="vr"
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen
        name="providerlist"
        options={{
          headerShown: true,
          headerTitle: "Danh sách nhà cung cấp",
          headerBackTitle: "Trở lại",
        }}
      />
    </Stack>
  );
};

export default MainLayout;
