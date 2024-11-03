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
      setData(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getApartments();
  }, []);

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{
        backgroundColor: "#fff",
      }}
    >
      {data.map((item: Apartment) => (
        <TouchableOpacity
          style={{
            backgroundColor: "#f5f4f8",
            marginRight: 10,
            borderRadius: 40,
            height: 330,
            width: 250,
          }}
          key={item.apartmentID}
          onPress={() => {
            router.push({
              pathname: "/details/[id]",
              params: { id: item.apartmentID },
            });
          }}
        >
          <View>
            <Image
              source={{ uri: item?.images[0]?.imageUrl }}
              style={{
                width: 250,
                height: 200,
                borderRadius: 40,
              }}
            />
            <FavIcon
              isFav={item.userLiked}
              // isFav={true}
              style={{ position: "absolute", top: 10, right: 10 }}
            />
          </View>

          <View
            style={{
              margin: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ThemedText
                style={{
                  color:
                    colorScheme === "dark"
                      ? Colors.dark.textPrice
                      : Colors.light.textPrice,
                  fontSize: 20,
                }}
              >
                {/* price */}
                {item.price}
              </ThemedText>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                {/* svg */}
                <View
                  style={{
                    width: 20,
                    height: 20,
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <Area />
                </View>
                {/* area */}
                <Text>{item.area}m2</Text>
              </View>
            </View>

            <ThemedText
              type="title"
              style={{
                fontSize: 16,
                color:
                  colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
                lineHeight: 25,
              }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {/* name */}
              {item.apartmentName}
            </ThemedText>
            {/* location */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="location-on" size={20} color="#FA712D" />
              <Text>{item.location}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
