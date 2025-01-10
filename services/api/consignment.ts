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

export const getConsigmentApartment = async (
  id: string,
  pageIndex?: number
) => {
  try {
    const res = await apiClient.get(
      `/apartments/search?accountOwnerId=${id}&pageIndex=${
        pageIndex ? pageIndex : 1
      }&pageSize=5`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getApartmentStatistic = async (id: string) => {
  try {
    const res = await apiClient.get(`/apartment-interactions/count/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const cancelConsignment = async (id: string) => {
  try {
    const res = await apiClient.put(
      `/apartments/updateStatus/${id}?apartmentStatus=4`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
