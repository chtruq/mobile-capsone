import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ChatLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Hỗ trợ ",
        }}
      />
    </Stack>
  );
};

export default ChatLayout;
