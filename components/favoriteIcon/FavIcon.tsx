import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function FavIcon(
  props: {
    isFav: boolean;
    style?: any;
  } = { isFav: false }
) {
  return (
    <TouchableOpacity style={props.style}>
      {props.isFav ? (
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={require("@/assets/images/favorite-active.png")}
        />
      ) : (
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={require("@/assets/images/favorite-inactive.png")}
        />
      )}
    </TouchableOpacity>
  );
}
