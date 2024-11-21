import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  useColorScheme,
} from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import Area from "@/assets/icon/area";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FavIcon from "../favoriteIcon/FavIcon";
import { apartmentsSearch } from "@/services/api/apartments";
import { Apartment } from "@/model/apartments";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import ApartmentCard from "../Search/Apartment/ApartmentCard";

export default function ListProject() {
  const [data, setData] = React.useState([]);

  // const data = [
  //   {
  //     id: 1,
  //     name: "Căn hộ view sông Sài Gòn, view grand park 81",
  //     image: require("@/assets/images/home/home.png"),
  //     area: "55,8",
  //     location: "Quận 9, TP.HCM",
  //     price: "1,5 tỷ",
  //     isFav: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Căn hộ view sông Sài Gòn, view grand park 81",
  //     image: require("@/assets/images/home/home.png"),

  //     area: "55,8",
  //     location: "Quận 9, TP.HCM",
  //     price: "1,5 tỷ",
  //     isFav: true,
  //   },
  //   {
  //     id: 3,
  //     name: "Căn hộ view sông Sài Gòn, view grand park 81",
  //     image: require("@/assets/images/home/home.png"),

  //     area: "55,8",
  //     location: "Quận 9, TP.HCM",
  //     price: "1,5 tỷ",
  //     isFav: false,
  //   },
  //   {
  //     id: 4,
  //     name: "Căn hộ view sông Sài Gòn, view grand park 81",
  //     image: require("@/assets/images/home/home.png"),

  //     area: "55,8",
  //     location: "Quận 9, TP.HCM",
  //     price: "1,5 tỷ",
  //     isFav: false,
  //   },
  // ];

  const { userInfo } = useAuth();
  const colorScheme = useColorScheme();
  const getApartments = async () => {
    try {
      const response = await apartmentsSearch({
        accountId: userInfo?.id,
      });
      setData(response.data.apartments);
      return response.data.apartments;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getApartments();
  }, [userInfo, apartmentsSearch]);

  //refresh when add or remove favorite

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{
        backgroundColor: "#fff",
      }}
    >
      {data.map((item: Apartment) => (
        <View key={item.apartmentID}>
          <ApartmentCard data={item} />
        </View>
      ))}
    </ScrollView>
  );
}
