import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";

export default function ListProviders() {
  const data = [
    {
      id: 1,
      providerName: "Vinhome",
      image: require("@/assets/images/providerLogo/vinhome-logo.png"),
    },
    {
      id: 2,
      providerName: "Hưng Thịnh",
      image: require("@/assets/images/providerLogo/vinhome-logo.png"),
    },
    {
      id: 3,
      providerName: "Novaland",
      image: require("@/assets/images/providerLogo/vinhome-logo.png"),
    },
    {
      id: 4,
      providerName: "Hà ĐÔ Group",
      image: require("@/assets/images/providerLogo/vinhome-logo.png"),
    },
  ];

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {data.map((item) => (
        <TouchableOpacity
          style={{
            padding: 10,
            paddingHorizontal: 10,
          }}
          key={item.id}
          onPress={() => {
            router.push({
              pathname: "/provider-detail/[id]",
              params: { id: item.id },
            });
          }}
        >
          <View
            style={{
              borderColor: "#ccc",
              borderWidth: 4,
              borderRadius: 100,
              padding: 10,
            }}
          >
            <Image
              source={item.image}
              style={{
                width: 60,
                height: 60,
              }}
            />
          </View>

          <Text
            style={{
              textAlign: "center",
            }}
          >
            {item.providerName}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
