import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as SignalR from "@microsoft/signalr";
import { ThemedView } from "@/components/ThemedView";
import { useNotifications } from "@/context/NotificationContext";
import { ThemedText } from "@/components/ThemedText";
import { signalRService } from "@/services/api/signalRservice";
import { useAuth } from "@/context/AuthContext";

const Notify = () => {
  const { userToken } = useAuth();
  const { notifications, addNotification } = useNotifications();
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Disconnected");

  useEffect(() => {
    const initializeSignalR = async () => {
      if (!userToken) {
        console.log("No user token available");
        return;
      }

      try {
        console.log("Initializing SignalR...");
        setConnectionStatus("Connecting...");

        signalRService.setNotificationCallback((notification) => {
          console.log("Notification callback triggered:", notification);
          addNotification(notification);
        });

        await signalRService.startConnection(userToken);
        setConnectionStatus("Connected");
      } catch (error) {
        console.error("SignalR initialization error:", error);
        setConnectionStatus("Connection Failed");
      }
    };

    initializeSignalR();

    return () => {
      console.log("Cleaning up SignalR connection...");
      signalRService.stopConnection();
    };
  }, [userToken]);

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      {/* Debug Info */}
      <View style={{ marginBottom: 20 }}>
        <ThemedText>Connection Status: {connectionStatus}</ThemedText>
        <ThemedText>User Token: {userToken ? "Present" : "Missing"}</ThemedText>
        <ThemedText>Total Notifications: {notifications.length}</ThemedText>
      </View>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ThemedText>Không có thông báo nào</ThemedText>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 16,
                backgroundColor: "#f5f5f5",
                marginBottom: 8,
                borderRadius: 8,
              }}
            >
              <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
              <ThemedText>{item.description}</ThemedText>
              <ThemedText type="small" style={{ marginTop: 4 }}>
                Type: {item.type}
              </ThemedText>
            </View>
          )}
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  status: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  notification: {
    marginBottom: 15,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Notify;
