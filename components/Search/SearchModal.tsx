import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { FC } from "react";
import BuyIcon from "@/assets/icon/search/BuyIcon";

interface SearchModalProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  isOpen: any;
  toggleSheet: any;
}

const SearchModal: FC<SearchModalProps> = ({
  value,
  onChangeText,
  placeholder,
  isOpen,
  toggleSheet,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        borderWidth: 0.1,
        marginHorizontal: 20,
        borderRadius: 50,
        backgroundColor: "#EECE80",
      }}
    >
      <TouchableOpacity
        style={{
          width: "20%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={toggleSheet}
      >
        <BuyIcon width="40" height="40" />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          width: "80%",
          justifyContent: "center",
          padding: 10,
          backgroundColor: "#f5f4f8",
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
        }}
      >
        <TextInput
          placeholder={placeholder}
          style={{
            height: 40,
            marginLeft: 10,
            padding: 20,
            fontSize: 16,
            color: "#000",
          }}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

export default SearchModal;
