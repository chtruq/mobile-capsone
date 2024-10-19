import { View, Text } from "react-native";
import React, { FC } from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

interface BathRoomIconProps {
  width: number;
  height: number;
}

const BathRoomIcon: FC<BathRoomIconProps> = ({ width, height }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <G clipPath="url(#clip0_277_744)">
        <Path
          d="M0 10.0001H20M6 16.6667H14M6 16.6667C3.79087 16.6667 2 14.8759 2 12.6667V4.66675C2 2.45761 3.79087 0.666748 6 0.666748H8.66667V2.66675M6 16.6667V20.0001M14 16.6667C16.2092 16.6667 18 14.8759 18 12.6667V10.0001M14 16.6667V20.0001M6.66667 4.66675H10.6667"
          stroke="black"
          strokeWidth="1.5" // Updated to camelCase
        />
      </G>
      <Defs>
        <ClipPath id="clip0_277_744">
          <Rect width="20" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default BathRoomIcon;
