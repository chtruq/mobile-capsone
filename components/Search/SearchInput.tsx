import { View, Text, TextInput, useColorScheme } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
const SearchInput = () => {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#F2F2F2",
        padding: 10,
        borderRadius: 20,
      }}
    >
      <View
        style={{
          borderRadius: 10,
        }}
      >
        <AntDesign name="search1" size={24} color="black" />
      </View>

      <TextInput
        placeholder="Tìm kiếm dự án, căn hộ mà bạn mong muốn"
        style={{
          borderRadius: 10,
          padding: 10,
          margin: 10,
          fontSize: 16,
        }}
        value=""
        onChangeText={() => {}}
      />
    </View>
  );
};

export default SearchInput;
