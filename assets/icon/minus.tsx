import { View, Text } from "react-native";
import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { Icon } from "@/model/icon";

const CircleMinusIcon: FC<Icon> = ({ width, height }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 31 30" fill="none">
      <Path
        d="M8.85714 13.9287C8.38375 13.9287 8 14.3125 8 14.7859V15.2144C8 15.6878 8.38375 16.0716 8.85714 16.0716H22.1429C22.6162 16.0716 23 15.6878 23 15.2144V14.7859C23 14.3125 22.6162 13.9287 22.1429 13.9287H8.85714Z"
        fill="black"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.4999 1.07153C7.80734 1.07153 1.57129 7.30758 1.57129 15.0001C1.57129 22.6926 7.80734 28.9287 15.4999 28.9287C23.1924 28.9287 29.4284 22.6926 29.4284 15.0001C29.4284 7.30758 23.1924 1.07153 15.4999 1.07153ZM3.71415 15.0001C3.71415 8.49096 8.99177 3.21439 15.4999 3.21439C22.0079 3.21439 27.2856 8.49096 27.2856 15.0001C27.2856 21.5092 22.0079 26.7858 15.4999 26.7858C8.99177 26.7858 3.71415 21.5092 3.71415 15.0001Z"
        fill="black"
      />
    </Svg>
  );
};

export default CircleMinusIcon;
