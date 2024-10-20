import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

const MailIcon = () => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.75 15C18.75 15.1269 18.7256 15.2469 18.6906 15.3613L13.125 9.375L18.75 5V15ZM2.2225 16.2163L7.86249 10.2062L10 11.8219L12.045 10.1962L17.7775 16.2163C17.6881 16.2369 2.31187 16.2369 2.2225 16.2163ZM1.25 15V5L6.875 9.375L1.30938 15.3613C1.27438 15.2469 1.25 15.1269 1.25 15ZM18.125 3.75L10 10L1.875 3.75H18.125ZM17.5 2.5H2.5C1.11937 2.5 0 3.61937 0 5V15C0 16.3806 1.11937 17.5 2.5 17.5H17.5C18.8806 17.5 20 16.3806 20 15V5C20 3.61937 18.8806 2.5 17.5 2.5Z"
        fill="black"
      />
    </Svg>
  );
};

export default MailIcon;
