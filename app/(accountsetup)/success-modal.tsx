import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import ThemedBottomBtn from "@/components/ThemedBottomBtn";
import ThemedButton from "@/components/ThemedButton";
import { ThemedView } from "@/components/ThemedView";
const successModal = () => {
  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000040",
      }}
    >
      {/* Dismiss modal when pressing outside */}
      <Link href={"/"} asChild>
        <Pressable style={StyleSheet.absoluteFill} />
      </Link>
      <Animated.View
        entering={SlideInDown}
        style={{
          width: "100%",
          height: "55%",
          borderRadius: 20,
          position: "absolute",
          bottom: 0,
          alignItems: "center",
          // justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <ThemedView
          style={{
            width: "100%",
            height: "50%",
            borderRadius: 20,
            position: "absolute",
            bottom: 0,
            alignItems: "center",
            // justifyContent: "center",
            backgroundColor: "white",
          }}
        ></ThemedView>
        <Image
          source={require("@/assets/images/accountSetup/AlertSuccess.png")}
          style={{
            width: 200,
            height: 200,
          }}
        />
        <ThemedText
          type="title"
          style={{
            marginTop: 20,
            fontSize: 20,
          }}
        >
          Tạo tài khoản thành công
        </ThemedText>
        <ThemedText>Chúc bạn có trải nghiệp thật tuyệt với app </ThemedText>
        <ThemedBottomBtn>
          <ThemedButton title="Xong" />
        </ThemedBottomBtn>
      </Animated.View>
    </Animated.View>
  );
};

export default successModal;
