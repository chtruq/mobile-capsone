import React from "react";
import { View, StyleSheet } from "react-native";
import WebView from "react-native-webview";

const MatterportViewer = ({ modelId }: { modelId: string }) => {
  const MATTERPORT_EMBED_URL = `https://my.matterport.com/show?m=${modelId}`;

  console.log("MATTERPORT_EMBED_URL", MATTERPORT_EMBED_URL);

  return (
    <WebView
      source={{ uri: MATTERPORT_EMBED_URL }}
      // style={styles.webview}
      javaScriptEnabled
      domStorageEnabled
    />
  );
};

const styles = StyleSheet.create({
  // webview: {
  //   flex: 1,
  // },
});

export default MatterportViewer;
