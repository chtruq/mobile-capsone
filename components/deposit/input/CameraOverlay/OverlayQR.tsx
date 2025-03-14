import { Canvas, DiffRect, rect, rrect } from "@shopify/react-native-skia";
import { Dimensions, Platform, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const qrCodeSize = 240;

const outer = rrect(rect(0, 0, width, height), 0, 0);
const inner = rrect(
  rect(
    width / 2 - qrCodeSize / 2,
    height / 2 - qrCodeSize / 2,
    qrCodeSize,
    qrCodeSize
  ),
  20,
  20
);

export const OverlayQR = () => {
  return (
    <Canvas
      style={
        Platform.OS === "android"
          ? { flex: 1, position: "absolute", width: width, height: height }
          : StyleSheet.absoluteFillObject
      }
    >
      <DiffRect inner={inner} outer={outer} color="black" opacity={0.6} />
    </Canvas>
  );
};
