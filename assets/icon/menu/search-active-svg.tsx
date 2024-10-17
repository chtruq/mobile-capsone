import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

export default function SearchActiveSVG(props: any) {
  return (
    <Svg width="20" height="21" viewBox="0 0 20 21" fill="none">
      <Path
        d="M7.95831 15.5C11.7553 15.5 14.8333 12.422 14.8333 8.625C14.8333 4.82804 11.7553 1.75 7.95831 1.75C4.16136 1.75 1.08331 4.82804 1.08331 8.625C1.08331 12.422 4.16136 15.5 7.95831 15.5Z"
        stroke="#252B5C"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.5833 19.2499L12.75 13.8333"
        stroke="#252B5C"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
