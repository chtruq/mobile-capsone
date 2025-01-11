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
import { FlatList } from "react-native";

export default function ListProject({ refreshData }: { refreshData: boolean }) {
  const [data, setData] = React.useState([]);

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

  useEffect(() => {
    if (refreshData) {
      getProjects();
    }
  }, [refreshData]);

  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item: ProjectApartment) =>
        item.projectApartmentID.toString()
      }
      renderItem={({ item }) => (
        <View style={{ padding: 5, width: 350 }}>
          <ProjectCard data={item} />
        </View>
      )}
      style={{
        backgroundColor: "#fff",
      }}
    />
  );
}
