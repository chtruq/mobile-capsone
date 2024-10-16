import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

export default function Area(props: any) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <Path
        fill="#53587A"
        d="M1.75 2.917v8.166c0 .644.523 1.167 1.167 1.167h8.166c.644 0 1.167-.523 1.167-1.167V2.917c0-.644-.523-1.167-1.167-1.167H2.917c-.644 0-1.167.523-1.167 1.167Zm9.335 8.166H2.917V2.917h8.166l.002 8.166Z"
      />
      <Path
        fill="#53587A"
        d="M8.75 7h1.167V4.083H7V5.25h1.75V7ZM7 8.75H5.25V7H4.083v2.917H7V8.75Z"
      />
    </Svg>
  );
}
