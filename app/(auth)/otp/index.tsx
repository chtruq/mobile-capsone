import { View, Text, useColorScheme, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import ThemedViewSHKeyboard from "@/components/ThemedViewSHKeyboard";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { OtpInput } from "react-native-otp-entry";
import OtpTimer from "@/components/OtpTimer";
import ThemedBottomBtn from "@/components/ThemedBottomBtn";
import ThemedButton from "@/components/ThemedButton";
import { router } from "expo-router";

export default function Otp() {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.button : Colors.light.button;
  const textColor =
    colorScheme === "dark" ? Colors.dark.darkText : Colors.light.lightText;

  const styles = StyleSheet.create({
    otpContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    pinCodeContainer: {
      width: 50,
      height: 50,
      borderRadius: 10,
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      justifyContent: "center",
      alignItems: "center",
    },
    pinCodeText: {
      fontSize: 24,
      color: textColor,
    },
    focusStick: {
      width: 50,
      height: 2,
      backgroundColor: "black",
    },
    activePinCodeContainer: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  });
  return (
    <ThemedViewSHKeyboard>
      <ThemedView
        style={{
          marginTop: 30,
          marginHorizontal: 20,
        }}
      >
        <ThemedText type="title">Nhập mã xác thực</ThemedText>
        <ThemedText type="default" style={{ marginTop: 20 }}>
          Nhập mã xác thực 4 số đã được gửi đến email của bạn
        </ThemedText>
        <OtpInput
          numberOfDigits={4}
          onTextChange={(text) => console.log(text)}
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
          }}
          hideStick={true}
        />

        <OtpTimer />
        <ThemedView
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "center",
          }}
        >
          <ThemedText type="default">Chưa nhận được mã xác thực? </ThemedText>
          <ThemedText type="link">Gửi lại mã</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedBottomBtn>
        <ThemedButton
          title="Xác nhận"
          handlePress={() => {
            router.push("/accountsetup");
          }}
        />
      </ThemedBottomBtn>
    </ThemedViewSHKeyboard>
  );
}
