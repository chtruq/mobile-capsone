import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import Checkbox from "expo-checkbox";
import { Colors } from "@/constants/Colors";

const ConfirmInfo = () => {
  const Data = {
    type: "Cá nhân",
    name: "Nguyen Van A",
    idcccd: "07928281103",
    email: "nguyenvana@gmail.com",
    phone: "0978123122",
    nationality: "Việt Nam",
    address: "123 Đường ABC, Quận 1, TP.HCM",
  };

  const [isChecked, setChecked] = React.useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ccc",
      }}
    >
      <ThemedView
        style={{
          margin: 5,
          borderRadius: 10,
          padding: 10,
        }}
      >
        <ThemedText type="heading">Xác nhận thông tin </ThemedText>
        <View
          style={{
            borderRadius: 10,
            borderColor: "#ccc",
            padding: 10,
            borderWidth: 1,
          }}
        >
          <ThemedText type="small">Khách hàng: </ThemedText>
          <ThemedText type="default">{Data.type}</ThemedText>

          <ThemedText type="small">Họ và tên: </ThemedText>
          <ThemedText type="default">{Data.name}</ThemedText>

          <ThemedText type="small">Loại giấy tờ tuỳ thân: </ThemedText>
          <ThemedText type="default">
            Căn cước công dân/Chứng minh thư nhân dân
          </ThemedText>

          <ThemedText type="small">Số căn cước: </ThemedText>
          <ThemedText type="default">{Data.idcccd}</ThemedText>

          <ThemedText type="small">Email: </ThemedText>
          <ThemedText type="default">{Data.email}</ThemedText>

          <ThemedText type="small">Điện thoại: </ThemedText>
          <ThemedText type="default">{Data.phone}</ThemedText>

          <ThemedText type="small">Quốc tịch: </ThemedText>
          <ThemedText type="default">{Data.nationality}</ThemedText>

          <ThemedText type="small">Địa chỉ: </ThemedText>
          <ThemedText type="default">{Data.address}</ThemedText>
        </View>
        <ThemedText type="heading">Hình thức thanh toán </ThemedText>

        <TouchableOpacity
          onPress={() => {
            setChecked(!isChecked);
          }}
          style={{
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderColor: Colors.light.primary,
            borderWidth: 1,
            padding: 5,
          }}
        >
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "#000", // Black border for radio buttons
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10,
            }}
          >
            {isChecked && (
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  backgroundColor: "#000",
                }}
              ></View>
            )}
          </View>
          <View>
            <ThemedText>Thanh toán chuyển khoản qua ngân hàng</ThemedText>
          </View>
        </TouchableOpacity>
        <View>
          <ThemedText type="heading">Chú ý: </ThemedText>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <ThemedText type="subtitle">.</ThemedText>
            <ThemedText type="small">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              illum saepe, accusamus, facilis, ex omnis ad tenetur in vitae
              culpa nihil aspernatur ducimus cum obcaecati et dolor ut minima
              exercitationem.
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </View>
  );
};

export default ConfirmInfo;
