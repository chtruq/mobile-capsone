import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as SignalR from "@microsoft/signalr";
import { ThemedView } from "@/components/ThemedView";

const Notify = () => {
  const [connection, setConnection] = useState<SignalR.HubConnection | null>(
    null
  );
  const [notifications, setNotifications] = useState<
    { title: string; description: string }[]
  >([]);
  const [status, setStatus] = useState<string>("Connecting...");

  const URL = process.env.EXPO_PUBLIC_BASE_URL;

  useEffect(() => {
    const connectSignalR = async () => {
      const hubConnection = new SignalR.HubConnectionBuilder()
        .withUrl(URL + "/notificationHub/negotiate") // Replace with your SignalR server URL and hub endpoint
        .withAutomaticReconnect()
        .configureLogging(SignalR.LogLevel.Information)
        .build();

      try {
        await hubConnection.start();
        setStatus("Connected");
        setConnection(hubConnection);
        console.log("SignalR connected.");
      } catch (error) {
        setStatus("Connection failed");
        console.error("SignalR connection error:", error);
      }
    };

    console.log("SignalR URL:", URL + "/notificationHub");
    connectSignalR();

    // Clean up connection on unmount
    return () => {
      if (connection) {
        connection?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (connection) {
      // Listen for notifications
      connection.on(
        "ReceiveNotification",
        (title: string, description: string) => {
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            { title, description },
          ]);
        }
      );
    }
  }, [connection]);

  const sendMessage = async () => {
    if (connection) {
      try {
        await connection.invoke("SendMessage", "user1", "Hello from Expo!");
      } catch (err) {
        console.error("Error sending message:", err);
      }
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.status}>{status}</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.notification}>
            <Text style={styles.title}>Title: {item.title}</Text>
            <Text>Description: {item.description}</Text>
          </View>
        )}
      />
      <Button title="Send Test Notification" onPress={sendMessage} />
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
