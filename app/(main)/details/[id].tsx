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
  RefreshControl,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StatusBar } from "expo-status-bar";
import FavIcon from "@/components/favoriteIcon/FavIcon";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
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
import { apartmentsDetail } from "@/services/api/apartments";
import { Apartment } from "@/model/apartments";
import { formatArea, formatCurrency } from "@/model/other";
import { useAuth } from "@/context/AuthContext";
import { createAppointment } from "@/services/api/appointment";
import ProjectCard from "@/components/Search/Project/ProjectCard";
import { getProjectDetail } from "@/services/api/project";
import { ProjectApartment } from "@/model/projects";

export default function ProductDetails() {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
  const [data, setData] = useState<Apartment>();
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [note, setNote] = useState("");
  const colorScheme = useColorScheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const [projectData, setProjectData] = useState<ProjectApartment>();

  // Thêm function để handle focus
  const handleFocus = () => {
    scrollViewRef.current?.scrollTo({ y: 200, animated: true });
  };
  const { id } = useLocalSearchParams();
  const { userInfo } = useAuth();
  const getApartment = async () => {
    try {
      const response = await apartmentsDetail(id, userInfo?.id);
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.error("Get apartment API error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getApartment();
      setData(data);
    };
    fetchData();
  }, [id]);

  const getProject = async () => {
    if (!data?.projectApartmentID) {
      return;
    }

    try {
      const response = await getProjectDetail(data?.projectApartmentID || "");
      setProjectData(response.data);
      return response.data;
    } catch (error) {
      console.error("Get project API error:", error);
      throw error;
    }
  };

  useEffect(() => {
    getProject();
  }, [data]);

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
    { value: "all", label: "Tất cả" },
    { value: "08:00:00", label: "8:00" },
    { value: "09:00:00", label: "9:00" },
    { value: "10:00:00", label: "10:00" },
    { value: "11:00:00", label: "11:00" },
    { value: "12:00:00", label: "12:00" },
    { value: "13:00:00", label: "13:00" },
    { value: "14:00:00", label: "14:00" },
    { value: "15:00:00", label: "15:00" },
    { value: "16:00:00", label: "16:00" },
    { value: "17:00:00", label: "17:00" },
  ];

  const [refreshing, setRefreshing] = useState(false);

  //refresh
  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const validation = () => {
    if (!selectedDate || !selectedTime || !userName || !phoneNumber) {
      Alert.alert("Vui lòng điền đẩy đủ thông tin");
      return false;
    }
    if (phoneNumber.length < 10) {
      Alert.alert("Tên và số điện thoại không hợp lệ");
      return false;
    }
    if (phoneNumber.length > 11) {
      Alert.alert("Số điện thoại không hợp lệ");
      return false;
    }
    if (selectedDate < new Date()) {
      Alert.alert("Ngày không hợp lệ");
      return false;
    }

    if (!selectedTime) {
      Alert.alert("Vui lòng chọn thời gian");
      return false;
    }

    return true;
  };

  const handleCreateAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      return;
    }
    const preferredDate = new Date(selectedDate);
    const preferredTime = selectedTime;

    console.log("preferredTime", preferredTime);
    console.log("preferredDate", preferredDate);
    console.log("id", id);
    console.log("userName", userName);
    console.log("phoneNumber", phoneNumber);
    try {
      if (!validation()) {
        return;
      }
      const response = await createAppointment(
        id as string,
        userInfo?.id,
        preferredDate,
        preferredTime,
        userName,
        phoneNumber,
        note
      );
      console.log("response", response);
      toggleSheet();
      toggleSheetSuccessRequest();
      return response.data;
    } catch (error) {
      console.error("Create appointment API error:", error);
      Alert.alert("Lỗi khi đặt lịch xem");

      throw error;
    }
  };

  return (
    <>
      <ThemedScrollView
        style={{
          flex: 1,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
        }
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
            data={
              data?.images.map((image) => {
                return { uri: image?.imageUrl };
              }) || []
            }
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
              style={{
                textAlign: "center",
                marginVertical: 10,
                color: "white",
              }}
            >
              {currentIndex + 1}/{data?.images?.length}
            </Text>
          </View>
        </View>
        <FavIcon
          isFav={data?.userLiked ?? false}
          style={{
            position: "absolute",
            top: 40,
            right: 20,
            zIndex: 1,
          }}
          ApartmentId={data?.apartmentID}
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
            {data?.apartmentName}
          </ThemedText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="location-on" size={16} color="#53587A" />
            <TouchableOpacity>
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
            </TouchableOpacity>
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
                <ThemedText type="price">
                  {formatCurrency(data?.price) || "Liên hệ"}
                </ThemedText>
              </View>
              <View>
                <ThemedText>Diện tích:</ThemedText>
                <ThemedText type="defaultSemiBold">
                  {formatArea(data?.area)}
                </ThemedText>
              </View>
            </View>
            {Array.isArray(data?.vrVideoUrls) &&
            data?.vrVideoUrls.length > 0 ? (
              <TouchableOpacity
                style={{
                  borderRadius: 100,
                  backgroundColor: "#F4F4F4",
                  width: 60,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  router.push({
                    pathname: "/(main)/vr/vrview",
                    params: {
                      id: data?.apartmentID,
                    },
                  });
                }}
              >
                {/* <Link href="/(main)/vr/vrview"> */}
                <View360 height={40} width={40} />
                {/* </Link> */}
              </TouchableOpacity>
            ) : (
              <View>
                <ThemedText type="default">Không có ảnh 360</ThemedText>
              </View>
            )}
          </View>

          <View style={{ marginVertical: 10 }}>
            <ThemedText type="heading">Mô tả</ThemedText>
            <ThemedText numberOfLines={showFullDescription ? undefined : 6}>
              {data?.description}
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
                data={formatCurrency(data?.price) || "Liên hệ"}
                Icon={<PriceIcon width={20} height={20} />}
                title="Mức giá"
              />
              <ApartmentDetails
                data={formatArea(data?.area)}
                Icon={<AreaIcon width={20} height={20} />}
                title="Diện tích"
              />
              <ApartmentDetails
                data={data?.numberOfRooms}
                Icon={<BedIcon width={20} height={20} />}
                title="Số phòng ngủ"
              />
              <ApartmentDetails
                data={data?.numberOfBathrooms}
                Icon={<BathRoomIcon width={20} height={20} />}
                title="Số phòng tắm"
              />
              <ApartmentDetails
                data={data?.balconyDirection}
                Icon={<HouseDirectionIcon width={20} height={20} />}
                title="Hướng nhà"
              />
              <ApartmentDetails
                data={data?.balconyDirection}
                Icon={<BalconyDirectionIcon width={20} height={20} />}
                title="Hướng ban công"
              />
            </View>
          </View>
          <View>
            <ThemedText type="heading">Thông tin dự án</ThemedText>
            <View
              style={{
                borderBottomColor: "#000",
                borderBottomWidth: 1,
                width: "120%",
              }}
            >
              {projectData ? (
                <View
                  style={{
                    padding: 10,
                    width: "80%",
                  }}
                >
                  <ProjectCard data={projectData} />
                </View>
              ) : null}
            </View>
          </View>
        </View>

        <StatusBar style="auto" />
      </ThemedScrollView>
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          borderTopColor: "#000",
          borderTopWidth: 1,
          paddingVertical: 10,
          width: "100%",
          paddingHorizontal: 10,
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 20,
            height: 70,
          }}
          onPress={() => {
            router.push({
              pathname: "/(main)/chat",
              params: {
                id: id,
              },
            });
          }}
        >
          <MaterialCommunityIcons
            name="message-text-outline"
            size={24}
            color="black"
          />
        </Pressable>
        <View
          style={{
            width: "40%",
            justifyContent: "center",
            alignItems: "center",
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
            width: "40%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            title="Đặt cọc giữ chỗ"
            width={"90%"}
            handlePress={() => {
              router.push({
                pathname: "/(main)/deposit",
                params: { id: id },
              });
            }}
            link={"/deposit"}
          />
        </View>
      </ThemedView>
      <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet}>
        <View style={{ flex: 1, maxHeight: "100%" }}>
          {/* Thêm container có maxHeight */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
          >
            <ScrollView
              ref={scrollViewRef}
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingBottom: 150 }}
            >
              <ThemedText type="heading">
                Đặt lịch tư vấn và xem căn hộ
              </ThemedText>
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
                          key={time.value}
                          style={{
                            borderWidth: 1,
                            width: 80,
                            height: 30,
                            borderColor:
                              selectedTime === time.value
                                ? Colors.light.money
                                : "#ccc",
                            borderRadius: 10,
                            marginHorizontal: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            marginVertical: 10,
                            backgroundColor:
                              selectedTime === time.value
                                ? Colors.light.primary
                                : "#F5F5F5",
                          }}
                          onPress={() => {
                            setSelectedTime(time.value);
                          }}
                        >
                          <ThemedText>{time.label}</ThemedText>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
                <ThemedText type="defaultSemiBold">
                  Thông tin liên hệ
                </ThemedText>
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
                    value={userName}
                    onChangeText={setUserName}
                    onFocus={handleFocus}
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
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="number-pad"
                    onFocus={handleFocus}
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
                    marginVertical: 10,
                  }}
                >
                  <TextInput
                    style={{
                      width: "100%",
                      padding: 15,
                    }}
                    placeholder="Ghi chú"
                    value={note}
                    onChangeText={setNote}
                    onFocus={handleFocus}
                  />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
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
              handleCreateAppointment();
              // toggleSheet();

              // toggleSheetSuccessRequest();
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
    </>
  );
}
