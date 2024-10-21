import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Input from "@/components/Input/Input";
import { Feather } from "@expo/vector-icons";
import ThemedBottomBtn from "@/components/ThemedBottomBtn";
import ThemedButton from "@/components/ThemedButton";
import { router } from "expo-router";
import * as Yup from "yup";
import { Formik } from "formik";
import { useApi } from "@/hooks/useApi";
import { register } from "@/services/api/auth";
export default function SignUp() {
  const colorScheme = useColorScheme();
  const { loading, error, request: registerRequest } = useApi(register);

  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required("Họ và tên là bắt buộc"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    password: Yup.string()
      .min(6, "Mật khẩu phải ít nhất 6 ký tự")
      .required("Mật khẩu là bắt buộc"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Mật khẩu không khớp")
      .required("Vui lòng nhập lại mật khẩu"),
  });

  const handleSignUp = async (values: any) => {
    try {
      const data = await registerRequest(
        values.name,
        values.email,
        values.password,
        values.confirmPassword
      );
      router.push({
        pathname: "/(auth)/otp",
        params: { email: values.email },
      });
    } catch (error) {
      console.log("Register error:", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={handleSignUp}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
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
                      style={{ marginTop: 10 }}
                      value={values.name}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      errorMessage={
                        touched.name && errors.name ? errors.name : ""
                      }
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
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      errorMessage={
                        touched.email && errors.email ? errors.email : ""
                      }
                      style={{ marginTop: 10 }}
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
                      style={{ marginTop: 10 }}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      errorMessage={
                        touched.password && errors.password
                          ? errors.password
                          : ""
                      }
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
                      // style={{ marginTop: 10 }}
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      errorMessage={
                        touched.confirmPassword && errors.confirmPassword
                          ? errors.confirmPassword
                          : ""
                      }
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
                  ></ThemedView>
                </ThemedView>

                <ThemedBottomBtn>
                  <ThemedButton
                    title="Đăng ký"
                    handlePress={() => {
                      // router.push("/(auth)/otp");
                      handleSubmit();
                    }}
                  />
                </ThemedBottomBtn>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    color: "white",
  },
});
