import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const ThemedButton = () => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.button;
  const textColor =
    colorScheme === "dark" ? Colors.dark.text : Colors.light.lightText;
  return (
    <TouchableOpacity
      style={{
        backgroundColor: backgroundColor,
        width: "80%",
        height: 70,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 10,
        marginVertical: 10,
      }}
    >
      <Text
        style={{
          color: textColor,
          fontSize: 16,
          lineHeight: 24,
        }}
      >
        Đăng nhập
      </Text>
    </TouchableOpacity>
  );
};

export default ThemedButton;
