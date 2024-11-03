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

export default function Project() {
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
      return response.data;
    } catch (error) {
      console.error("Get project API error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getApartments();
      setData(data);
    };
    fetchData();
  }, []);

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
        console.log("item", item.images[0]?.imageUrl);

        return (
          <Pressable key={item.apartmentID}>
            <Link
              href={{
                pathname: "/details/[id]",
                params: { id: item.apartmentID },
              }}
            >
              <ImageBackground
                style={{
                  width: 300,
                  height: 200,
                  marginRight: 10,
                  borderRadius: 40,
                  overflow: "hidden",
                }}
                resizeMode="cover"
                width={300}
                height={200}
                source={{ uri: item.images[0]?.imageUrl }}
              >
                <FavIcon
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 1,
                  }}
                  isFav={item.userLiked}
                />

                <View
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10,
                    borderRadius: 10,
                    marginVertical: 10,
                    position: "absolute",
                    bottom: 0,
                  }}
                >
                  <ThemedText
                    type="heading"
                    style={{
                      fontSize: 16,
                      fontWeight: "semibold",
                      color: "white",
                      borderBlockColor: "#000",
                    }}
                  >
                    {item.apartmentName}
                  </ThemedText>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons
                      name="location-on"
                      size={20}
                      color="#FA712D"
                    />
                    <ThemedText
                      style={{
                        color: "white",
                      }}
                      type="default"
                    >
                      {item.address}
                    </ThemedText>
                  </View>
                </View>
              </ImageBackground>
            </Link>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
