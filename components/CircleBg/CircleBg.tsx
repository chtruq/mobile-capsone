import { View, Text, ImageBackground } from "react-native";
import React from "react";

const CircleBg = () => {
  return (
    <ImageBackground
      style={{
        backgroundColor: "#EECE80",
        position: "absolute",
        top: -200,
        left: -80,
        borderRadius: 250,
        opacity: 0.2,
        width: 350,
        height: 350,
      }}
    />
  );
};

export default CircleBg;
