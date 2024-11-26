import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { getHistoryApartment } from "@/services/api/interaction";
import { useAuth } from "@/context/AuthContext";
import { Apartment, HistoryApartments } from "@/model/apartments";
import { apartmentsDetail } from "@/services/api/apartments";
import ApartmentCard from "@/components/Search/Apartment/ApartmentCard";
import { Colors } from "@/constants/Colors";

const HistoryApartment = () => {
  const [historyApartmentID, setHistoryApartmentID] = useState<
    HistoryApartments[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [historyApartment, setHistoryApartment] = useState<Apartment[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { userInfo } = useAuth();

  useEffect(() => {
    setHistoryApartment([]);
    setLoading(true);
    if (userInfo?.id) {
      getHistoryApartment(userInfo?.id).then((res) => {
        setHistoryApartmentID(res?.data?.results);
        setLoading(false);
      });
    }
  }, []);

  const getListApartmentsByListID = async () => {
    setLoading(true);
    setHistoryApartment([]);
    historyApartmentID?.map(async (item) => {
      try {
        const res = await apartmentsDetail(item.apartmentID);
        console.log("res", res?.data);
        setHistoryApartment((prev) => [...prev, res?.data]);
      } catch (error) {
        console.log(error);
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    console.log("historyApartmentID", historyApartmentID);
    if (historyApartmentID.length > 0) {
      getListApartmentsByListID();
    }
  }, [historyApartmentID]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView
        style={{
          padding: 10,
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" color={Colors.light.primary} />
        ) : (
          <>
            {historyApartment?.map((item: Apartment) => (
              <ApartmentCard key={item.apartmentID} data={item} />
            ))}
          </>
        )}
      </ScrollView>
    </ThemedView>
  );
};

export default HistoryApartment;
