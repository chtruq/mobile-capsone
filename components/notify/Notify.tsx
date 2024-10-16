import { View, Text, useColorScheme } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedView } from "../ThemedView";
import { Colors } from "@/constants/Colors";
const Notify = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemedView
      style={{
        backgroundColor:
          colorScheme === "dark"
            ? Colors.dark.background
            : Colors.light.background,
        borderRadius: 100,
        borderColor: Colors.light.primary,
        borderWidth: 1,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons
        name="notifications-outline"
        size={26}
        color={colorScheme === "dark" ? "white" : "black"}
        // color="black"
      />
    </ThemedView>
  );
};

export default Notify;
