import { ApartmentSearchParams } from "@/model/apartments";
import apiClient from "./apiClient";
import { useAuth } from "@/context/AuthContext";

export const apartmentsSearch = async (params: ApartmentSearchParams) => {
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
