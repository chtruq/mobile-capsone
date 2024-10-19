import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

export default function AreaIcon(props: any) {
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path
        d="M2.5 4.16667V15.8333C2.5 16.7525 3.2475 17.5 4.16667 17.5H15.8333C16.7525 17.5 17.5 16.7525 17.5 15.8333V4.16667C17.5 3.2475 16.7525 2.5 15.8333 2.5H4.16667C3.2475 2.5 2.5 3.2475 2.5 4.16667ZM15.835 15.8333H4.16667V4.16667H15.8333L15.835 15.8333Z"
        fill="black"
      />
      <Path
        d="M12.5 9.99992H14.1667V5.83325H10V7.49992H12.5V9.99992ZM10 12.4999H7.50001V9.99992H5.83334V14.1666H10V12.4999Z"
        fill="black"
      />
    </Svg>
  );
}
