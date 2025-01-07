import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { getDepositDetail } from "@/services/api/deposit";
import { Deposit } from "@/model/deposit";
import { ThemedText } from "@/components/ThemedText";
import ContentLoader, { Rect } from "react-content-loader/native";

const PersonalInfoSkeleton = () => (
  <View style={styles.skeletonContainer}>
    <ContentLoader
      speed={2}
      width="100%"
      height={250}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <Rect x="10%" y="20" rx="10" ry="10" width="80%" height="200" />
    </ContentLoader>
  </View>
);

const PersonalInfo = () => {
  const { depositId } = useLocalSearchParams();
  const [data, setData] = React.useState<Deposit | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchDepositDetail = async () => {
    setLoading(true);
    try {
      const res = await getDepositDetail(depositId);
      setData(res);
    } catch (error) {
      console.error("Get deposit detail API error:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDepositDetail();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="heading" style={{ fontSize: 20, marginTop: 10 }}>
        Mặt trước căn cước
      </ThemedText>
      <View style={styles.imageContainer}>
        {loading && !data ? (
          <PersonalInfoSkeleton />
        ) : (
          <Image
            source={{ uri: data?.depositProfile[0].identityCardFrontImage }}
            style={styles.image}
          />
        )}
      </View>
      <ThemedText type="heading" style={{ fontSize: 20, marginTop: 20 }}>
        Mặt sau căn cước
      </ThemedText>
      <View style={styles.imageContainer}>
        {loading && !data ? (
          <PersonalInfoSkeleton />
        ) : (
          <Image
            source={{ uri: data?.depositProfile[0].identityCardBackImage }}
            style={styles.image}
          />
        )}
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  image: {
    width: "80%",
    height: 200,
    borderRadius: 10,
  },
  skeletonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: "80%",
    height: 200,
  },
});

export default PersonalInfo;
