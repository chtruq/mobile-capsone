import { View, Text, ActivityIndicator } from "react-native";
import React, { FC } from "react";

interface LoadingProps {
  color?: string;
  size?: "small" | "large";
}

const Loading: FC<LoadingProps> = () => {
  return (
    <View>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default Loading;
