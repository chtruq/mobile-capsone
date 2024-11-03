import { View, Text, TextInput } from "react-native";
import React, { FC } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { date } from "yup";

interface DeclareInputProps {
  title: string;
  value: any;
  editable: boolean;
  onChangeText?: (text: string) => void;
  isNumber?: boolean;
  isDate?: boolean;
  onBlur?: (e: any) => void;
  otherProps?: any;
}

const DeclareInput: FC<DeclareInputProps> = ({
  title,
  value,
  editable,
  isNumber,
  isDate,
  onBlur,
  onChangeText,
}) => {
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
        editable={editable}
        onChangeText={onChangeText}
        placeholder="Nhập thông tin"
        keyboardType={isNumber ? "numeric" : "default"}
        onBlur={onBlur}
      />
    </ThemedView>
  );
};

export default DeclareInput;
