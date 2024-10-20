import { View, Text } from "react-native";
import React, { FC } from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

interface Props {
  width?: number;
  height?: number;
}

const TickGreenIcon: FC<Props> = ({ width, height }) => {
  return (
    <Svg
      width={width || 32}
      height={height || 32}
      viewBox="0 0 32 32"
      fill="none"
    >
      <G clip-path="url(#clip0_343_991)">
        <Path
          d="M16 0C12.8355 0 9.74207 0.938384 7.11088 2.69649C4.4797 4.45459 2.42894 6.95345 1.21793 9.87706C0.00693258 12.8007 -0.309921 16.0177 0.307443 19.1214C0.924806 22.2251 2.44866 25.0761 4.6863 27.3137C6.92394 29.5513 9.77487 31.0752 12.8786 31.6926C15.9823 32.3099 19.1993 31.9931 22.1229 30.7821C25.0466 29.5711 27.5454 27.5203 29.3035 24.8891C31.0616 22.2579 32 19.1645 32 16C32 11.7565 30.3143 7.68687 27.3137 4.68629C24.3131 1.68571 20.2435 0 16 0ZM15.36 22.6667L8.00001 17.0533L10.44 13.8933L14.8533 17.3333L20.8667 10.56L23.8533 13.2267L15.36 22.6667Z"
          fill="#8BC840"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_343_991">
          <Rect width="32" height="32" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default TickGreenIcon;
