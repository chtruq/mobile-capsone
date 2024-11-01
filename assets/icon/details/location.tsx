import { View, Text } from "react-native";
import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { Icon } from "@/model/icon";

const LocationIcon: FC<Icon> = ({ width, height }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 14" fill="none">
      <Path
        d="M11.6666 5.83317C11.6666 8.41034 6.99992 12.8332 6.99992 12.8332C6.99992 12.8332 2.33325 8.41034 2.33325 5.83317C2.33325 4.59549 2.82492 3.40851 3.70009 2.53334C4.57526 1.65817 5.76224 1.1665 6.99992 1.1665C8.2376 1.1665 9.42458 1.65817 10.2998 2.53334C11.1749 3.40851 11.6666 4.59549 11.6666 5.83317Z"
        fill="#FFC42D"
      />
      <Path
        d="M6.9998 6.2999C7.18546 6.2999 7.3635 6.22615 7.49478 6.09488C7.62605 5.9636 7.6998 5.78555 7.6998 5.5999C7.6998 5.41425 7.62605 5.2362 7.49478 5.10493C7.3635 4.97365 7.18546 4.8999 6.9998 4.8999C6.81415 4.8999 6.63611 4.97365 6.50483 5.10493C6.37355 5.2362 6.2998 5.41425 6.2998 5.5999C6.2998 5.78555 6.37355 5.9636 6.50483 6.09488C6.63611 6.22615 6.81415 6.2999 6.9998 6.2999Z"
        fill="white"
        stroke="white"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default LocationIcon;
