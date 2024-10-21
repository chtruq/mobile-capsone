import { View, Text } from "react-native";
import React, { FC } from "react";

interface ErrorProps {
  message: string;
}

const Error: FC<ErrorProps> = ({ message }) => {
  return (
    <View>
      <Text>{message}</Text>
    </View>
  );
};

export default Error;
