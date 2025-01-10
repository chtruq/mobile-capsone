import {
  View,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Checkbox from "expo-checkbox";
import DeclareInput from "@/components/deposit/input/DeclareInput";
import Button from "@/components/button/Button";
import { sendPropertyRequest } from "@/services/api/property";
import { useAuth } from "@/context/AuthContext";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

const ConsignmentRequest = () => {
  const { userInfo } = useAuth();

  const [form, setForm] = React.useState({
    ownerID: userInfo.id,
    propertyName: "",
    expectedPrice: 0,
    description: "",
    address: "",
    userName: "",
    phoneNumber: "",
    email: "",
  });

  //validate and alert
  const validate = () => {
    const validateEmail = () => {
      const re = /\S+@\S+\.\S+/;
      return re.test(form.email);
    };
    const validatePhoneNumber = () => {
      const re = /^\d{10,11}$/;
      return re.test(form.phoneNumber);
    };

    if (!form.propertyName) {
      Alert.alert("Vui lòng nhập tên căn hộ");
      return false;
    }
    if (!form.expectedPrice) {
      Alert.alert("Vui lòng nhập giá mong muốn");
      return false;
    }
    if (!form.description) {
      Alert.alert("Vui lòng nhập mô tả");
      return false;
    }
    if (!form.address) {
      Alert.alert("Vui lòng nhập địa chỉ");
      return false;
    }
    if (!form.userName) {
      Alert.alert("Vui lòng nhập họ và tên");
      return false;
    }
    if (!form.phoneNumber) {
      Alert.alert("Vui lòng nhập số điện thoại");
      return false;
    }
    if (!form.email) {
      Alert.alert("Vui lòng nhập email");
      return false;
    }
    if (!validateEmail()) {
      Alert.alert("Email không hợp lệ");
      return false;
    }
    if (!validatePhoneNumber()) {
      Alert.alert("Số điện thoại không hợp lệ");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (validate()) {
      console.log("Gửi thông tin");
      try {
        const res = await sendPropertyRequest(form);
        console.log(res.data);
        Toast.show({
          type: "success",
          text1: "Gửi thông tin thành công",
        });
        router.back();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ThemedView
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : `height`}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={{
              flex: 1,
            }}
            contentContainerStyle={{ flexGrow: 1.5 }}
            automaticallyAdjustKeyboardInsets={true}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <ThemedText type="defaultSemiBold">Thông tin căn hộ</ThemedText>
              <ThemedText type="default">Tỉnh/Thành phố</ThemedText>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    borderRadius: 50,
                    borderWidth: 1,
                    width: 20,
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      borderRadius: 50,
                      borderWidth: 1,
                      width: 12,
                      height: 12,
                      backgroundColor: "black",
                    }}
                  ></View>
                </View>
                <Text>TP.Hồ Chí Minh</Text>
              </View>
              <DeclareInput
                title="Tên căn hộ"
                editable
                value={form.propertyName}
                onChangeText={(text) =>
                  setForm({ ...form, propertyName: text })
                }
              />
              <DeclareInput
                title="Giá mong muốn"
                isNumber
                editable
                value={form.expectedPrice.toString()}
                onChangeText={(text) =>
                  setForm({ ...form, expectedPrice: Number(text) })
                }
              />
              <DeclareInput
                title="Mô tả"
                editable
                value={form.description}
                onChangeText={(text) => setForm({ ...form, description: text })}
              />
              <DeclareInput
                title="Địa chỉ"
                editable
                value={form.address}
                onChangeText={(text) => setForm({ ...form, address: text })}
              />
              <ThemedText type="defaultSemiBold">Thông tin liên hệ</ThemedText>
              <DeclareInput
                title="Họ và tên"
                editable
                value={form.userName}
                onChangeText={(text) => setForm({ ...form, userName: text })}
              />
              <DeclareInput
                title="Số điện thoại"
                editable
                isNumber
                value={form.phoneNumber}
                onChangeText={(text) => setForm({ ...form, phoneNumber: text })}
              />
              <DeclareInput
                title="Email"
                editable
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          title="Gửi thông tin"
          width="90%"
          handlePress={() => {
            handleSubmit();
          }}
        />
      </View>
    </ThemedView>
  );
};

export default ConsignmentRequest;
