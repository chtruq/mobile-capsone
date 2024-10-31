import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { FC } from "react";
import { ThemedText } from "@/components/ThemedText";

const areaRanges = [
  { label: "Dưới 50,00m²", min: 0, max: 50 },
  { label: "50,00 - 100,00m²", min: 50, max: 100 },
  { label: "100,00 - 150,00m²", min: 100, max: 150 },
  { label: "150,00 - 200,00m²", min: 150, max: 200 },
  { label: "Trên 200,00m²", min: 200, max: Infinity },
];

interface AreaRangesProps {
  onPress: (min: number, max: number) => void;
  selectedMin: number;
  selectedMax: number;
}

const AreaRanges: FC<AreaRangesProps> = ({
  onPress,
  selectedMin,
  selectedMax,
}) => {
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
      {areaRanges.map((areaRange, index) => (
        <TouchableOpacity
          onPress={() => onPress(areaRange.min, areaRange.max)}
          style={[
            styles.range,
            selectedMin === areaRange.min && selectedMax === areaRange.max
              ? styles.selectedPriceRange // Thay đổi màu cho khoảng giá đã chọn
              : null,
          ]}
          key={index}
        >
          <ThemedText
            style={
              selectedMin === areaRange.min && selectedMax === areaRange.max
                ? { color: "#fff" } // Thay đổi màu chữ cho khoảng giá đã chọn
                : { color: "#000" }
            }
            type="default"
          >
            {areaRange.label}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  range: {
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

export default AreaRanges;
