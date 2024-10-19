import { View, Text, useColorScheme, TouchableOpacity } from "react-native";
import React from "react";
import { Href, router } from "expo-router"; // Assuming you are using expo-router
import { Colors } from "@/constants/Colors";

interface ButtonProps {
  title: string;
  link?: Href<string | object>;
  handlePress?: () => void;
  backgroundColor?: string;
  width?: string | number; // Allow both string (e.g., "80%") or number (e.g., 200)
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  link,
  handlePress,
  backgroundColor,
  width,
  textColor,
}) => {
  const colorScheme = useColorScheme();
  const bgColor =
    colorScheme === "dark" ? Colors.dark.button : Colors.light.button;
  const txtColor =
    colorScheme === "dark" ? Colors.dark.darkText : Colors.light.lightText;

  const handleButtonPress = () => {
    if (handlePress) {
      handlePress(); // If custom press handler is provided, use it
    } else if (link) {
      router.push(link); // If link is provided, use router to navigate
    } else {
      console.log("No action defined"); // Optional fallback in case no link or handler
    }
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: backgroundColor || bgColor,
        width: typeof width === "string" && width.endsWith("%") ? width : "80%", // Only allow valid percentage strings
        height: 70,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 20,
        marginVertical: 10,
      }}
      onPress={handleButtonPress}
    >
      <Text
        style={{
          color: textColor || txtColor,
          fontSize: 16,
          lineHeight: 24,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
