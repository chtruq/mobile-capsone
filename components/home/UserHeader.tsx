import { View, Text, Image } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useAuth } from "@/context/AuthContext";

const UserHeader = () => {
  const { userInfo } = useAuth();

  console.log("userInfo", userInfo);

  return (
    <ThemedView
      style={{
        flex: 1,
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 10,
      }}
    >
      <ThemedView
        style={{
          gap: 10,
        }}
      >
        <ThemedText style={{ fontSize: 20, fontWeight: "bold" }} type="default">
          Xin chào,
        </ThemedText>
        <ThemedText
          style={{ fontSize: 24, fontWeight: "bold", marginLeft: 10 }}
          type="subtitle"
        >
          {userInfo?.name}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default UserHeader;
