import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

const UploadIcon = () => {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <Path
        d="M22.6668 12.0027C25.5668 12.0188 27.1373 12.1474 28.1618 13.172C29.3334 14.3436 29.3334 16.2292 29.3334 20.0004V21.3337C29.3334 25.1049 29.3334 26.9906 28.1618 28.1621C26.9902 29.3337 25.1046 29.3337 21.3334 29.3337H10.6667C6.89551 29.3337 5.0099 29.3337 3.83832 28.1621C2.66675 26.9906 2.66675 25.1049 2.66675 21.3337V20.0004C2.66675 16.2292 2.66675 14.3436 3.83832 13.1719C4.86283 12.1474 6.43338 12.0188 9.33342 12.0027"
        stroke="#1C274C"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M16 20.0001V2.66675M16 2.66675L20 7.33341M16 2.66675L12 7.33341"
        stroke="#1C274C"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default UploadIcon;
