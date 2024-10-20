import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

const HeartIcon = () => {
  return (
    <Svg width="20" height="20" viewBox="0 0 16 17" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 4.50013C6.8004 3.10212 4.79585 2.67007 3.29282 3.95023C1.78979 5.23039 1.57818 7.37074 2.75852 8.88481C3.73989 10.1436 6.70987 12.7986 7.68327 13.6579C7.79213 13.7541 7.8466 13.8021 7.91013 13.821C7.96553 13.8375 8.0262 13.8375 8.08167 13.821C8.1452 13.8021 8.1996 13.7541 8.30853 13.6579C9.28193 12.7986 12.2519 10.1436 13.2333 8.88481C14.4136 7.37074 14.2278 5.21693 12.6989 3.95023C11.1701 2.68354 9.1996 3.10212 8 4.50013Z"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default HeartIcon;
