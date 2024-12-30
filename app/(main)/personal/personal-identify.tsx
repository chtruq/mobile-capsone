import { View, Text, StyleSheet } from "react-native";
import React from "react";

const PersonalInfo = () => {
  return (
    <View style={styles.container}>
      <Text>Xem căn cước công dân </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default PersonalInfo;
