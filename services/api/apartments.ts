import { ApartmentSearchParams } from "@/model/apartments";
import apiClient from "./apiClient";
import qs from "qs";
export const apartmentsSearch = async (params?: ApartmentSearchParams | {}) => {
  try {
    console.log("data", qs.stringify(params));
    const response = await apiClient.get(
      `/apartments/search?${qs.stringify(params)}&apartmentStatuses=1`
    );
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

export const getProjectCart = async (
  id: string | string[],
  searchTerm?: string
) => {
  const searchTerms = searchTerm || "";
  console.log("id", id);
  console.log("searchTerm", searchTerms);

  try {
    const response = await apiClient.get(
      `/apartments/search?projectId=${id}&apartmentName=${
        searchTerms ? searchTerms : ""
      }&apartmentStatuses=1&apartmentStatuses=1&pageIndex=1&pageSize=20`
    );
    return response.data;
  } catch (error) {
    console.error("Apartments detail API error:", error);
    throw error;
  }
};

export const getApartmentByOwner = async (id: string, accountID: string) => {
  console.log("id", id);
  console.log("accountID", accountID);

  try {
    const response = await apiClient.get(
      `/apartments/${id}?accountId=${accountID}`
    );

    return response.data;
  } catch (error) {
    console.error("Apartments detail API error:", error);
    throw error;
  }
};
