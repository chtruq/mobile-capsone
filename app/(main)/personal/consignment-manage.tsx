import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { ThemedView } from "@/components/ThemedView";
import { getListConsignmentsByAccount } from "@/services/api/consignment";

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
      <ScrollView>
        <Text>Consignment List</Text>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ConsignmentList;
