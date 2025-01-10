import { View, Text, TextInput, useColorScheme } from "react-native";
import React, { FC, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

interface SearchInputProps {
  search: string;
  onChangeSearch: (search: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ search, onChangeSearch }) => {
  const [value, setValue] = React.useState("");

  const onSubmitEditing = () => {
    onChangeSearch(value);
    router.push({
      pathname: "/(main)/(tabs)/(search)",
      params: {
        homeSearch: value,
      },
    });
  };

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
        placeholder="Tìm kiếm căn hộ mà bạn mong muốn"
        style={{
          borderRadius: 10,
          padding: 10,
          margin: 10,
          fontSize: 16,
        }}
        value={value}
        onChangeText={setValue}
        onSubmitEditing={() => {
          onSubmitEditing();
        }}
      />
    </View>
  );
};

export default SearchInput;
