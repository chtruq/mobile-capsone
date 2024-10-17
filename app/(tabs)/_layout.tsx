import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import HomeActiveSVG from "@/assets/icon/menu/home-active-svg";
import HomeInactiveSVG from "@/assets/icon/menu/home-inactive-svg";
import SearchActiveSVG from "@/assets/icon/menu/search-active-svg";
import NotifyInactiveSVG from "@/assets/icon/menu/notify-inactive-svg";
import ProfileInactiveSVG from "@/assets/icon/menu/profile-inactive-svg";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="(home)"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color, focused }) =>
            // <TabBarIcon
            //   name={focused ? "home" : "home-outline"}
            //   color={color}
            // />
            focused ? <HomeActiveSVG /> : <HomeInactiveSVG />,
        }}
      />
      <Tabs.Screen
        name="(search)"
        options={{
          title: "Tìm kiếm",
          tabBarIcon: ({ color, focused }) =>
            focused ? <SearchActiveSVG /> : <SearchActiveSVG />,
        }}
      />

      <Tabs.Screen
        name="(notify)"
        options={{
          title: "Thông báo",
          tabBarIcon: ({ color, focused }) =>
            focused ? <NotifyInactiveSVG /> : <NotifyInactiveSVG />,
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Cá nhân",
          tabBarIcon: ({ color, focused }) =>
            focused ? <ProfileInactiveSVG /> : <ProfileInactiveSVG />,
        }}
      />
    </Tabs>
  );
}
