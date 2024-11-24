import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { Apartment } from "@/model/apartments";
import { ThemedText } from "@/components/ThemedText";
import { formatArea, formatCurrency } from "@/model/other";
import AreaIcon from "@/assets/icon/details/area";
import BedIcon from "@/assets/icon/details/bedroom";
import BedIcon1 from "@/assets/icon/details/bedroom1";
import BathRoomIcon from "@/assets/icon/details/bathroom";
import LocationIcon from "@/assets/icon/details/location";
import { router } from "expo-router";
import FavIcon from "@/components/favoriteIcon/FavIcon";
import { useAuth } from "@/context/AuthContext";
import { handleInteraction } from "@/services/api/interaction";

interface ApartmentCardProps {
  data: Apartment;
}

const ApartmentCard: FC<ApartmentCardProps> = ({ data }) => {
  const { userInfo } = useAuth();
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
      }}
      onPress={async () => {
        router.push({
          pathname: "/details/[id]",
          params: { id: data.apartmentID },
        });
        await handleInteraction(data.apartmentID, userInfo?.id);
      }}
    >
      <View
        style={{
          backgroundColor: "#f5f4f8",
          borderRadius: 16,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 200,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <Image
            source={{ uri: data?.images[0]?.imageUrl }}
            style={{ width: "100%", height: 200 }}
          />
          <FavIcon
            isFav={data.userLiked}
            ApartmentId={data.apartmentID}
            style={{ position: "absolute", top: 10, right: 10 }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 8,
            paddingTop: 8,
          }}
        >
          <ThemedText type="price">{formatCurrency(data?.price)}</ThemedText>
          <View style={styles.row}>
            <AreaIcon width={16} height={16} />
            <ThemedText> {formatArea(data?.area)}</ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
            }}
          >
            <View style={styles.row}>
              <BedIcon1 width={16} height={16} />
              <ThemedText> {data?.numberOfRooms}</ThemedText>
            </View>
            <View style={styles.row}>
              <BathRoomIcon width={14} height={14} />
              <ThemedText> {data?.numberOfBathrooms}</ThemedText>
            </View>
          </View>
        </View>

        <View
          style={{
            padding: 8,
          }}
        >
          <ThemedText type="defaultSemiBold">{data?.apartmentName}</ThemedText>
          <View style={styles.row}>
            <LocationIcon width={16} height={16} />
            <ThemedText> {data?.address}</ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "red",
  },
  address: {
    fontSize: 14,
  },
  icon: {
    width: 24,
    height: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ApartmentCard;
