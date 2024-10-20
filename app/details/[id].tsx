import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
  TextInput,
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
import BottomSheet from "@/components/BottomSheet";
import { useSharedValue } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
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
    const index = Math.round(event.nativeEvent.contentOffset.x / 360);
    setCurrentIndex(index);
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const isOpen = useSharedValue(false);
  const toggleSheet = () => {
    isOpen.value = !isOpen.value;
  };

  const isOpenSuccessRequest = useSharedValue(false);
  const toggleSheetSuccessRequest = () => {
    isOpenSuccessRequest.value = !isOpenSuccessRequest.value;
  };

  const date = new Date();
  const dateOfTheWeek = date.getDay();
  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      days.push(nextDay);
    }
    return days;
  };
  const days = getNext7Days();
  const dateOfTheWeekStr = (date: Date) => {
    const daysOfWeek = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ];
    return daysOfWeek[date.getDay()];
  };

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const times = [
    "All",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

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
              handlePress={toggleSheet}
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

      <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet}>
        <ThemedText type="heading">Đặt lịch tư vấn và xem căn hộ</ThemedText>
        <View
          style={{
            borderBottomColor: "#000",
            borderBottomWidth: 1,
            width: "120%",
          }}
        ></View>
        <View
          style={{
            marginVertical: 10,
          }}
        >
          <ThemedText type="default">
            Quý khách muốn đặt lịch hẹn vào ngày nào?
          </ThemedText>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{}}
            >
              {
                // 7 ngày tiếp theo
                days.map((day, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        borderWidth: 1,
                        width: 100,
                        height: 100,
                        borderColor:
                          selectedDate?.getDate() === day.getDate()
                            ? Colors.light.money
                            : "#ccc",
                        borderRadius: 10,
                        marginHorizontal: 10,
                      }}
                      onPress={() => {
                        setSelectedDate(day);
                      }}
                    >
                      <View
                        style={{
                          borderTopEndRadius: 10,
                          borderTopStartRadius: 10,
                          backgroundColor:
                            selectedDate?.getDate() === day.getDate()
                              ? Colors.light.primary
                              : "#F5F5F5",
                          // width: 100,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ThemedText>{dateOfTheWeekStr(day)}</ThemedText>
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          height: 60,
                        }}
                      >
                        <ThemedText
                          type="defaultSemiBold"
                          style={{
                            fontSize: 20,
                          }}
                        >
                          {day.getDate()}/{day.getMonth() + 1}
                        </ThemedText>
                      </View>
                    </TouchableOpacity>
                  );
                })
              }
            </ScrollView>
          </View>

          <ThemedText type="default">
            Quý khách muốn đặt lịch hẹn vào khung giờ nào?
          </ThemedText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                marginTop: 5,
                // marginBottom: 10,
              }}
            >
              {times.map((time, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      borderWidth: 1,
                      width: 80,
                      height: 30,
                      borderColor:
                        selectedTime === time ? Colors.light.money : "#ccc",
                      borderRadius: 10,
                      marginHorizontal: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginVertical: 10,
                      backgroundColor:
                        selectedTime === time
                          ? Colors.light.primary
                          : "#F5F5F5",
                    }}
                    onPress={() => {
                      setSelectedTime(time);
                    }}
                  >
                    <ThemedText>{time === "All" ? "Tất cả " : time}</ThemedText>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <ThemedText type="defaultSemiBold">Thông tin liên hệ</ThemedText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#ccc",
              marginVertical: 10,
            }}
          >
            <TextInput
              style={{
                width: "100%",

                padding: 15,
              }}
              placeholder="Họ và tên"
              value=""
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#ccc",
            }}
          >
            <TextInput
              style={{
                width: "100%",
                padding: 15,
              }}
              placeholder="Số điện thoại"
              value=""
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            borderTopColor: "#000",
            borderTopWidth: 1,
            paddingVertical: 10,
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <Button
            title="Đặt lịch"
            width={"100%"}
            handlePress={() => {
              toggleSheet();
              toggleSheetSuccessRequest();
            }}
          />
        </View>
      </BottomSheet>

      <BottomSheet
        isOpen={isOpenSuccessRequest}
        toggleSheet={toggleSheetSuccessRequest}
      >
        <View
          style={{
            borderColor: "#53587A",
            width: 80,
            borderWidth: 1,
            height: 1,
            borderRadius: 10,
          }}
        ></View>

        <ThemedView
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            top: 100,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              backgroundColor: Colors.light.primary,
              width: 100,
              height: 100,
            }}
          >
            <Text
              style={{
                fontSize: 50,
                color: "white",
              }}
            >
              ✓
            </Text>
          </View>

          {/* <View
            style={{
              borderBottomColor: "#000",
              borderBottomWidth: 1,
              width: "120%",
            }}
          ></View> */}
          <View
            style={{
              marginVertical: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThemedText
              style={{
                marginHorizontal: 10,
                textAlign: "center",
                lineHeight: 30,
              }}
              type="subtitle"
            >
              Yêu cầu lịch hẹn của bạn đã được gửi
            </ThemedText>
            <ThemedText
              style={{
                marginHorizontal: 10,
                textAlign: "center",
                lineHeight: 30,
                marginTop: 10,
              }}
              type="default"
            >
              Sẽ có nhân viên liên hệ bạn để tiến hành chuyến đi xem căn hộ.
            </ThemedText>
          </View>
          {/* <View
            style={{
              marginVertical: 10,
              borderTopColor: "#000",
              borderTopWidth: 1,
              paddingVertical: 10,
              position: "absolute",
              bottom: 0,
              width: "100%",
            }}
          >
            <Button
              title="Đóng"
              width={"100%"}
              handlePress={toggleSheetSuccessRequest}
            />
          </View> */}
        </ThemedView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            borderTopColor: "#000",
            borderTopWidth: 1,
            paddingVertical: 10,
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <Button
            title="Đóng"
            width={"100%"}
            handlePress={toggleSheetSuccessRequest}
          />
        </View>
      </BottomSheet>

      <StatusBar style="auto" />
    </ThemedScrollView>
  );
}
