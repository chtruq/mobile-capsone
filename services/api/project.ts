import apiClient from "./apiClient";

export const getProjects = async () => {
  try {
    const response = await apiClient.get("/projects/get-all");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
