import apiClient from "./apiClient";

export const getUserNotifications = async (userId: string) => {
  const res = await apiClient.get(
    `/notifications/search?accountId=${userId}&pageIndex=1&pageSize=20`
  );
  return res.data;
};
