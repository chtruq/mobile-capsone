import { View, Text } from "react-native";
import React, { FC } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import Button from "../button/Button";
import { router } from "expo-router";

interface Props {
  onConfirm: () => void;
  prevStep: () => void;
}

const OrderStatus: FC<Props> = ({ prevStep }) => {
  return (
    <>
      <ThemedView
        style={{
          // justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <ThemedText type="heading">Trạng thái đặt cọc giữ chỗ</ThemedText>
        <ThemedView
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 15,
            borderColor: "#ccc",
            borderWidth: 1,
            margin: 15,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              borderRadius: 100,
              backgroundColor: Colors.light.primary,
              width: 100,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: Colors.light.background,
                fontSize: 30,
              }}
            >
              !
            </Text>
          </View>
          <View>
            <ThemedText
              style={{
                alignSelf: "center",
              }}
              type="heading"
            >
              Đang chờ xác thực
            </ThemedText>
            <ThemedText type="default">
              Yêu cầu đặt cọc giữ chỗ căn hộ của bạn đang kiểm duyệt vui lòng
              chờ tới trong 24 giờ.
            </ThemedText>
          </View>
        </ThemedView>
      </ThemedView>
      <ThemedView
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          height: 95,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
            position: "absolute",
          }}
        >
          {/* <Button
            width={"30%"}
            title="Quay lại"
            handlePress={() => prevStep()}
            backgroundColor="#fff"
            textColor="#000"
            isBack
          /> */}
          <Button
            width={"100%"}
            title="Xem yêu cầu của bạn"
            handlePress={() =>
              router.replace({
                pathname: "/(main)/personal/transaction-manage",
                params: {
                  status: 0,
                },
              })
            }
          />
        </View>
      </ThemedView>
    </>
  );
};

export default OrderStatus;
