import apiClient from "./apiClient";

export const handleFavorite = async (
  ApartmentID: string,
  favorite: boolean,
  accountID: string
) => {
  try {
    if (favorite) {
      // remove from fav
      // const res = await apiClient.delete("/apartment-interactions", {
      //   apartmentId: ApartmentID,
      //   accountID: accountID,
      // });

      return "aaa";
    } else {
      // add to fav
      const res = await apiClient.post("/apartment-interactions/create", {
        apartmentID: ApartmentID,
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
