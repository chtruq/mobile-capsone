import { View, Text, TextInput } from "react-native";
import React, { FC } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

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
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = String(date.getFullYear()).slice(); // Get last two digits of the year
  return `${day}/${month}/${year}`;
};

const DeclareInput: FC<DeclareInputProps> = ({
  title,
  value,
  editable,
  isNumber,
  isDate,
  onBlur,
  onChangeText,
}) => {
  const displayValue = isDate ? formatDate(value) : value;

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
        value={displayValue}
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
