import apiClient from "./apiClient";

export const sendPropertyRequest = async (property: object) => {
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

export const getPropertyList = async (accountId: string) => {
  const res = await apiClient(
    `/property-requests/search?ownerId=${accountId}&pageIndex=1&pageSize=20`
  );
  return res.data;
};
