import { View, Text, Image } from "react-native";
import React, { FC, useEffect } from "react";
import { Apartment } from "@/model/apartments";
import { apartmentsDetail } from "@/services/api/apartments";
import { ThemedText } from "../ThemedText";

interface ApartmentTransCardProps {
  id: Apartment["apartmentID"];
}

const ApartmentTransCard: FC<ApartmentTransCardProps> = ({ id }) => {
  const [apartmentDetail, setApartmentDetail] = React.useState<Apartment>();
  const getApartmentDetail = async () => {
    try {
      const response = await apartmentsDetail(id);
      setApartmentDetail(response.data);
      return response.data;
    } catch (error) {
      console.error("Get apartment detail API error:", error);
      throw error;
    }
  };

  useEffect(() => {
    getApartmentDetail();
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 10,
        marginVertical: 10,
      }}
    >
      <Image
        source={{
          uri: apartmentDetail?.images[0]?.imageUrl,
        }}
        style={{
          width: 100,
          height: 100,
          marginBottom: 10,
          borderRadius: 20,
        }}
      />
      <View
        style={{
          marginLeft: 10,
          justifyContent: "center",
        }}
      >
        <ThemedText type="defaultSemiBold">
          {apartmentDetail?.apartmentName}
        </ThemedText>
        <ThemedText type="default">
          Địa chỉ: {apartmentDetail?.address}
        </ThemedText>
      </View>
    </View>
  );
};

export default ApartmentTransCard;
