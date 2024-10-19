import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StatusBar } from "expo-status-bar";
import FavIcon from "@/components/favoriteIcon/FavIcon";
import { MaterialIcons } from "@expo/vector-icons";
import View360 from "@/assets/icon/360";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import PriceIcon from "@/assets/icon/details/price";
import AreaIcon from "@/assets/icon/details/area";
import ApartmentDetails from "@/components/details/ApartmentDetails";
import BedIcon from "@/assets/icon/details/bedroom";
import BathRoomIcon from "@/assets/icon/details/bathroom";
import HouseDirectionIcon from "@/assets/icon/details/direction";
import BalconyDirectionIcon from "@/assets/icon/details/balcony";
import ThemedButton from "@/components/ThemedButton";
import Button from "@/components/button/Button";

export default function ProductTetails() {
  const data = {
    name: "Căn hộ view sông Sài Gòn, view grand park 81 hướng ban công tây nam đầy đủ nội thất  2 phòng ngủ 2 phòng tắm",
    price: "22,3",
    description:
      "Căn hộ cao cấp 2 phòng ngủ tại chung cư Sunrise City, Quận 7, TP. HCM, với diện tích 80m². Nằm trên tầng 20, căn hộ mang đến tầm nhìn toàn cảnh sông Sài Gòn tuyệt đẹp. Thiết kế hiện đại với không gian mở, sàn gỗ tự nhiên, và hệ thống cửa kính lớn giúp đón ánh sáng tự nhiên. Phòng khách rộng rãi, liên thông với khu vực bếp được trang bị đầy đủ nội thất cao cấp như bếp từ, máy hút mùi và tủ lạnh âm tường.Phòng ngủ chính có giường đôi, tủ âm tường và phòng tắm riêng với thiết bị vệ sinh cao cấp. Phòng ngủ phụ cũng có cửa sổ lớn, thích hợp làm phòng làm việc hoặc phòng cho trẻ em. Ban công rộng rãi, đủ chỗ để trồng cây hoặc đặt bàn uống cà phê buổi sáng.Cư dân tại đây sẽ được tận hưởng nhiều tiện ích đẳng cấp như hồ bơi tràn bờ, phòng gym hiện đại, khu vực BBQ, sân chơi trẻ em và bãi đậu xe rộng rãi. An ninh đảm bảo 24/7 với hệ thống bảo vệ và camera giám sát.Giá bán căn hộ là 4.2 tỷ VND, hoặc cho thuê với giá 15 triệu VND/tháng, đã bao gồm phí quản lý. Đây là lựa chọn lý tưởng cho những ai đang tìm kiếm không gian sống sang trọng và tiện nghi tại khu vực phát triển của thành phố.",
    area: "80",
    bedrooms: "2",
    bathrooms: "2",
    address: "Quận 7, TP. HCM",
    huongnha: "Tây Nam",
    huongbancong: "Tây Nam",
  };

  const imageArr = [
    require("@/assets/images/home/home.png"),
    require("@/assets/images/home/home.png"),
    require("@/assets/images/home/home.png"),
  ];

  const { id } = useLocalSearchParams();

  useEffect(() => {
    console.log(id);
  }, []);

  const colorScheme = useColorScheme();

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / 360); // 360 là snapToInterval
    setCurrentIndex(index);
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

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
          data={imageArr}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={360} // Chiều rộng của mỗi item + padding
          snapToAlignment="center"
          decelerationRate="fast"
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Pressable>
              <Image
                source={item}
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
            {currentIndex + 1}/{imageArr.length}
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
          {data.name}
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
            {data.address}
          </ThemedText>
        </View>

        {/* price/ Area */}
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
              gap: 20,
            }}
          >
            <View>
              <ThemedText>Mức giá:</ThemedText>
              <ThemedText type="price">{data.price} tỷ</ThemedText>
            </View>
            <View>
              <ThemedText>Diện tích:</ThemedText>
              <ThemedText type="defaultSemiBold">{data.area} m2</ThemedText>
            </View>
          </View>
          <View
            style={{
              borderRadius: 100,
              backgroundColor: "#F4F4F4",
              width: 60,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View360 height={40} width={40} />
          </View>
        </View>

        <View style={{ marginVertical: 10 }}>
          <ThemedText type="heading">Mô tả</ThemedText>
          <ThemedText numberOfLines={showFullDescription ? undefined : 6}>
            {data.description}
          </ThemedText>
          <Pressable
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 5,
            }}
            onPress={toggleDescription}
          >
            <ThemedText type="red">
              {showFullDescription ? "Thu gọn" : "Xem thêm"}
            </ThemedText>
          </Pressable>
        </View>

        <View
          style={{
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ThemedText type="heading">Đặc điểm bất động sản</ThemedText>
          </View>
          <View>
            <ApartmentDetails
              data={data.price}
              Icon={<PriceIcon width={20} height={20} />}
              title="Mức giá"
            />
            <ApartmentDetails
              data={data.area}
              Icon={<AreaIcon width={20} height={20} />}
              title="Diện tích"
            />
            <ApartmentDetails
              data={data.bedrooms}
              Icon={<BedIcon width={20} height={20} />}
              title="Số phòng ngủ"
            />
            <ApartmentDetails
              data={data.bathrooms}
              Icon={<BathRoomIcon width={20} height={20} />}
              title="Số phòng tắm"
            />
            <ApartmentDetails
              data={data.huongnha}
              Icon={<HouseDirectionIcon width={20} height={20} />}
              title="Hướng nhà"
            />
            <ApartmentDetails
              data={data.huongbancong}
              Icon={<BalconyDirectionIcon width={20} height={20} />}
              title="Hướng ban công"
            />
          </View>
        </View>
        <View>
          <ThemedText type="heading">Thông tin dự án</ThemedText>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            borderTopColor: "#000",
            borderTopWidth: 1,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              width: "50%",
            }}
          >
            <Button
              title="Đặt lịch xem"
              width={"90%"}
              backgroundColor="#F5F4F8"
              textColor="#252B5C"
            />
          </View>
          <View
            style={{
              width: "50%",
            }}
          >
            <Button title="Đặt cọc" width={"90%"} link={"/deposit"} />
          </View>
        </View>
      </View>

      <StatusBar style="auto" />
    </ThemedScrollView>
  );
}
