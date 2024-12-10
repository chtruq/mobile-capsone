import * as signalR from "@microsoft/signalr";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

type NotificationCallback = (notification: {
  accountId: string;
  title: string;
  description: string;
  type: string;
  referenceId: string;
}) => void;

type ChatCallback = (message: {
  accountId: string;
  sessionId: string;
  message: string;
}) => void;

class SignalRService {
  private notificationConnection: signalR.HubConnection | null = null;
  private chatConnection: signalR.HubConnection | null = null;

  private notificationCallback: NotificationCallback | null = null;
  private chatCallback: ChatCallback | null = null;

  public setNotificationCallback(callback: NotificationCallback) {
    this.notificationCallback = callback;
  }

  public setChatCallback(callback: ChatCallback) {
    this.chatCallback = callback;
  }

  public async startConnections(token: string) {
    const BASE_URL = process.env.EXPO_PUBLIC_SIGNALR_URL;

    try {
      // Notification Hub Connection
      this.notificationConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${BASE_URL}/notificationHub`, {
          accessTokenFactory: () => token,
        })
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      this.notificationConnection.onreconnecting((error) => {
        console.warn("Notification Hub reconnecting...", error);
      });

      this.notificationConnection.onreconnected(() => {
        console.log("Notification Hub reconnected!");
      });

      this.notificationConnection.onclose((error) => {
        console.error("Notification Hub connection closed:", error);
      });

      await this.notificationConnection.start();
      console.log("Notification Hub Connected!");

      this.notificationConnection.on(
        "ReceiveNotification",
        (
          accountId: string,
          title: string,
          description: string,
          type: string,
          referenceId: string
        ) => {
          if (this.notificationCallback) {
            this.notificationCallback({
              accountId,
              title,
              description,
              type,
              referenceId,
            });
          }
        }
      );

      // Chat Hub Connection
      this.chatConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${BASE_URL}/chatHub`, {
          accessTokenFactory: () => token,
        })
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      this.chatConnection.onreconnecting((error) => {
        console.warn("Chat Hub reconnecting...", error);
        Toast.show({
          type: "info",
          text1: "Reconnecting...",
          text2: "Attempting to reconnect to the chat server.",
        });
      });

      this.chatConnection.onreconnected(() => {
        console.log("Chat Hub reconnected successfully.");
        Toast.show({
          type: "success",
          text1: "Reconnected",
          text2: "You are now reconnected to the chat server.",
        });
      });

      this.chatConnection.onclose((error) => {
        console.error("Chat Hub connection closed:", error);
        Toast.show({
          type: "error",
          text1: "Connection Lost",
          text2: "Unable to connect to the chat server.",
        });
      });

      await this.chatConnection.start();
      console.log("Chat Hub Connected!");

      this.chatConnection.on(
        "ReceiveChatMessage",
        (sessionId, senderId, messageContent, timestamp) => {
          console.log("Received data:", {
            sessionId,
            senderId,
            messageContent,
            timestamp,
          });
          if (this.chatCallback) {
            this.chatCallback({
              accountId: senderId,
              sessionId,
              message: messageContent,
            });
          }
        }
      );
    } catch (err) {
      console.error("SignalR Connection Error:", err);
      Alert.alert("Connection Error", "Unable to connect to the server.");
      throw err;
    }
  }

  public stopConnections() {
    if (this.notificationConnection) {
      this.notificationConnection.stop().catch((err) => {
        console.error("Error stopping Notification Hub connection:", err);
      });
    }

    if (this.chatConnection) {
      this.chatConnection.stop().catch((err) => {
        console.error("Error stopping Chat Hub connection:", err);
      });
    }
  }

  public isConnectedToNotificationHub(): boolean {
    return (
      this.notificationConnection?.state ===
      signalR.HubConnectionState.Connected
    );
  }

  public isConnectedToChatHub(): boolean {
    return this.chatConnection?.state === signalR.HubConnectionState.Connected;
  }

  public getNotificationConnection(): signalR.HubConnection | null {
    return this.notificationConnection;
  }

  public getChatConnection(): signalR.HubConnection | null {
    return this.chatConnection;
  }
}

export const signalRService = new SignalRService();
