import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import { getListProjectProvider } from "@/services/api/projectProvider";
import { ApartmentProjectProvider } from "@/model/projectProvider";

export default function ListProviders() {
  const [data, setData] = React.useState([]);

  // const data = [
  //   {
  //     id: 1,
  //     providerName: "Vinhome",
  //     image: require("@/assets/images/providerLogo/vinhome-logo.png"),
  //   },
  //   {
  //     id: 2,
  //     providerName: "Hưng Thịnh",
  //     image: require("@/assets/images/providerLogo/vinhome-logo.png"),
  //   },
  //   {
  //     id: 3,
  //     providerName: "Novaland",
  //     image: require("@/assets/images/providerLogo/vinhome-logo.png"),
  //   },
  //   {
  //     id: 4,
  //     providerName: "Hà ĐÔ Group",
  //     image: require("@/assets/images/providerLogo/vinhome-logo.png"),
  //   },
  // ];

  const getProjectProvider = async () => {
    // call api get project provider
    try {
      const res = await getListProjectProvider();
      setData(res.data);
      console.log("abc", res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjectProvider();
  }, []);

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {data.map((item: ApartmentProjectProvider) => (
        <TouchableOpacity
          style={{
            padding: 10,
            paddingHorizontal: 10,
          }}
          key={item.apartmentProjectProviderID}
          onPress={() => {
            router.push({
              pathname: "/(main)/provider-detail/[id]",
              params: { id: item.apartmentProjectProviderID },
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
              // source={item.image}
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
            {item.apartmentProjectProviderName}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
