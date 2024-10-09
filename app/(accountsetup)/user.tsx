import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import ThemedViewSHKeyboard from "@/components/ThemedViewSHKeyboard";
import AddressPicker from "@/components/AccoutSetting/Address";
import { ThemedText } from "@/components/ThemedText";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Input from "@/components/Input/Input";
import Feather from "@expo/vector-icons/Feather";
import ThemedBottomBtn from "@/components/ThemedBottomBtn";
import ThemedButton from "@/components/ThemedButton";
const user = () => {
  const [image, setImage] = useState<string | null>(null);
  const colorScheme = useColorScheme();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <ThemedViewSHKeyboard>
        <ThemedView
          style={{
            flex: 1,
            marginHorizontal: 20,
            marginTop: 20,
          }}
        >
          <ThemedText
            style={{
              fontSize: 24,
            }}
            type="title"
          >
            Điền thông tin cá nhân
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 16,
              marginTop: 10,
            }}
            type="default"
          >
            Điền thông tin cá nhân của bạn
          </ThemedText>

          {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
          <ThemedView
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <ThemedView>
              <ThemedView
                style={{
                  marginTop: 20,
                  backgroundColor: "#ccc",
                  padding: 40,
                  width: 150,
                  height: 150,
                  borderRadius: 100,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={pickImage}>
                  {image ? (
                    <>
                      <Image source={{ uri: image }} style={styles.image} />
                      <ThemedView
                        style={{
                          position: "absolute",
                          bottom: 10,
                          right: 10,
                          width: 40,
                          height: 40,
                          backgroundColor: "#234F68",
                          borderRadius: 40,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <EvilIcons name="pencil" size={32} color="white" />
                      </ThemedView>
                    </>
                  ) : (
                    <FontAwesome name="user" size={40} color="grey" />
                  )}
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          </ThemedView>
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
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              }
            />

            <Input
              placeholder="Số điện thoại"
              fieldName="phone"
              style={{ marginTop: 20 }}
              icon={
                <Feather
                  name="phone"
                  size={24}
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
          </ThemedView>
        </ThemedView>
      </ThemedViewSHKeyboard>
      <ThemedBottomBtn>
        <ThemedButton title="Hoàn tất" link={"/(accountsetup)/success-modal"} />
      </ThemedBottomBtn>
    </ThemedView>
  );
};

export default user;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    padding: 40,
    width: 150,
    height: 150,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
