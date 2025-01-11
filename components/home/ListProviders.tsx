import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import { getListProjectProvider } from "@/services/api/projectProvider";
import { ApartmentProjectProvider } from "@/model/projectProvider";

export default function ListProviders({
  refreshData,
}: {
  refreshData: boolean;
}) {
  const [data, setData] = React.useState([]);

  const getProjectProvider = async () => {
    try {
      const res = await getListProjectProvider();

      setData(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjectProvider();
  }, []);

  useEffect(() => {
    if (refreshData) {
      getProjectProvider();
    }
  }, [refreshData]);

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {data.map((item: ApartmentProjectProvider) => (
        <TouchableOpacity
          style={{
            padding: 10,
            paddingHorizontal: 10,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
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
              padding: 10,
              borderWidth: 4,
              borderRadius: 100,
              borderColor: "#ccc",
              width: 100,
              height: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: item?.diagramUrl }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
              }}
              resizeMode="cover"
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
