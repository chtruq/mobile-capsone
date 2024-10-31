import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { FC } from "react";
import { ThemedText } from "@/components/ThemedText";

const roomRages = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6", value: 6 },
];

interface RoomRagesProps {
  onPress: (value: number) => void;
  selectedRoom: number;
}

const RoomRanges: FC<RoomRagesProps> = ({ onPress, selectedRoom }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      {roomRages.map((roomRange, index) => (
        <TouchableOpacity
          onPress={() => onPress(roomRange.value)}
          style={[
            styles.range,
            selectedRoom === roomRange.value
              ? styles.selectedPriceRange // Thay đổi màu cho khoảng giá đã chọn
              : null,
          ]}
          key={index}
        >
          <ThemedText
            style={
              selectedRoom === roomRange.value
                ? { color: "#fff" } // Thay đổi màu chữ cho khoảng giá đã chọn
                : { color: "#000" }
            }
            type="default"
          >
            {roomRange.label}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  range: {
    padding: 10,
    width: 40,
    // backgroundColor: "#f5f5f5",
    borderWidth: 1,
    margin: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#ccc",
    borderRadius: 10,
    height: 50,
  },
  selectedPriceRange: {
    backgroundColor: "#000",
  },
});

export default RoomRanges;
