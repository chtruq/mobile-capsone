import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Href, router } from "expo-router";

interface ThemedButtonProps {
  title: string;
  link?: Href<string | object>;
  handlePress?: () => void;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  link,
  handlePress,
}) => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.button : Colors.light.button;
  const textColor =
    colorScheme === "dark" ? Colors.dark.darkText : Colors.light.lightText;

  // const hanldePress = () => {
  //   if (typeof link === "string" || typeof link === "object") {
  //     router.push(link);
  //   } else {
  //     console.log("No link");
  //   }
  // };

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
      onPress={handlePress}
    >
      <Text
        style={{
          color: textColor,
          fontSize: 16,
          lineHeight: 24,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ThemedButton;
