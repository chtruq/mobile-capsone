import {
  View,
  Text,
  SafeAreaView,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { Colors } from "@/constants/Colors";
import UserHeader from "@/components/home/UserHeader";
import Notify from "@/components/notify/Notify";
import ThemedViewSHKeyboard from "@/components/ThemedViewSHKeyboard";
import CircleBg from "@/components/CircleBg/CircleBg";
import SearchInput from "@/components/Search/SearchInput";
import { ThemedText } from "@/components/ThemedText";
import Project from "@/components/home/project/Project";
import ListProviders from "@/components/home/ListProviders";
import { StatusBar } from "expo-status-bar";
import ListProject from "@/components/home/ListProject";
import { ThemedView } from "@/components/ThemedView";
import { router, useFocusEffect } from "expo-router";
import { getUserNotifications } from "@/services/api/notification";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const colorScheme = useColorScheme();

  //make refreshData function
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const { userInfo } = useAuth();
  const [noti, setNoti] = React.useState([]);
  const [notiCount, setNotiCount] = React.useState(0);

  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const fetchNotification = async () => {
    if (!userInfo) return;
    try {
      const res = await getUserNotifications(userInfo?.id);
      setNoti(res?.data?.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, [userInfo]);

  useEffect(() => {
    setNotiCount(noti.filter((item: Notifications) => !item.isRead).length);
    console.log("notiCount", notiCount);
  }, [noti]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: Platform.OS === "android" ? 25 : 0,
      }}
    >
      <ThemedView
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
          }
          style={{
            flex: 1,
            paddingBottom: 10,
            paddingTop: 10,
            paddingHorizontal: 10,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <UserHeader />
              <TouchableOpacity
                onPress={() => {
                  router.push("/(main)/(tabs)/(notify)/noti");
                }}
              >
                <Notify notiCount={notiCount} />
              </TouchableOpacity>
            </View>

            <ThemedViewSHKeyboard>
              <CircleBg />
              <SearchInput search={search} onChangeSearch={setSearch} />
              {/* Home content */}
              {/* Du an noi bat */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ThemedText
                  type="title"
                  style={{
                    fontSize: 24,
                    fontWeight: "semibold",
                    marginBottom: 10,
                  }}
                >
                  Căn hộ mới nhất
                </ThemedText>
                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: "/(main)/(tabs)/(search)",
                      params: {
                        homeSearchType: "Căn hộ",
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
              </View>
              <Project refreshData={refreshing} />

              {/* Provider noi bat */}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ThemedText
                  type="title"
                  style={{
                    fontSize: 24,
                    fontWeight: "semibold",
                    marginBottom: 10,
                  }}
                >
                  Nhà cung cấp nổi bật
                </ThemedText>
                <TouchableOpacity
                  onPress={() => {
                    router.push("/(main)/providerlist/list");
                  }}
                >
                  <ThemedText
                    type="default"
                    style={{
                      fontSize: 16,
                    }}
                  >
                    Xem thêm
                  </ThemedText>
                </TouchableOpacity>
              </View>
              <ListProviders refreshData={refreshing} />
              {/* Apartment */}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ThemedText
                  type="title"
                  style={{
                    fontSize: 24,
                    fontWeight: "semibold",
                    marginBottom: 10,
                  }}
                >
                  Danh sách dự án
                </ThemedText>
                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: "/(main)/(tabs)/(search)",
                      params: {
                        homeSearchType: "Dự án",
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
                    Xem thêm
                  </ThemedText>
                </TouchableOpacity>
              </View>
              <ListProject refreshData={refreshing} />
            </ThemedViewSHKeyboard>

            <StatusBar
              backgroundColor={colorScheme === "dark" ? "#fff" : "#000"}
              style="auto"
            />
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}
