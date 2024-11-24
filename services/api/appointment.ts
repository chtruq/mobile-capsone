import apiClient from "./apiClient";

export const createAppointment = async (
  id: string,
  userId: string,
  preferredDate: Date,
  preferredTime: string,
  userName: string,
  phoneNumber: string
) => {
  const response = await apiClient.post(`/appointmentrequests/create`, {
    customerID: userId,
    apartmentID: id,
    preferredDate: preferredDate,
    preferredTime: preferredTime,
    username: userName,
    phoneNumber: phoneNumber,
  });
  return response.data;
};
