import * as signalR from "@microsoft/signalr";
import Toast from "react-native-toast-message";

type NotificationCallback = (notification: {
  accountId: string;
  title: string;
  description: string;
  type: string;
  referenceId: string;
}) => void;

type ChatMessage = (message: {
  id: string;
  sessionId: string;
  senderId: string;
  receiverId?: string;
  messageContent: string;
  timestamp: string;
  imageUrl?: string;
}) => void;

class SignalRService {
  private connection: signalR.HubConnection | null = null;
  private notificationCallback: NotificationCallback | null = null;
  private messageCallback: ChatMessage | null = null;

  private registerHandlers() {
    if (!this.connection) {
      // console.warn("SignalR connection not set yet.");
      return;
    }

    this.connection.on(
      "ReceiveNotification",
      (accountId, title, description, type, referenceId) => {
        console.log("Notification received:", {
          accountId,
          title,
          description,
          type,
          referenceId,
        });
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

    this.connection.on(
      "ReceiveChatMessage",
      (
        sessionId,
        messageId,
        senderId,
        receiverId,
        messageContent,
        timestamp,
        imageUrl
      ) => {
        if (this.messageCallback) {
          this.messageCallback({
            sessionId: sessionId,
            id: messageId,
            senderId: senderId,
            receiverId: receiverId,
            messageContent: messageContent,
            timestamp: timestamp,
            imageUrl: imageUrl,
          });
        }
      }
    );
  }

  public setNotificationCallback(callback: NotificationCallback) {
    this.notificationCallback = callback;
  }

  public setMessageCallback(callback: ChatMessage) {
    this.messageCallback = callback;
  }

  public async startConnection(token: string) {
    try {
      if (this.connection?.state === signalR.HubConnectionState.Connected) {
        console.log("SignalR is already connected.");
        return;
      }

      const BASE_URL = process.env.EXPO_PUBLIC_SIGNALR_URL;

      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(`${BASE_URL}/notificationHub`, {
          accessTokenFactory: () => token,
        })
        .configureLogging(signalR.LogLevel.None)
        .withAutomaticReconnect([0, 2000, 5000, 10000])
        .build();

      this.connection.onclose((error) => {
        // console.error("Connection closed. Attempting to reconnect...", error);
      });

      this.connection.onreconnecting((error) => {
        // console.warn("Reconnecting due to error...", error);
      });

      this.connection.onreconnected(() => {
        console.log("Reconnected to SignalR Hub.");
        this.registerHandlers(); // Đăng ký lại các sự kiện sau khi kết nối lại
      });

      await this.connection.start();
      console.log("SignalR connected successfully!");
      this.registerHandlers();
    } catch (err) {
      // console.error("SignalR Connection Error: ", err);

      throw err;
    }
  }

  public stopConnection() {
    if (this.connection) {
      this.connection.stop();
    }
  }

  public getConnection(): signalR.HubConnection | null {
    return this.connection;
  }

  public isConnected(): boolean {
    return this.connection?.state === signalR.HubConnectionState.Connected;
  }
}

export const signalRService = new SignalRService();
