import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FavIcon from "@/components/favoriteIcon/FavIcon";

export default function Project() {
  const data = [
    {
      id: 1,
      title: "Sky Dandelions Apartment",
      image: require("@/assets/images/home/home.png"),
      location: "Quận 9, Hồ Chí Minh",
      isFav: true,
    },
    {
      id: 2,
      title: "Sky Dandelions Apartment",
      image: require("@/assets/images/home/home.png"),

      location: "Quận 9, Hồ Chí Minh",
      isFav: false,
    },
    {
      id: 3,
      title: "Sky Dandelions Apartment",
      image: require("@/assets/images/home/home.png"),
      location: "Quận 9, Hồ Chí Minh",
      isFav: false,
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        padding: 10,
        paddingHorizontal: 10,
      }}
    >
      {data.map((item) => {
        return (
          <TouchableOpacity key={item.id}>
            <ImageBackground
              style={{
                width: 300,
                height: 200,
                marginRight: 10,
                borderRadius: 40,
                overflow: "hidden",
              }}
              resizeMode="cover"
              source={item.image}
            >
              <FavIcon
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 1,
                }}
                isFav={item.isFav}
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
                  type="subtitle"
                  style={{
                    fontSize: 16,
                    fontWeight: "semibold",
                    color: "white",
                  }}
                >
                  {item.title}
                </ThemedText>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons name="location-on" size={20} color="#FA712D" />
                  <ThemedText
                    style={{
                      color: "white",
                    }}
                    type="default"
                  >
                    {item.location}
                  </ThemedText>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
