import { View, Text } from "react-native";
import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { Icon } from "@/model/icon";

const BedIcon1: FC<Icon> = ({ width, height }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 14" fill="none">
      <Path
        d="M1.16675 2.3335V11.6668"
        stroke="#53587A"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1.16675 4.6665H11.6667C11.9762 4.6665 12.2729 4.78942 12.4917 5.00821C12.7105 5.22701 12.8334 5.52375 12.8334 5.83317V11.6665"
        stroke="#53587A"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1.16675 9.9165H12.8334"
        stroke="#53587A"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M3.5 4.6665V9.9165"
        stroke="#53587A"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default BedIcon1;
