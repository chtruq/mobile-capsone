import { View, Text } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import ThemedViewSHKeyboard from "@/components/ThemedViewSHKeyboard";
import Input from "@/components/Input/Input";
import AddressPicker from "@/components/AccoutSetting/Address";
import ThemedBottomBtn from "@/components/ThemedBottomBtn";
import ThemedButton from "@/components/ThemedButton";
import { router } from "expo-router";

export default function AddressSetup() {
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
            Chọn vị trí
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 16,
              marginTop: 10,
            }}
            type="default"
          >
            Chọn vị trí bạn muốn tìm kiếm
          </ThemedText>
          <AddressPicker title="Chọn tỉnh, thành phố" />
          <AddressPicker title="Chọn quận, huyện" />
        </ThemedView>
      </ThemedViewSHKeyboard>
      <ThemedBottomBtn>
        <ThemedButton
          title="Tiếp tục"
          link={"/accountsetup/user"}
          handlePress={() => {
            router.push("/accountsetup/user");
          }}
        />
      </ThemedBottomBtn>
    </ThemedView>
  );
}
