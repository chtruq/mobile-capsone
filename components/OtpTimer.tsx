import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "./ThemedView";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ThemedText } from "./ThemedText";
const OtpTimer = ({ second, setSecond }: any) => {
  const [seconds, setSeconds] = useState(second);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  useEffect(() => {
    setSecond(seconds);
  }, [seconds]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
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
      <ThemedText type="default">{formatTime(seconds)}</ThemedText>
    </ThemedView>
  );
};

export default OtpTimer;
