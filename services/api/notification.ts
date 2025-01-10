import apiClient from "./apiClient";

export const getUserNotifications = async (userId: string) => {
  const res = await apiClient.get(
    `/notifications/search?accountId=${userId}&pageIndex=1&pageSize=20`
  );
  return res.data;
};

export const markNotificationAsRead = async (notificationId: string) => {
  const res = await apiClient.put(
    `/notifications/${notificationId}/mark-as-read`
  );
  return res.data;
};
