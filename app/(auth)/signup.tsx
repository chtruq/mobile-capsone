import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  SafeAreaView,
  useColorScheme,
} from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Input from "@/components/Input/Input";
import Feather from "@expo/vector-icons/Feather";
import ThemedButton from "@/components/ThemedButton";

const signup = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ThemedView
            style={{
              marginTop: 30,
              marginHorizontal: 20,
            }}
          >
            <ThemedText type="title">Tạo tài khoản của bạn</ThemedText>
            <ThemedText type="default" style={{ marginTop: 20 }}>
              Tạo tài khoản để trải nghiệm toàn bộ dịch vụ
            </ThemedText>

            <ThemedView
              style={{
                marginTop: 20,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Input
                placeholder="Họ và tên"
                fieldName="name"
                style={{ marginTop: 20 }}
                icon={
                  <Feather
                    name="user"
                    size={20}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                }
              />
              <Input
                placeholder="Email"
                fieldName="email"
                style={{ marginTop: 20 }}
                icon={
                  <Feather
                    name="mail"
                    size={24}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                }
              />

              <Input
                placeholder="Mật khẩu"
                fieldName="password"
                style={{ marginTop: 20 }}
                hidePassword
                icon={
                  <Feather
                    name="lock"
                    size={24}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                }
              />

              <Input
                placeholder="Nhập lại mật khẩu"
                fieldName="confirmPassword"
                style={{ marginTop: 20 }}
                hidePassword
                icon={
                  <Feather
                    name="lock"
                    size={24}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                }
              />
            </ThemedView>

            <ThemedView
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <ThemedButton title="Đăng kí" link={"/"} />
            </ThemedView>
          </ThemedView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ThemedView>
  );
};

export default signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    color: "white",
  },
});
