import { View, Text } from "react-native";
import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";

interface StatusInactiveIconProps {
  width?: number;
  height?: number;
}

const StatusInactiveIcon: FC<StatusInactiveIconProps> = ({ width, height }) => {
  return (
    <Svg
      width={width || 32}
      height={height || 32}
      viewBox="0 0 32 32"
      fill="none"
    >
      <Path
        d="M16.1067 18.44L12.4 14.72L16.1067 11.0133"
        stroke="#A1A5C1"
        stroke-width="1.91"
        stroke-miterlimit="10"
      />
      <Path
        d="M13.4533 14.7333H16C17.0079 14.7333 17.9932 15.0323 18.8311 15.5926C19.6689 16.1528 20.3217 16.9491 20.7069 17.8806C21.092 18.812 21.192 19.8368 20.9944 20.8252C20.7968 21.8136 20.3104 22.7211 19.5968 23.4329C18.8831 24.1446 17.9743 24.6287 16.9854 24.8237C15.9965 25.0187 14.972 24.9159 14.0416 24.5284C13.1111 24.1409 12.3166 23.486 11.7585 22.6466C11.2005 21.8073 10.904 20.8212 10.9066 19.8133"
        stroke="#A1A5C1"
        stroke-width="1.91"
        stroke-miterlimit="10"
      />
      <Path
        d="M27.4533 8.36V30H4.54663V2H21.0933L27.4533 8.36Z"
        stroke="#A1A5C1"
        stroke-width="1.91"
        stroke-miterlimit="10"
      />
      <Path
        d="M27.4534 8.36V9.64H19.8134V2H21.0934L27.4534 8.36Z"
        stroke="#A1A5C1"
        stroke-width="1.91"
        stroke-miterlimit="10"
      />
    </Svg>
  );
};

export default StatusInactiveIcon;
