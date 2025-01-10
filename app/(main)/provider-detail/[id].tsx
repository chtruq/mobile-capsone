import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import FavIcon from "@/components/favoriteIcon/FavIcon";
import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import {
  getProjectProviderCart,
  getProjectProviderDetail,
} from "@/services/api/projectProvider";
import { ApartmentProjectProvider } from "@/model/projectProvider";
import { ProjectApartment } from "@/model/projects";
import ProjectCard from "@/components/Search/Project/ProjectCard";

const ProviderDetail = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<ApartmentProjectProvider>();
  const [cartList, setCartList] = useState<ProjectApartment[]>();
  const getProviderData = async () => {
    try {
      const response = await getProjectProviderDetail(id as string);
      console.log(response);
      setData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProviderProjectCartList = async () => {
    try {
      const res = await getProjectProviderCart(id as string);
      console.log("projectList", res?.data?.projects);
      setCartList(res?.data?.projects);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProviderData();
    getProviderProjectCartList();
  }, []);

  return (
    <ThemedScrollView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          marginHorizontal: 10,
        }}
      >
        <Image
          source={{ uri: data?.diagramUrl }}
          style={{
            width: 150,
            height: 150,
            borderColor: "#ccc",
            borderWidth: 2,
          }}
        />
        <View
          style={{
            marginVertical: 10,
          }}
        >
          <ThemedText type="defaultSemiBold">
            {data?.apartmentProjectProviderName}
          </ThemedText>
        </View>
      </View>
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      >
        <ThemedText>Địa chỉ:</ThemedText>
        <ThemedText type="defaultSemiBold">{data?.location}</ThemedText>
      </View>

      <View
        style={{
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "#ccc",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      ></View>

      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <ThemedText
          type="defaultSemiBold"
          style={{
            fontSize: 20,
            fontWeight: "600",
            marginBottom: 10,
          }}
        >
          Giới thiệu
        </ThemedText>
        <ThemedText type="default">
          {data?.apartmentProjectDescription}
        </ThemedText>
      </View>

      {/* gio hang project */}
      <View
        style={{
          flexDirection: "row",
          width: "100%",
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <ThemedText
              type="defaultSemiBold"
              style={{
                fontSize: 20,
                fontWeight: "600",
                marginLeft: 10,
              }}
            >
              Dự án
            </ThemedText>

            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/(main)/(tabs)/(search)",
                  params: {
                    homeSearchType: "Dự án",
                    providerId: id,
                  },
                });
              }}
            >
              <ThemedText
                type="default"
                style={{
                  fontSize: 16,
                  marginRight: 10,
                }}
              >
                Xem thêm
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          backgroundColor: "#fff",
        }}
      >
        {cartList?.map((item: ProjectApartment) => (
          <View
            style={{ padding: 5, width: 300 }}
            key={item.projectApartmentID}
          >
            <ProjectCard data={item} />
          </View>
        ))}
      </ScrollView>
    </ThemedScrollView>
  );
};

export default ProviderDetail;

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
  },
});
