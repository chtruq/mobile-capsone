import { View, Text, ActivityIndicator } from "react-native";
import React, { FC } from "react";
import { Colors } from "@/constants/Colors";

interface LoadingProps {
  color?: string;
  size?: "small" | "large";
}

const Loading: FC<LoadingProps> = () => {
  return (
    <View>
      <ActivityIndicator size="large" color={Colors.light.primary} />
    </View>
  );
};

export default Loading;
