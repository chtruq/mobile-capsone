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

const Project = ({ refreshData }: { refreshData: boolean }) => {
  const [data, setData] = useState([]);

  const { userInfo } = useAuth();

  const getApartments = async () => {
    try {
      const response = await apartmentsSearch({
        accountId: userInfo?.id,
        apartmentStatuses: 1,
      });
      setData(response.data.apartments);
      return response.data;
    } catch (error) {
      console.error("Get project API error:", error);
      throw error;
    }
  };

  useEffect(() => {
    getApartments();
  }, [userInfo, apartmentsSearch]);

  useEffect(() => {
    if (refreshData) {
      getApartments();
    }
  }, [refreshData]);

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
