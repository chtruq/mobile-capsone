import apiClient from "./apiClient";

export const getCurrentSetting = async () => {
  try {
    const response = await apiClient.get("/settings/current");
    return response?.data;
  } catch (error) {
    console.error("Get current setting API error:", error);
    throw error;
  }
};
