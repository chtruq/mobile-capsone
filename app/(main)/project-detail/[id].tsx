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
import { getProjectDetail } from "@/services/api/project";
import { ProjectApartment } from "@/model/projects";
import { getProjectCart } from "@/services/api/apartments";
import ApartmentCard from "@/components/Search/Apartment/ApartmentCard";
import { Apartment } from "@/model/apartments";
import { ThemedView } from "@/components/ThemedView";

const ProjectDetail = () => {
  const { id } = useLocalSearchParams();
  console.log(id);
  const [data, setData] = useState<ProjectApartment>();
  const [cartList, setCartList] = useState<Apartment[]>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / 360);
    setCurrentIndex(index);
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  const getProjectData = async () => {
    // call api get project
    try {
      const res = await getProjectDetail(id as string);
      setData(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getProjectCartList = async () => {
    try {
      const res = await getProjectCart(id, "");
      res.data && setCartList(res?.data?.apartments);
      console.log("cartList", res?.data?.apartments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjectData();
    getProjectCartList();
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
          justifyContent: "center",
          width: "100%",
          height: 300,
        }}
      >
        <FlatList
          data={data?.projectImages}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={360} // Chiều rộng của mỗi item + padding
          snapToAlignment="center"
          decelerationRate="fast"
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Pressable>
              <Image
                source={{ uri: item.url }}
                style={{
                  width: 350,
                  height: 300,
                  marginHorizontal: 5,
                }}
                // resizeMode="contain"
                resizeMethod="auto"
              />
            </Pressable>
          )}
          contentContainerStyle={{
            height: 300,
          }}
          style={{
            width: "100%",
          }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "rgba(166, 166, 166, 0.65)",
            width: 50,
            borderRadius: 10,
            marginRight: 10,
            marginBottom: 10,
          }}
        >
          <Text
            style={{ textAlign: "center", marginVertical: 10, color: "white" }}
          >
            {currentIndex + 1}/{data?.projectImages?.length}
          </Text>
        </View>
      </View>
      {/* <FavIcon
        isFav
        style={{
          position: "absolute",
          top: 40,
          right: 20,
          zIndex: 1,
        }}
      /> */}
      <View
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginHorizontal: 10,
        }}
      >
        <ThemedText
          type="title"
          style={{
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          {data?.projectApartmentName}
        </ThemedText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="location-on" size={16} color="#53587A" />
          <ThemedText
            type="default"
            style={{
              fontSize: 16,
              color: "gray",
              textDecorationLine: "underline",
            }}
          >
            {data?.address}
          </ThemedText>
        </View>
        <View style={styles.flex}>
          <ThemedText>Chủ đầu tư: </ThemedText>
          <ThemedText>{data?.apartmentProjectProviderName}</ThemedText>
        </View>

        {/* thong tin du an */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <View>
            <ThemedText>Số căn hộ </ThemedText>
            <ThemedText type="price">{data?.totalApartment} căn</ThemedText>
          </View>
          <View>
            <ThemedText type="default">Diện tích </ThemedText>
            <ThemedText type="heading">{data?.projectArea} ha</ThemedText>
          </View>
          <View>
            <ThemedText>Số toà </ThemedText>
            <ThemedText type="heading">{data?.projectSize}</ThemedText>
          </View>
        </View>

        <View
          style={{
            borderWidth: 0.5,
          }}
        ></View>

        <View>
          <ThemedText
            type="heading"
            style={{ fontSize: 18, marginVertical: 10 }}
          >
            Thông tin mô tả
          </ThemedText>
          <ThemedText>{data?.projectApartmentDescription}</ThemedText>
        </View>
        <View>
          <ThemedText
            type="heading"
            style={{ fontSize: 18, marginVertical: 10 }}
          >
            Tiện ích
          </ThemedText>
          <View>
            {data?.facilities?.map((item) => (
              <View style={styles.flex} key={item.facilitiesID}>
                <MaterialIcons name="done" size={16} color="#53587A" />
                <ThemedText>{item.facilitiesName}</ThemedText>
              </View>
            ))}
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <ThemedText
              type="heading"
              style={{ fontSize: 18, marginVertical: 10 }}
            >
              Giỏ hàng
            </ThemedText>
            {cartList && (
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: "/(main)/(tabs)/(search)",
                    params: {
                      homeSearchType: "Căn hộ",
                      projectId: id,
                    },
                  });
                }}
              >
                <ThemedText
                  type="default"
                  style={{
                    fontSize: 16,
                  }}
                >
                  Xem tất cả
                </ThemedText>
              </TouchableOpacity>
            )}
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={cartList}
            keyExtractor={(item: Apartment) => item.apartmentID.toString()}
            renderItem={({ item }) => (
              <View style={{ padding: 5, width: 300 }}>
                <ApartmentCard data={item} />
              </View>
            )}
            style={{
              backgroundColor: "#fff",
            }}
            ListEmptyComponent={
              <ThemedView>
                <ThemedText>
                  Dự án này hiện tại không còn căn hộ trống nào
                </ThemedText>
              </ThemedView>
            }
          />
        </View>
      </View>
    </ThemedScrollView>
  );
};

export default ProjectDetail;

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
  },
});
