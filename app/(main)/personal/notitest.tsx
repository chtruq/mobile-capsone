import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import { NotificationService } from "@/services/Notification/NotificationService";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/button/Button";

export default function TestNotification() {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    registerForPushNotifications();

    // Lắng nghe khi nhận được notification
    notificationListener.current =
      NotificationService.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log("Notification received:", notification);
      });

    // Lắng nghe khi user nhấn vào notification
    responseListener.current =
      NotificationService.addNotificationResponseReceivedListener(
        (response) => {
          console.log("Notification response:", response);
        }
      );

    // Cleanup
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const registerForPushNotifications = async () => {
    const token = await NotificationService.registerForPushNotificationsAsync();
    setExpoPushToken(token);
    console.log("Expo push token:", token);
  };

  // Test các loại notification khác nhau
  const sendLocalNotification = async () => {
    await NotificationService.scheduleLocalNotification(
      "Test Local Notification",
      "Đây là một notification test!"
    );
  };

  const sendScheduledNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Scheduled Notification",
        body: "Notification này sẽ hiển thị sau 5 giây!",
      },
      trigger: {
        seconds: 5,
      },
    });
  };

  const sendNotificationWithData = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notification với Data",
        body: "Notification này chứa dữ liệu bổ sung!",
        data: { customData: "test123" },
      },
      trigger: null,
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Test Notifications</ThemedText>

      <View style={styles.tokenContainer}>
        <ThemedText style={styles.tokenTitle}>Your Expo Push Token:</ThemedText>
        <ThemedText style={styles.token}>{expoPushToken}</ThemedText>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Gửi Local Notification"
          handlePress={sendLocalNotification}
          width="100%"
        />

        <Button
          title="Gửi Scheduled Notification (5s)"
          handlePress={sendScheduledNotification}
          width="100%"
        />

        <Button
          title="Gửi Notification với Data"
          handlePress={sendNotificationWithData}
          width="100%"
        />
      </View>

      {notification && (
        <View style={styles.lastNotification}>
          <ThemedText style={styles.lastNotificationTitle}>
            Last Notification:
          </ThemedText>
          <ThemedText>Title: {notification.request.content.title}</ThemedText>
          <ThemedText>Body: {notification.request.content.body}</ThemedText>
          <ThemedText>
            Data: {JSON.stringify(notification.request.content.data)}
          </ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  tokenContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  tokenTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  token: {
    fontSize: 14,
  },
  buttonContainer: {
    gap: 10,
    marginBottom: 20,
  },
  lastNotification: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  lastNotificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
