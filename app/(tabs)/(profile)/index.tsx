import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import HeartIcon from "@/assets/icon/profile/HeartIcon";
import ViewedIcon from "@/assets/icon/profile/ViewedIcon";
import BuildingIcon from "@/assets/icon/profile/BuildingIcon";
import TransIcon from "@/assets/icon/profile/TransIcon";
import RequestIcon from "@/assets/icon/profile/RequestIcon";
import CalendarIcon from "@/assets/icon/profile/CalendarIcon";
import PhoneIcon from "@/assets/icon/profile/PhoneIcon";
import MailIcon from "@/assets/icon/profile/MailIcon";

interface ProfileTabBtnProps {
  title: string;
  onPress: () => void;
  icon: React.ReactNode;
}

export default function Profile() {
  const ProfileTabBtn: FC<ProfileTabBtnProps> = ({ title, onPress, icon }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            borderRadius: 50,
            width: "5%",
          }}
        >
          {icon}
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            marginLeft: 10,
            width: "90%",
          }}
        >
          {title && <ThemedText type="defaultSemiBold">{title}</ThemedText>}
        </View>
        <View
          style={{
            borderRadius: 50,
            width: "5%",
          }}
        >
          <AntDesign name="right" size={20} color={Colors.light.arrowIcon} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: "#D9D9D9",
        }}
      >
        <View
          style={{
            width: 70,
            height: 70,
            backgroundColor: "red",
            borderRadius: 50,
          }}
        >
          <Image
            source={require("../../../assets/images/icon.png")}
            style={{
              width: 70,
              height: 70,
              borderRadius: 50,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            marginLeft: 10,
            width: "70%",
          }}
        >
          <ThemedText type="defaultSemiBold">Nguyen Van A</ThemedText>
          <ThemedText>Xem thông tin cá nhân</ThemedText>
        </View>

        <View>
          <AntDesign name="right" size={20} color={Colors.light.arrowIcon} />
        </View>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 10,
        }}
      >
        <ThemedText type="heading">Quản lý căn</ThemedText>
        {/*  */}
        <ProfileTabBtn
          title="Căn hộ yêu thích"
          onPress={() => {}}
          icon={<HeartIcon />}
        />
        <ProfileTabBtn
          title="Dự án yêu thích yêu thích"
          onPress={() => {}}
          icon={<HeartIcon />}
        />
        <ProfileTabBtn
          title="Đã xem"
          onPress={() => {}}
          icon={<ViewedIcon />}
        />
        <ProfileTabBtn
          title="Danh sách ký gửi"
          onPress={() => {}}
          icon={<BuildingIcon />}
        />
        <ThemedText
          style={{
            marginTop: 10,
          }}
          type="heading"
        >
          Quản lý giao dịch và yêu cầu
        </ThemedText>
        <ProfileTabBtn
          title="Quản lý giao dịch"
          onPress={() => {}}
          icon={<TransIcon />}
        />
        <ProfileTabBtn
          title="Danh sách yêu cầu"
          onPress={() => {}}
          icon={<RequestIcon />}
        />
        <ProfileTabBtn
          title="Danh sách lịch hẹn"
          onPress={() => {}}
          icon={<CalendarIcon />}
        />
        <ThemedText
          style={{
            marginTop: 10,
          }}
          type="heading"
        >
          Liên hệ chúng tôi
        </ThemedText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#D9D9D9",
              width: 40,
              height: 40,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PhoneIcon />
          </View>
          <View
            style={{
              marginLeft: 10,
            }}
          >
            <ThemedText type="defaultSemiBold">Số điện thoại</ThemedText>
            <ThemedText
              style={{
                fontSize: 16,
              }}
              type="price"
            >
              0987654321{" "}
              <ThemedText type="default">(8:30 - 22:00 trừ Lễ Tết)</ThemedText>
            </ThemedText>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "#D9D9D9",
                width: 40,
                height: 40,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MailIcon />
            </View>
            <View
              style={{
                marginLeft: 10,
              }}
            >
              <ThemedText type="defaultSemiBold">Email</ThemedText>
              <ThemedText
                style={{
                  fontSize: 16,
                }}
                type="default"
              >
                market@fpt.vn
              </ThemedText>
            </View>
          </View>
          <TouchableOpacity
            style={{ position: "absolute", bottom: 20, right: 20 }}
          >
            <ThemedText
              type="defaultSemiBold"
              style={{
                fontSize: 16,
              }}
            >
              Đăng xuất
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}
