import { Property } from "@/model/property";
import apiClient from "./apiClient";

export const sendPropertyRequest = async (property: Property) => {
  try {
    const res = await apiClient.post(
      "/property-requests/create-property-request",
      property
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
