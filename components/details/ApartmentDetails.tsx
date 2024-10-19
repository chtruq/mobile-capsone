import { View, Text } from "react-native";
import React, { ReactElement } from "react";
import { ThemedText } from "../ThemedText";

interface ApartmentDetailsProps {
  data: number | string | any; // Allow any type for debug purposes
  Icon: ReactElement;
  title: string;
}

export default function ApartmentDetails({
  data,
  Icon,
  title,
}: ApartmentDetailsProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        borderTopColor: "#F4F4F4",
        borderTopWidth: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          width: "50%",
        }}
      >
        {Icon}
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          width: "50%",
        }}
      >
        <ThemedText type="defaultSemiBold">{data}</ThemedText>
      </View>
    </View>
  );
}
