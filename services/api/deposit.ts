import apiClient from "./apiClient";

export const depositRequest = async (data: any) => {
  console.log("Deposit request data:", data);
  try {
    const formData = new FormData();

    // const response = await apiClient.post("/deposits/request", data);
    // return response.data;
  } catch (error) {
    console.error("Deposit API error:", error);
    throw error;
  }
};
