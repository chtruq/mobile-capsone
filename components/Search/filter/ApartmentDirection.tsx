import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { FC } from "react";
import Checkbox from "expo-checkbox";

const apartmentDirection = [
  { label: "Đông", value: 1 },
  { label: "Tây", value: 2 },
  { label: "Nam", value: 3 },
  { label: "Bắc", value: 4 },
  { label: "Đông Bắc", value: 5 },
  { label: "Tây Bắc", value: 6 },
  { label: "Đông Nam", value: 7 },
  { label: "Tây Nam", value: 8 },
];

interface ApartmentDirectionProps {
  selectedDirections: number[];
  onPress: (value: number) => void;
}

const ApartmentDirection: FC<ApartmentDirectionProps> = ({
  selectedDirections,
  onPress,
}) => {
  return (
    <View>
      {apartmentDirection.map((direction, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPress(direction.value)}
          style={styles.item}
        >
          <Text key={index}>{direction.label}</Text>
          <Checkbox
            value={selectedDirections.includes(direction.value)}
            onValueChange={() => {
              () => onPress(direction.value);
            }}
            color={
              selectedDirections.includes(direction.value) ? "#000" : undefined
            }
          />
        </TouchableOpacity>
      ))}

      {/* <Text>ApartmentDirection</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  checkbox: {
    width: 20,
    height: 20,
  },
});

export default ApartmentDirection;
