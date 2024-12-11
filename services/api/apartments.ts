import { ApartmentSearchParams } from "@/model/apartments";
import apiClient from "./apiClient";
import qs from "qs";
export const apartmentsSearch = async (params?: ApartmentSearchParams | {}) => {
  try {
    const response = await apiClient.get(
      `/apartments/search?${qs.stringify(params)}`
    );
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Apartments search API error:", error);
    throw error;
  }
};

export const apartmentsDetail = async (
  id: string | string[],
  accountID?: string
) => {
  try {
    const response = await apiClient.get(`/apartments/${id}`, {
      params: {
        accountID: accountID,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Apartments detail API error:", error);
    throw error;
  }
};

export const getProjectCart = async (id: string | string[]) => {
  try {
    const response = await apiClient.get(
      `/apartments/search?projectId=${id}&pageIndex=1&pageSize=20`
    );
    return response.data;
  } catch (error) {
    console.error("Apartments detail API error:", error);
    throw error;
  }
};
