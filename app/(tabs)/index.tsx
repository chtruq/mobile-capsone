import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme,
  ScrollView,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import ThemedViewSHKeyboard from "@/components/ThemedViewSHKeyboard";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import CircleBg from "@/components/CircleBg/CircleBg";
import UserHeader from "@/components/home/UserHeader";
import Notify from "@/components/notify/Notify";
import SearchInput from "@/components/Search/SearchInput";
import Project from "@/components/home/project/Project";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import ListProviders from "@/components/home/ListProviders";
import ListProject from "@/components/home/ListProject";

export default function home() {
  const colorScheme = useColorScheme();

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedScrollView
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor:
                colorScheme === "dark"
                  ? Colors.dark.background
                  : Colors.light.background,
              marginHorizontal: 10,
            }}
          >
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
                  Dự án nổi bật
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
              <Project />

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
                  Mua bán
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
        </ThemedScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
