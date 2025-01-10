import { View, Text, useColorScheme } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedView } from "../ThemedView";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";

const Notify = (props: { notiCount: number }) => {
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
      {}
      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 20,
          height: 20,
          borderRadius: 50,
          backgroundColor: "red",
        }}
      >
        <ThemedText
          type="defaultSemiBold"
          style={{
            color: "white",
            fontSize: 10,
            textAlign: "center",
          }}
        >
          {props.notiCount}
        </ThemedText>
      </View>
      <Ionicons
        name="notifications-outline"
        size={26}
        color={colorScheme === "dark" ? "white" : "black"}
      />
    </ThemedView>
  );
};

export default Notify;
