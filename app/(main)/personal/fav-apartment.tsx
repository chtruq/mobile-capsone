import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext";
import { apartmentsSearch } from "@/services/api/apartments";
import { Apartment } from "@/model/apartments";
import ApartmentCard from "@/components/Search/Apartment/ApartmentCard";

const FavList = () => {
  const { userInfo } = useAuth();
  const [favList, setFavList] = React.useState([]);

  const getFavList = async () => {
    // call api get favList
    try {
      const res = await apartmentsSearch({
        accountID: userInfo.id,
        userLiked: true,
      });
      console.log("API response:", res.data?.apartments);
      setFavList(res.data?.apartments);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getFavList();
  }, []);

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          padding: 10,
        }}
      >
        {favList.map((item: Apartment) => (
          <ApartmentCard key={item.apartmentID} data={item} />
        ))}
      </ScrollView>
    </ThemedView>
  );
};

export default FavList;
