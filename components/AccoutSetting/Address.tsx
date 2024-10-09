import { View, Text } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

interface AddressPickerProps {
  title: string;
  icon?: React.ReactElement;
}

const AddressPicker = ({ title, icon }: AddressPickerProps) => {
  return (
    <ThemedView
      style={{
        width: "100%",
        height: 80,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 20,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText>{title}</ThemedText>
    </ThemedView>
  );
};

export default AddressPicker;
