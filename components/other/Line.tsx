import { View, Text } from "react-native";
import React, { FC } from "react";

interface LineProps {
  width: string | number;
}

const Line: FC<LineProps> = ({ width }) => {
  return (
    <View
      style={{
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginVertical: 10,
        width: width,
      }}
    ></View>
  );
};

export default Line;
