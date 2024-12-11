import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import FavIcon from "@/components/favoriteIcon/FavIcon";
import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import { getProjectDetail } from "@/services/api/project";
import { ProjectApartment } from "@/model/projects";
import { getProjectCart } from "@/services/api/apartments";
import ApartmentCard from "@/components/Search/Apartment/ApartmentCard";
import { Apartment } from "@/model/apartments";

const ProjectDetail = () => {
  const { id } = useLocalSearchParams();
  console.log(id);
  const [data, setData] = useState<ProjectApartment>();
  const [cartList, setCartList] = useState<Apartment[]>();
  //   const data = {
  //     name: "The Opus One",
  //     investor: "Vingroup",
  //     quantity: 166,
  //     area: "3920",
  //     buildNumber: "20",
  //     address: "Tăng Nhơn Phú, Quận 9, TP Hồ Chí Minh",
  //     description:
  //       "Căn hộ cao cấp 2 phòng ngủ tại chung cư Sunrise City, Quận 7, TP. HCM, với diện tích 80m². Nằm trên tầng 20, căn hộ mang đến tầm nhìn toàn cảnh sông Sài Gòn tuyệt đẹp. Thiết kế hiện đại với không gian mở, sàn gỗ tự nhiên, và hệ thống cửa kính lớn giúp đón ánh sáng tự nhiên. Phòng khách rộng rãi, liên thông với khu vực bếp được trang bị đầy đủ nội thất cao cấp như bếp từ, máy hút mùi và tủ lạnh âm tường.Phòng ngủ chính có giường đôi, tủ âm tường và phòng tắm riêng với thiết bị vệ sinh cao cấp. Phòng ngủ phụ cũng có cửa sổ lớn, thích hợp làm phòng làm việc hoặc phòng cho trẻ em. Ban công rộng rãi, đủ chỗ để trồng cây hoặc đặt bàn uống cà phê buổi sáng.Cư dân tại đây sẽ được tận hưởng nhiều tiện ích đẳng cấp như hồ bơi tràn bờ, phòng gym hiện đại, khu vực BBQ, sân chơi trẻ em và bãi đậu xe rộng rãi. An ninh đảm bảo 24/7 với hệ thống bảo vệ và camera giám sát.Giá bán căn hộ là 4.2 tỷ VND, hoặc cho thuê với giá 15 triệu VND/tháng, đã bao gồm phí quản lý. Đây là lựa chọn lý tưởng cho những ai đang tìm kiếm không gian sống sang trọng và tiện nghi tại khu vực phát triển của thành phố.",
  //     amenities: `Bãi đậu xe.
  //   Sân chơi trẻ em.
  //   Thang máy.
  //   Trung tâm thương mại.
  //   Bảo vệ 24/7.
  //   Công viên.
  //   Phòng sinh hoạt cộng đồng.
  //   Ban công.
  //   Bệnh viện.
  //   Trường học…`,
  //   };

  //   const imageArr = [
  //     require("@/assets/images/home/home.png"),
  //     require("@/assets/images/home/home.png"),
  //     require("@/assets/images/home/home.png"),
  //   ];
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
      const res = await getProjectCart(id);
      res.data && setCartList(res.data.apartments);
      console.log("cartList", res.data);
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
      <FavIcon
        isFav
        style={{
          position: "absolute",
          top: 40,
          right: 20,
          zIndex: 1,
        }}
      />
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
            <ThemedText type="heading">{data?.projectArea} m2</ThemedText>
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
            <ThemedText type="red">Xem tất cả</ThemedText>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              backgroundColor: "#fff",
            }}
          >
            {cartList?.map((item: Apartment) => (
              <View style={{ padding: 5, width: 300 }} key={item.apartmentID}>
                <ApartmentCard data={item} key={item.apartmentID} />
              </View>
            ))}
          </ScrollView>
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
