import {
  View,
  Text,
  useColorScheme,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Input from "@/components/Input/Input";
import { Feather } from "@expo/vector-icons";
import ThemedButton from "@/components/ThemedButton";
import { router } from "expo-router";
import { login } from "@/services/api/auth";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import LoadingModal from "@/components/loading/LoadingModal";
import * as SecureStore from "expo-secure-store";

export default function SignIn() {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const { login: loginUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, request: loginRequest } = useApi(login);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await SecureStore.getItemAsync("email");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    };
    fetchEmail();
  }, []);
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const data = await loginRequest(email, password);
      loginUser(data.data.token);
    } catch (error) {
      console.log("Login error:", error);
      Alert.alert("Đăng nhập thất bại", "Email hoặc mật khẩu không đúng");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          {/* Hiển thị lỗi nếu có */}
          <LoadingModal visible={isLoading} message="Vui lòng chờ" />
          <ThemedView>
            <Image
              source={require("../../../assets/images/signInImage/signinpic.png")}
              style={{ width: 400, height: 200 }}
              resizeMode="cover"
            />
          </ThemedView>
          <ThemedView
            style={{
              flexDirection: "row",
              width: "80%",
              marginTop: 20,
              marginLeft: 20,
            }}
          >
            <ThemedText type="title">Đăng nhập </ThemedText>
          </ThemedView>
          <ThemedView
            style={{
              flexDirection: "row",
              width: "80%",
              marginTop: 20,
              marginLeft: 20,
            }}
          >
            <ThemedText> Chào mừng bạn đến với LUXUVER</ThemedText>
          </ThemedView>
          <ThemedView
            style={{
              flexDirection: "column",
              gap: 20,
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
            }}
          >
            <Input
              icon={
                <Feather
                  name="mail"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              }
              placeholder="Email"
              fieldName="Email"
              value={email}
              onChangeText={(text: string) => setEmail(text)}
            />
            <Input
              icon={
                <Feather
                  name="lock"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              }
              placeholder="Password"
              fieldName="Password"
              hidePassword
              value={password}
              onChangeText={(text: string) => setPassword(text)}
            />
          </ThemedView>
          <ThemedView
            style={{
              marginHorizontal: 20,
              marginTop: 10,
            }}
          >
            <ThemedText
              style={{
                color: "#A1A5C1",
                fontSize: 12,
                lineHeight: 24,
              }}
            >
              Forgot your password?
            </ThemedText>
          </ThemedView>

          {/* dang nhap */}
          <ThemedView
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThemedButton handlePress={handleLogin} title="Đăng nhập" />
          </ThemedView>
          <ThemedView
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThemedView
              style={{
                borderColor: "#ECEDF3",
                borderWidth: 0.8,
                width: "40%",
              }}
            ></ThemedView>
          </ThemedView>

          <ThemedView
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <ThemedText>Chưa có tài khoản? </ThemedText>
            <TouchableOpacity
              onPress={() => {
                router.push("/signup");
                console.log("Sign up");
              }}
            >
              <ThemedText type="link">Đăng kí</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ThemedView>
  );
}
