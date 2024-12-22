import apiClient from "./apiClient";

export const handleFavorite = async (
  ApartmentID: string,
  favorite: boolean,
  accountID: string
) => {
  try {
    if (favorite) {
      // remove from fav
      const res = await apiClient.delete("/apartment-interactions", {
        params: {
          apartmentId: ApartmentID,
          accountID: accountID,
          interactionTypes: 1,
        },
      });
      return res.data;
    } else {
      // add to fav
      const res = await apiClient.post("/apartment-interactions/create", {
        apartmentId: ApartmentID,
        accountID: accountID,
        interactionTypes: 1,
      });
      console.log(res.data);
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleInteraction = async (
  apartmentID: string,
  accountID: string
) => {
  try {
    console.log("apartmentID", apartmentID);
    console.log("accountID", accountID);
    const res = await apiClient.post("/apartment-interactions/create", {
      apartmentID: apartmentID,
      accountID: accountID,
      interactionTypes: 2,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getHistoryApartment = async (accountID: string) => {
  try {
    const res = await apiClient.get(
      `/apartment-interactions/search?interactionType=2&accountID=${accountID}&pageIndex=1&pageSize=20`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
