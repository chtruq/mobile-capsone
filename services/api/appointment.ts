import apiClient from "./apiClient";

export const createAppointment = async (
  id: string,
  userId: string,
  preferredDate: Date,
  preferredTime: string,
  userName: string,
  phoneNumber: string,
  note: string
) => {
  const response = await apiClient.post(`/appointmentrequests/create`, {
    customerID: userId,
    apartmentID: id,
    preferredDate: preferredDate,
    preferredTime: preferredTime,
    username: userName,
    phoneNumber: phoneNumber,
    note: note,
  });
  return response.data;
};

export const getRequestAppointmentList = async (userId: string) => {
  const response = await apiClient.get(
    `/appointmentrequests/search?customerId=${userId}&pageIndex=1&pageSize=10`
  );
  return response.data;
};

export const cancelAppointmentRequest = async (id: string) => {
  const response = await apiClient.put(
    `/appointmentrequests/update-status/${id}?newStatus=4`
  );
  return response.data;
};

export const getAppointmentRequestDetail = async (id: string) => {
  const response = await apiClient.get(`/appointmentrequests/${id}`);
  return response.data;
};

export const getUserAppoinment = async (userId: string) => {
  const response = await apiClient.get(
    `/appointments/search?CustomerID=${userId}`
  );
  return response.data;
};

export const getAppointmentDetail = async (id: string) => {
  const response = await apiClient.get(`/appointments/${id}`);
  return response.data;
};

export const cancelAppointment = async (id: string) => {
  const response = await apiClient.put(
    `/appointments/cancel-appointment/${id}`
  );
  return response.data;
};
