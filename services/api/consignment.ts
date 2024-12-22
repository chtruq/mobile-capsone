import apiClient from "./apiClient";

export const getListConsignmentsByAccount = async (id: String) => {
  try {
    const response = await apiClient.get(
      `/property-requests/search?ownerId=${id}&requestStatuses=3&pageIndex=1&pageSize=5`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getConsignmentDetail = async (id: string) => {
  try {
    const res = await apiClient.get(`/property-requests/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
