import { View, Text } from "react-native";
import React, { FC } from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

interface HouseDirectionIconProps {
  width: number;
  height: number;
}

const HouseDirectionIcon: FC<HouseDirectionIconProps> = ({ width, height }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <G clip-path="url(#clip0_277_751)">
        <Path
          d="M3.75 8.125V4.63375L9.375 10.2587V17.5H10.625V10.2587L16.25 4.63375V8.125H17.5V2.5H11.875V3.75H15.3663L10 9.11625L4.63375 3.75H8.125V2.5H2.5V8.125H3.75Z"
          fill="black"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_277_751">
          <Rect width="20" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default HouseDirectionIcon;
