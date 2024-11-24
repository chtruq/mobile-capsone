import apiClient from "./apiClient";

export const createPayment = async (data: any) => {
  try {
    const response = await apiClient.get(`/payment/create?depositId=${data}`);
    return response.data;
  } catch (error) {
    console.error("Create payment API error:", error);
    throw error;
  }
};
