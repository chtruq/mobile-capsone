import { View, Text } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext";
import { useSignalR } from "@/hooks/useSignalR";

const ChatScreen = () => {
  const { userToken } = useAuth();
  const { isConnected, error } = useSignalR(userToken || "");

  return (
    <ThemedView style={{ flex: 1 }}>
      <Text>
        Connection Status: {isConnected ? "Connected" : "Disconnected"}
      </Text>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <Text>ChatScreen</Text>
    </ThemedView>
  );
};

export default ChatScreen;
