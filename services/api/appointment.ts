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

export const getRequestAppointmentList = async (userId: string) => {
  const response = await apiClient.get(
    `/appointmentrequests/search?customerId=${userId}&pageIndex=1&pageSize=10`
  );
  return response.data;
};

export const getAppointmentRequestDetail = async (id: string) => {
  const response = await apiClient.get(`/appointmentrequests/${id}`);
  return response.data;
};
