import { ScannedInfo } from "@/model/deposit";
import apiClient from "./apiClient";

export const depositRequest = async (data: ScannedInfo) => {
  console.log("Deposit request data:", data);

  try {
    const formData = new FormData();
    formData.append("ApartmentID", data.apartmentId);
    formData.append("AccountID", data.accountId);
    formData.append("DepositProfile.FullName", data.scannedName);
    formData.append("DepositProfile.IdentityCardNumber", data.scannedIdNumber);
    formData.append("DepositProfile.DateOfIssue", data.scannedIssueDate);
    formData.append("DepositProfile.DateOfBirth", data.scannedBirthDate);
    formData.append("DepositProfile.Email", data.email);
    formData.append("DepositProfile.PhoneNumber", data.phone);
    formData.append("DepositProfile.Nationality", "Vietnam");
    formData.append("DepositProfile.Address", data.scannedAddress);
    formData.append("DepositProfile.IdentityCardFrontImage", {
      uri: data.selectedFrontImage,
      type: "image/jpeg", // Explicitly set type as image/jpeg
      name: "front.jpg", // Name the file as in the cURL command
    } as any);

    formData.append("DepositProfile.IdentityCardBackImage", {
      uri: data.selectedBackImage,
      type: "image/jpeg", // Explicitly set type as image/jpeg
      name: "back.jpg", // Name the file as in the cURL command
    } as any);
    formData.append("note", "ok");
    console.log("Deposit request form data:", formData);

    const response = await apiClient.post("/deposits/request", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Deposit API response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Deposit API error:", error);
    if (error.response) {
      const responseData = error.response.data;

      if (responseData.errors) {
        const validationErrors = responseData.errors;
        for (const key in validationErrors) {
          if (validationErrors.hasOwnProperty(key)) {
            validationErrors[key].forEach((message: string) => {
              console.error(`${key}: ${message}`);
            });
          }
        }
      }

      // Check for general error message
      if (responseData.statusCode === 400 && responseData.message) {
        console.error(
          `Error ${responseData.statusCode}: ${responseData.message}`
        );
      }
    }

    throw error;
  }
};

export const getDepositHistory = async (id: string) => {
  try {
    const response = await apiClient.get(`/deposits/by-account/${id}`);
    console.log("Deposit history API response:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Deposit history API error:", error);
    throw error;
  }
};

export const getDepositHistoryByAccount = async (
  id: any,
  pageNumber: number
) => {
  try {
    const response = await apiClient.get(
      `/deposits/search?accountId=${id}&pageIndex=${pageNumber}&pageSize=5`
    );
    console.log("Deposit history API response:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Deposit history API error:", error);
    throw error;
  }
};

export const getDepositDetail = async (id: any) => {
  try {
    const response = await apiClient.get(`/deposits/${id}`);
    console.log("Deposit detail API response:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Deposit detail API error:", error);
    throw error;
  }
};

export const getTradeList = async (userId: string) => {
  const response = await apiClient.get(
    `/deposits/search?accountId=${userId}&depositStatus=7`
  );
  console.log("Trade list API response:", response.data.data);
  return response.data.data;
};

export const sendTradeRequest = async (
  depositId: string | string[],
  newApartmentCode: string
) => {
  try {
    console.log(
      "Trade request data:",
      "depositId: ",
      depositId,
      "newApartmentCode: ",
      newApartmentCode
    );
    const response = await apiClient.post(
      `/deposits/trade-request/${depositId}`,
      {
        newApartmentCode: newApartmentCode,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("Trade request API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Trade request API error:", error);
    throw error;
  }
};
