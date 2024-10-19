import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

export default function BedIcon(props: any) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path
        d="M17.5 9.16675V10.8334V14.1667H2.5V9.16675H7.5"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M2.5 4.16675V15.8334M17.5 13.3334V15.8334M16.6667 7.50008H8.33333C8.11232 7.50008 7.90036 7.58788 7.74408 7.74416C7.5878 7.90044 7.5 8.1124 7.5 8.33341V10.8334H17.5V8.33341C17.5 8.1124 17.4122 7.90044 17.2559 7.74416C17.0996 7.58788 16.8877 7.50008 16.6667 7.50008Z"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
