import { View, Text } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ThemedText } from "./ThemedText";
const OtpTimer = () => {
  return (
    <ThemedView
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 20,
        padding: 10,
        width: 100,
        alignSelf: "center",
        marginTop: 20,
      }}
    >
      <MaterialCommunityIcons name="timer-outline" size={24} color="black" />
      <ThemedText type="default">00:59</ThemedText>
    </ThemedView>
  );
};

export default OtpTimer;
