import {
  View,
  Text,
  SafeAreaView,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React from "react";
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
import { router } from "expo-router";

export default function Home() {
  const colorScheme = useColorScheme();

  //make refreshData function
  const [refreshing, setRefreshing] = React.useState(false);

  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      router.canDismiss();
      setRefreshing(false);
    }, 1000);
  };

  return (
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
        <SafeAreaView>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <UserHeader />
              <Notify />
            </View>

            <ThemedViewSHKeyboard>
              <CircleBg />
              <SearchInput />
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
                <TouchableOpacity>
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
              <Project refreshData={refreshData} />

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
                <TouchableOpacity>
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
              <ListProviders />
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
                <TouchableOpacity>
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
              <ListProject />
            </ThemedViewSHKeyboard>

            <StatusBar
              backgroundColor={colorScheme === "dark" ? "#fff" : "#000"}
              style="auto"
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </ThemedView>
  );
}
