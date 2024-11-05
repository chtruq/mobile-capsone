import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { ThemedView } from "@/components/ThemedView";
import { getListConsignmentsByAccount } from "@/services/api/consignment";
import CircleMinusIcon from "@/assets/icon/minus";
import Button from "@/components/button/Button";
import { router } from "expo-router";

const ConsignmentList = () => {
  const [consignmentList, setConsignmentList] = React.useState([]);
  const getConsignments = async () => {
    // call api get consignments
    try {
      const res = await getListConsignmentsByAccount();
      // setConsignmentList(res.data);
      // return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getConsignments();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {!consignmentList || consignmentList.length === 0 ? (
          <>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircleMinusIcon width={35} height={35} />
              <Text>Hiện bạn chưa có căn hộ ký gửi nào</Text>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                padding: 20,
                marginHorizontal: 20,
              }}
            >
              <Button
                title="Tiến hành ký gửi"
                width={"100%"}
                handlePress={() => {
                  console.log("Tiến hành ký gửi");
                  router.push({
                    pathname: "/(main)/personal/consignment-request",
                  });
                }}
              />
            </View>
          </>
        ) : (
          consignmentList.map((consignment) => (
            // <View key={consignment.id}>
            //   <Text>{consignment.name}</Text>
            // </View>
            <></>
          ))
        )}
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ConsignmentList;
