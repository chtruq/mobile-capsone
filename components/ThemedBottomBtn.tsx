import { View, Text } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";

const ThemedBottomBtn = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <ThemedView
      style={{
        width: "100%",
        position: "absolute",
        bottom: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </ThemedView>
  );
};

export default ThemedBottomBtn;
