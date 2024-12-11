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
import { getProjectsSearch } from "@/services/api/project";
import ProjectCard from "../Search/Project/ProjectCard";
import { ProjectApartment } from "@/model/projects";

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
  const getProjects = async () => {
    try {
      const response = await getProjectsSearch();
      setData(response?.data?.projects);
      return response?.data?.projects;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjects();
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
      {data.map((item: ProjectApartment) => (
        <View style={{ padding: 5, width: 300 }} key={item.projectApartmentID}>
          <ProjectCard data={item} />
        </View>
      ))}
    </ScrollView>
  );
}
