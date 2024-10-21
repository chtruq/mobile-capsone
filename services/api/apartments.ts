import apiClient from "./apiClient";
interface ApartmentSearchParams {
  apartmentName?: string;
  address?: string;
  district?: string;
  ward?: string;
  apartmentTypes?: number[];
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  numberOfRooms?: number;
  numberOfBathrooms?: number;
  directions?: number[];
  balconyDirections?: number[];
  saleStatuses?: number[];
  pageIndex?: number;
  pageSize?: number;
}

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
