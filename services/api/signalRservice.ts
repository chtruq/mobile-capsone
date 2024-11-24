import * as signalR from "@microsoft/signalr";
import Toast from "react-native-toast-message";

type NotificationCallback = (notification: {
  accountId: string;
  title: string;
  description: string;
  type: string;
  referenceId: string;
}) => void;

class SignalRService {
  private connection: signalR.HubConnection | null = null;
  private notificationCallback: NotificationCallback | null = null;

  public setNotificationCallback(callback: NotificationCallback) {
    this.notificationCallback = callback;
  }

  public async startConnection(token: string) {
    try {
      const BASE_URL = process.env.EXPO_PUBLIC_SIGNALR_URL;

      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(`${BASE_URL}/notificationHub`, {
          accessTokenFactory: () => token,
        })
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      await this.connection.start();
      console.log("SignalR Connected!");

      this.connection.on(
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

          // Hiển thị toast notification
          Toast.show({
            type: "info",
            text1: title,
            text2: description,
          });
        }
      );
    } catch (err) {
      console.error("SignalR Connection Error: ", err);
      throw err;
    }
  }

  public stopConnection() {
    if (this.connection) {
      this.connection.stop();
    }
  }

  public isConnected(): boolean {
    return this.connection?.state === signalR.HubConnectionState.Connected;
  }
}

export const signalRService = new SignalRService();
