import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as SignalR from "@microsoft/signalr";
import { ThemedView } from "@/components/ThemedView";
import { useNotifications } from "@/context/NotificationContext";
import { ThemedText } from "@/components/ThemedText";
import { signalRService } from "@/services/api/signalRservice";
import { useAuth } from "@/context/AuthContext";
import {
  getUserNotifications,
  markNotificationAsRead,
} from "@/services/api/notification";
import { router, useFocusEffect } from "expo-router";

type Notifications = {
  notificationID: string;
  accountId: string;
  title: string;
  description: string;
  type: string;
  referenceId: string;
  created: string;
  isRead: boolean;
};

const Notify = () => {
  const { userToken, userInfo } = useAuth();
  const { notifications, addNotification, reloadPage, setReloadPage, setLoad } =
    useNotifications();
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Disconnected");

  useEffect(() => {
    setLoad(true);
  }, []);

  const initializeSignalR = async () => {
    if (!userToken) {
      console.log("No user token available");
      return;
    }
    try {
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

  useFocusEffect(
    useCallback(() => {
      initializeSignalR();

      return () => {
        console.log("Cleaning up SignalR connection...");
        signalRService.stopConnection();
      };
    }, [])
  );

  const handleDirectByNotification = async (notification: Notifications) => {
    try {
      await markNotificationAsRead(notification.notificationID);
    } catch (error) {
      console.log(error);
    }
    setReloadPage(true);
    if (notification.description.includes("Cuộc hẹn")) {
      router.push({
        pathname: "/(main)/personal/appointment-detail/[id]",
        params: { id: notification.referenceId },
      });
    } else if (notification.description.includes("Yêu cầu ký gửi")) {
      router.push({
        pathname: "/(main)/personal/consignment-detail/[id]",
        params: { id: notification.referenceId },
      });
    } else if (
      notification.description.includes("Yêu cầu của bạn cho căn hộ")
    ) {
      router.push({
        pathname: "/(main)/personal/appoinment-request-detail/[id]",
        params: { id: notification.referenceId },
      });
    }
  };

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      {/* Debug Info */}
      <View style={{ marginBottom: 20 }}>
        {/* <ThemedText>Connection Status: {connectionStatus}</ThemedText>
        <ThemedText>User Token: {userToken ? "Present" : "Missing"}</ThemedText>
        <ThemedText>Total Notifications: {notifications.length}</ThemedText> */}
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
          refreshControl={
            <RefreshControl
              refreshing={reloadPage}
              onRefresh={() => {
                setReloadPage(true);
              }}
            />
          }
          renderItem={({ item }: { item: Notifications; index: number }) => (
            <TouchableOpacity
              onPress={() => {
                // Alert.alert(item.title, item.description);
                handleDirectByNotification(item);
              }}
              style={[
                {
                  padding: 16,
                  backgroundColor: item.isRead ? "#f5f5f5" : "#e0f7fa", // Change background color based on isRead
                  marginBottom: 8,
                  borderRadius: 8,
                  borderWidth: item.isRead ? 0 : 2, // Add border for unread notifications
                  borderColor: item.isRead ? "transparent" : "#00796b", // Border color for unread notifications
                },
              ]}
            >
              <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
              <ThemedText>{item.description}</ThemedText>
              {/* <ThemedText type="small" style={{ marginTop: 4 }}>
                Loại: {item.type ? item.type : "Không xác định"}
              </ThemedText> */}
              <ThemedText type="small" style={{ marginTop: 4 }}>
                Thời gian: {new Date(item.created).toLocaleString()}
              </ThemedText>
            </TouchableOpacity>
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
