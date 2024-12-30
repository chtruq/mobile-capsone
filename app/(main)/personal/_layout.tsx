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
          headerBackTitle: "Trở về",
        }}
      />
      <Stack.Screen
        name="transaction-manage"
        options={{
          headerTitle: "Quản lí giao dịch",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitle: "Trở về",
        }}
      />
      <Stack.Screen
        name="transaction-detail/[id]"
        options={{
          headerTitle: "Chi tiết giao dịch",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitle: "Trở về",
        }}
      />
      <Stack.Screen
        name="request-manage"
        options={{
          headerTitle: "Quản lí yêu cầu",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitle: "Trở về",
        }}
      />
      <Stack.Screen
        name="request-detail/[id]"
        options={{
          headerTitle: "Chi tiết yêu cầu",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitle: "Trở về",
        }}
      />
      <Stack.Screen
        name="consignment-manage"
        options={{
          headerTitle: "Danh sách ký gửi",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitle: "Trở về",
        }}
      />
      <Stack.Screen
        name="fav-apartment"
        options={{
          headerTitle: "Danh sách yêu thích",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitle: "Trở về",
        }}
      />
      <Stack.Screen
        name="consignment-request"
        options={{
          headerTitle: "Yêu cầu ký gửi",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitle: "Trở về",
        }}
      />
      <Stack.Screen
        name="history-apartment"
        options={{
          headerTitle: "Căn hộ đã xem",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitle: "Trở về",
        }}
      />
      <Stack.Screen
        name="notitest"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="consignment-detail/[id]"
        options={{
          headerTitle: "Chi tiết yêu cầu ký gửi",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitle: "Trở về",
        }}
      />
      <Stack.Screen
        name="appoinment-request-detail/[id]"
        options={{
          headerTitle: "Chi tiết yêu cầu tư vấn",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitle: "Trở về",
        }}
      />
      <Stack.Screen
        name="pick-trade-apartment"
        options={{
          headerShown: true,
          headerTitle: "Chọn căn hộ",
          headerBackTitle: "Trở về",
        }}
      />
      <Stack.Screen
        name="trade-request-success"
        options={{
          headerShown: true,
          headerTitle: "Yêu cầu trao đổi",
          headerBackTitle: "Trở về",
        }}
      />
      <Stack.Screen
        name="personal-identify"
        options={{
          headerShown: true,
          headerTitle: "Uỷ nhiệm chi & giấy tờ tuỳ thân",
          headerBackTitle: "Trở về",
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default PersonalLayout;
