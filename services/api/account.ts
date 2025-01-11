import apiClient from "./apiClient";

export const getUserInfo = async (userId: string) => {
  const res = await apiClient.get(`/accounts/${userId}`);
  return res.data;
};

export const updateUserInfo = async (userId: string, data: any) => {
  const res = await apiClient.put(`/accounts/update-account/${userId}`, data);
  return res.data;
};
