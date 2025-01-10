import apiClient from "./apiClient";

export const getUserInfo = async (userId: string) => {
  const res = await apiClient.get(`/accounts/${userId}`);
  return res.data;
};
