import apiClient from "./apiClient";

export const getListProjectProvider = async () => {
  try {
    const response = await apiClient.get("/projectproviders/get-all");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
