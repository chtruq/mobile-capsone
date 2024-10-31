import apiClient from "./apiClient";

export const depositRequest = async (data: any) => {
  console.log("Deposit request data:", data);
  try {
    const formData = new FormData();
    formData.append("ApartmentID", data.apartmentId);
    formData.append("AccountID", data.accountId);
    formData.append("DepositProfile.FullName", data.scannedName);
    formData.append("DepositProfile.IdentityCardNumber", data.scannedIdNumber);
    formData.append("DepositProfile.Email", data.email);
    formData.append("DepositProfile.Phone", data.phone);
    
    // const response = await apiClient.post("/deposits/request", data);
    // return response.data;
  } catch (error) {
    console.error("Deposit API error:", error);
    throw error;
  }
};
