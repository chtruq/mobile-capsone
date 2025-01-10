import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/AuthContext";
import { getUserInfo } from "@/services/api/account";

interface InputProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

interface userInfomation {
  id: string;
  email: string;
  name: string;
  avatar: string;
  phoneNumber: string;
}

const PersonalUpdateData = () => {
  const { userInfo } = useAuth();
  const [user, setUser] = useState<userInfomation>();
  const fetchUserInfo = async () => {
    try {
      const res = await getUserInfo(userInfo?.id || "");
      setUser(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const PersonalInput: FC<InputProps> = ({ label, value, onChange }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
        }}
      >
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "gray",
            padding: 20,
            borderRadius: 10,
            flex: 1,
          }}
          value={value}
          onChangeText={onChange}
          placeholder={label}
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              padding: 20,
            }}
          >
            <View style={styles.line}>
              <PersonalInput label="Họ và tên" value={user?.name || ""} />
              <PersonalInput
                label="Chọn ngày sinh"
                value=""
                onChange={(value) => console.log(value)}
              />
              <PersonalInput
                label="Giới tính"
                value=""
                onChange={(value) => console.log(value)}
              />
            </View>

            <View>
              <View style={styles.line}>
                <ThemedText type="defaultSemiBold">Email</ThemedText>
                <ThemedText
                  style={{
                    marginBottom: 10,
                    textDecorationLine: "underline",
                  }}
                  type="defaultSemiBold"
                >
                  {user?.email || ""}
                </ThemedText>
                <ThemedText>
                  Địa chỉ email này dùng để đăng nhập và không thể thay đổi
                </ThemedText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // paddingVertical: 10,
                  borderBottomWidth: 0.5,
                  borderBottomColor: "gray",
                  alignItems: "center",
                }}
              >
                <View>
                  <ThemedText
                    type="defaultSemiBold"
                    style={
                      {
                        // marginBottom: 10,
                      }
                    }
                  >
                    Số điện thoại
                  </ThemedText>
                  <ThemedText
                    style={{
                      marginBottom: 10,
                    }}
                    type="defaultSemiBold"
                  >
                    {user?.phoneNumber || ""}
                  </ThemedText>
                </View>
                <View>
                  <ThemedText
                    style={{
                      textDecorationLine: "underline",
                    }}
                  >
                    Chỉnh sửa
                  </ThemedText>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 10,
                  borderBottomWidth: 0.5,
                  borderBottomColor: "gray",
                  alignItems: "center",
                }}
              >
                <View>
                  <ThemedText type="defaultSemiBold">Mật khẩu</ThemedText>
                  <ThemedText>Mật khẩu</ThemedText>
                </View>
                <View>
                  <ThemedText
                    style={{
                      textDecorationLine: "underline",
                    }}
                  >
                    Đổi mật khẩu
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>
        </ThemedView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PersonalUpdateData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 20,
    borderRadius: 10,
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    marginBottom: 10,
  },
});
