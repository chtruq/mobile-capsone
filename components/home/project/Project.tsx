import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FavIcon from "@/components/favoriteIcon/FavIcon";
import { Link, router } from "expo-router";
import { apartmentsSearch } from "@/services/api/apartments";
import { Apartment } from "@/model/apartments";
import { useAuth } from "@/context/AuthContext";
import ApartmentCard from "@/components/Search/Apartment/ApartmentCard";

const Project = ({ refreshData }: { refreshData: () => void }) => {
  const [data, setData] = useState([]);
  // const data = [
  //   {
  //     id: 1,
  //     title: "Sky Dandelions Apartment",
  //     image: require("@/assets/images/home/home.png"),
  //     location: "Quận 9, Hồ Chí Minh",
  //     isFav: true,
  //   },
  //   {
  //     id: 2,
  //     title: "Sky Dandelions Apartment",
  //     image: require("@/assets/images/home/home.png"),

  //     location: "Quận 9, Hồ Chí Minh",
  //     isFav: false,
  //   },
  //   {
  //     id: 3,
  //     title: "Sky Dandelions Apartment",
  //     image: require("@/assets/images/home/home.png"),
  //     location: "Quận 9, Hồ Chí Minh",
  //     isFav: false,
  //   },
  // ];
  const { userInfo } = useAuth();

  const getApartments = async () => {
    try {
      const response = await apartmentsSearch({
        accountId: userInfo?.id,
      });
      setData(response.data);
      return response.data;
    } catch (error) {
      console.error("Get project API error:", error);
      throw error;
    }
  };

  useEffect(() => {
    getApartments();
  }, [userInfo, apartmentsSearch]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        padding: 10,
        paddingHorizontal: 10,
      }}
    >
      {data?.map((item: Apartment) => {
        return (
          <View
            style={{
              width: 350,
              marginRight: 10,
            }}
            key={item.apartmentID}
          >
            <ApartmentCard data={item} />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Project;
