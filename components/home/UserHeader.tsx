import { View, Text, Image } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

const UserHeader = () => {
  return (
    <ThemedView
      style={{
        flex: 1,
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Image
        source={require("../../assets/images/icon.png")}
        style={{ width: 60, height: 60, borderRadius: 50 }}
      />
      <ThemedView
        style={{
          gap: 10,
        }}
      >
        <ThemedText
          style={{ fontSize: 20, fontWeight: "bold" }}
          type="defaultSemiBold"
        >
          Xin chào, User
        </ThemedText>
        <ThemedText type="defaultSemiBold">Quận 9, Hồ Chí Minh</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default UserHeader;
