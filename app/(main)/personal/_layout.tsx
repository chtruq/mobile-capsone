import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const PersonalLayout = () => {
  return (
    <Stack>
      {/* <Stack.Screen
      name="index"
      options={{
        headerTitle: "Cá nhân",
        headerShown: true,
        headerTitleAlign: "center",
      }}
    /> */}
      <Stack.Screen
        name="personal-info"
        options={{
          headerTitle: "Thông tin cá nhân",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="transaction-manage"
        options={{
          headerTitle: "Quản lí giao dịch",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="transaction-detail/[id]"
        options={{
          headerTitle: "Chi tiết giao dịch",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="request-manage"
        options={{
          headerTitle: "Quản lí yêu cầu",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="request-detail/[id]"
        options={{
          headerTitle: "Chi tiết yêu cầu",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="consignment-manage"
        options={{
          headerTitle: "Quản lí ký gửi",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
};

export default PersonalLayout;
