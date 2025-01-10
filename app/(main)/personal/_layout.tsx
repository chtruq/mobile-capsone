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
      <Stack.Screen
        name="appointment"
        options={{
          headerShown: true,
          headerTitle: "Danh sách lịch hẹn",
          headerBackTitle: "Trở về",
        }}
      />
      <Stack.Screen
        name="appointment-detail/[id]"
        options={{
          headerShown: true,
          headerTitle: "Chi tiết lịch hẹn",
          headerBackTitle: "Trở về",
        }}
      />
      <Stack.Screen
        name="appointment-create"
        options={{
          headerShown: true,
          headerTitle: "Tạo lịch hẹn",
          headerBackTitle: "Trở về",
        }}
      />
      <Stack.Screen
        name="appointment-update/[id]"
        options={{
          headerShown: true,
          headerTitle: "Cập nhật lịch hẹn",
          headerBackTitle: "Trở về",
        }}
      />

      <Stack.Screen
        name="appartment-consignment/[id]"
        options={{
          headerShown: true,
          headerTitle: "Chi tiết căn hộ ký gửi",
          headerBackTitle: "Trở về",
        }}
      />
    </Stack>
  );
};

export default PersonalLayout;
