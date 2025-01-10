import { Canvas, DiffRect, rect, rrect } from "@shopify/react-native-skia";
import { Dimensions, Platform, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const cccdWidth = 375; // You can adjust this value as needed
const cccdHeight = cccdWidth / 1.585; // Height calculated using CCCD aspect ratio

const outer = rrect(rect(0, 0, width, height), 0, 0);
const inner = rrect(
  rect(
    width / 2 - cccdWidth / 2,
    height / 2 - cccdHeight / 2,
    cccdWidth,
    cccdHeight
  ),
  20, // Corner radius
  20
);

export const Overlay = () => {
  return (
    <Canvas
      style={
        Platform.OS === "android"
          ? { flex: 1, position: "absolute", width: width, height: height }
          : StyleSheet.absoluteFillObject
      }
    >
      <DiffRect inner={inner} outer={outer} color="black" opacity={0.5} />
    </Canvas>
  );
};
