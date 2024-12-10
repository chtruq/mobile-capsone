import { signalRService } from "@/services/api/signalRservice";
import { useState, useEffect } from "react";

export const useSignalR = (token: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const connectToSignalR = async () => {
      try {
        setIsLoading(true);
        await signalRService.startConnections(token);

        const notificationConnection =
          signalRService.getNotificationConnection();
        const chatConnection = signalRService.getChatConnection();

        notificationConnection?.onreconnecting(() => {
          console.log("Reconnecting to Notification Hub...");
          setIsConnected(false);
        });

        notificationConnection?.onreconnected(() => {
          console.log("Reconnected to Notification Hub!");
          setIsConnected(true);
        });

        chatConnection?.onreconnecting(() => {
          console.log("Reconnecting to Chat Hub...");
          setIsConnected(false);
        });

        chatConnection?.onreconnected(() => {
          console.log("Reconnected to Chat Hub!");
          setIsConnected(true);
        });

        setIsConnected(true); // Connection successful
        setError(null); // Clear error on success
      } catch (err) {
        setIsConnected(false); // Connection failed
        setError(
          err instanceof Error ? err.message : "Failed to connect to SignalR"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      connectToSignalR();
    }

    return () => {
      signalRService.stopConnections();
    };
  }, [token]);

  return { isConnected, isLoading, error };
};
