import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { FC } from "react";
import { ThemedText } from "@/components/ThemedText";

const priceRanges = [
  { label: "Dưới 3 tỷ", min: 0, max: 3000000000 },
  { label: "3 - 5 tỷ", min: 3000000000, max: 5000000000 },
  { label: "5 - 7 tỷ", min: 5000000000, max: 7000000000 },
  { label: "7 - 10 tỷ", min: 7000000000, max: 10000000000 },
  { label: "10 - 15 tỷ", min: 10000000000, max: 15000000000 },
  { label: "15 - 20 tỷ", min: 15000000000, max: 20000000000 },
  { label: "Trên 20 tỷ", min: 20000000000, max: Infinity },
];

interface PriceRangesProps {
  onPress: (min: number, max: number) => void;
  selectedMin: number;
  selectedMax: number;
}

const PriceRanges: FC<PriceRangesProps> = ({
  onPress,
  selectedMin,
  selectedMax,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        // backgroundColor: "#ccc",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      {priceRanges.map((priceRange, index) => (
        <TouchableOpacity
          onPress={() => onPress(priceRange.min, priceRange.max)}
          style={[
            styles.priceRange,
            selectedMin === priceRange.min && selectedMax === priceRange.max
              ? styles.selectedPriceRange // Thay đổi màu cho khoảng giá đã chọn
              : null,
          ]}
          key={index}
        >
          <ThemedText
            style={
              selectedMin === priceRange.min && selectedMax === priceRange.max
                ? { color: "#fff" } // Thay đổi màu chữ cho khoảng giá đã chọn
                : { color: "#000" }
            }
            type="default"
          >
            {priceRange.label}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  priceRange: {
    padding: 10,
    width: "48%",
    // backgroundColor: "#f5f5f5",
    borderWidth: 1,
    margin: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "#ccc",
  },
  selectedPriceRange: {
    backgroundColor: "#000",
  },
});

export default PriceRanges;
