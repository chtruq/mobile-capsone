import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useState } from "react";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { Link, Redirect, router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import ThemedBottomBtn from "@/components/ThemedBottomBtn";
import ThemedButton from "@/components/ThemedButton";
import { ThemedView } from "@/components/ThemedView";

interface SuccessModalProps {
  state: boolean;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ state }) => {
  const [modalVisible, setModalVisible] = useState(state); // Control modal visibility

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  if (!modalVisible) return null;
  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#00000040",
      }}
    >
      {/* Dismiss modal when pressing outside */}

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
          <ThemedButton
            title="Xong"
            handlePress={() => {
              router.push("/(main)/(tabs)");
              handleCloseModal();
            }}
          />
        </ThemedBottomBtn>
      </Animated.View>
    </Animated.View>
  );
};

export default SuccessModal;
