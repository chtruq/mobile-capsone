import apiClient from "./apiClient";

export const getListProjectProvider = async () => {
  try {
    const response = await apiClient.get("/projectproviders/get-all");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProjectProviderDetail = async (id: string) => {
  try {
    const response = await apiClient.get(`/projectproviders/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProjectProviderCart = async (id: string) => {
  try {
    const response = await apiClient.get(
      `/projects/search?ApartmentProjectProviderID=${id}&pageIndex=1&pageSize=20`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
