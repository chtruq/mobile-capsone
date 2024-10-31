import { ApartmentSearchParams } from "@/model/apartments";
import apiClient from "./apiClient";

export const apartmentsSearch = async (params: ApartmentSearchParams) => {
  console.log("params", params);
  try {
    const response = await apiClient.get("/apartments/search", { params });
    return response.data;
  } catch (error) {
    console.error("Apartments search API error:", error);
    throw error;
  }
};

export const apartmentsDetail = async (id: string | string[]) => {
  try {
    const response = await apiClient.get(`/apartments/${id}`);
    return response.data;
  } catch (error) {
    console.error("Apartments detail API error:", error);
    throw error;
  }
};
