import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import ThemedViewSHKeyboard from "@/components/ThemedViewSHKeyboard";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { OtpInput } from "react-native-otp-entry";
import OtpTimer from "@/components/OtpTimer";
import ThemedBottomBtn from "@/components/ThemedBottomBtn";
import ThemedButton from "@/components/ThemedButton";
import { router, useLocalSearchParams } from "expo-router";
import { useApi } from "@/hooks/useApi";
import { resendOtp, verifyOtp } from "@/services/api/auth";

export default function Otp() {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const textColor =
    colorScheme === "dark" ? Colors.dark.darkText : Colors.light.text;
  const [second, setSecond] = useState(3);
  const { loading, error, request: verifyOtpRequest } = useApi(verifyOtp);
  // const { request: resendOtpRequest } = useApi(resendOtp);
  const [otp, setOtp] = useState("");

  const [validationErrorMsg, setValidationErrorMsg] = useState("");

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
      backgroundColor: "#F5F4F8",
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

  const { email } = useLocalSearchParams();

  const onSendAgain = async () => {
    try {
      setSecond(60);
      const data = await resendOtp(email as string);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onConfirmOTP = async () => {
    if (!validation()) {
      setValidationErrorMsg("Vui lòng nhập mã OTP!");
      return;
    }
    try {
      const data = await verifyOtpRequest(email, otp);
      console.log(data);
      if (data) router.push("/(auth)/(signin)");
    } catch (error) {
      console.log(error);
      Alert.alert("Lỗi", "Mã OTP không chính xác!");
    }
  };

  const validation = () => {
    if (otp.length < 4) {
      return false;
    }
    return true;
  };

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
          Nhập mã xác thực 4 số đã được gửi đến {email} của bạn
        </ThemedText>
        <OtpInput
          numberOfDigits={4}
          onTextChange={(text) => {
            setOtp(text);
          }}
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
          }}
          hideStick={true}
        />

        <OtpTimer second={second} setSecond={setSecond} />
        <ThemedView
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "center",
          }}
        >
          <ThemedText type="default">Chưa nhận được mã xác thực? </ThemedText>
          {/* <ThemedText type="link">Gửi lại mã</ThemedText> */}
          {second == 0 ? (
            <TouchableOpacity onPress={onSendAgain}>
              <ThemedText
                style={{
                  color: Colors.light.tint,
                  textDecorationLine: "underline",
                }}
                type="default"
              >
                Gửi lại mã
              </ThemedText>
            </TouchableOpacity>
          ) : (
            <ThemedText
              style={{
                color: "#ccc",
                // textDecorationLine: "underline",
              }}
              type="default"
            >
              Gửi lại mã
            </ThemedText>
          )}
        </ThemedView>
        <ThemedView>
          <ThemedText type="error" style={{ textAlign: "center" }}>
            {validationErrorMsg}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedBottomBtn>
        <ThemedButton
          title="Xác nhận"
          handlePress={() => {
            onConfirmOTP();
          }}
        />
      </ThemedBottomBtn>
    </ThemedViewSHKeyboard>
  );
}
