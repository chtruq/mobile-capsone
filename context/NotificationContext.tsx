import { getUserNotifications } from "@/services/api/notification";
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

type Notification = {
  accountId: string;
  title: string;
  description: string;
  type: string;
  referenceId: string;
  // created: string;
};

type NotificationContextType = {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  clearNotifications: () => void;
  reloadPage: boolean;
  setReloadPage: React.Dispatch<React.SetStateAction<boolean>>;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { userInfo } = useAuth();
  const [reloadPage, setReloadPage] = useState(false);
  const fetchUserNotifications = async () => {
    try {
      if (!userInfo?.id) {
        console.log("No user ID available");
        return;
      }
      const res = await getUserNotifications(userInfo?.id);
      console.log("Notifications fetched:", res?.data?.results);
      setNotifications(res?.data?.results);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setReloadPage(false);
    }
  };

  React.useEffect(() => {
    fetchUserNotifications();
  }, [reloadPage]);

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        clearNotifications,
        reloadPage,
        setReloadPage,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
