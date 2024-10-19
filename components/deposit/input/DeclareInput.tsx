import { View, Text, TextInput } from "react-native";
import React, { FC } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

interface DeclareInputProps {
  title: string;
  value: string;
  editable: boolean;
}

const DeclareInput: FC<DeclareInputProps> = ({ title, value, editable }) => {
  return (
    <ThemedView
      style={{
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 5,
        marginVertical: 5,
      }}
    >
      <ThemedText
        type="defaultSemiBold"
        style={{
          marginBottom: 5,
        }}
      >
        {title}
      </ThemedText>
      <TextInput
        value={value}
        style={{}}
        editable={editable}
        placeholder="Nhập thông tin"
      />
    </ThemedView>
  );
};

export default DeclareInput;
