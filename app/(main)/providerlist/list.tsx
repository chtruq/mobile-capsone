import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { ThemedView } from "@/components/ThemedView";
import { getProjectProviders } from "@/services/api/projectProvider";
import { ApartmentProjectProvider } from "@/model/projectProvider";
import { router } from "expo-router";

const ProviderList = () => {
  const [data, setData] = React.useState<ApartmentProjectProvider[]>();
  const [search, setSearch] = React.useState("");
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth / 2 - 15; // 15 for padding/margin

  const fetchProviderList = async (search?: string) => {
    try {
      const response = await getProjectProviders(search);
      setData(response?.data?.providers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProviderList();
  }, []);

  useEffect(() => {
    console.log(search);
    fetchProviderList(search);
  }, [search]);

  const renderItem = ({ item }: { item: ApartmentProjectProvider }) => (
    <TouchableOpacity
      style={{
        width: itemWidth,
        padding: 10,
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
          marginTop: 8,
        }}
      >
        {item.apartmentProjectProviderName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <TextInput
        placeholder="Tìm kiếm nhà cung cấp"
        style={{
          padding: 20,
          margin: 10,
          borderRadius: 10,
          backgroundColor: "#f0f0f0",
          fontSize: 16,
        }}
        value={search}
        onChangeText={(text) => setSearch(text)}
        onSubmitEditing={(e) => setSearch(e.nativeEvent.text)}
        clearButtonMode="always"
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.apartmentProjectProviderID}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      />
    </ThemedView>
  );
};

export default ProviderList;
