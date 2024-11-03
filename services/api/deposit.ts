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

export const getDepositHistory = async (id: any) => {
  try {
    console.log("Get deposit history for account ID:", id);
    const response = await apiClient.get(`/deposits/by-account/${id}`);
    console.log("Deposit history API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Deposit history API error:", error);
    throw error;
  }
};
