import React from "react";
import { View, Modal, ActivityIndicator, StyleSheet, Text } from "react-native";

interface LoadingModalProps {
  visible: boolean; // Hiển thị modal hay không
  message?: string; // Thông báo tùy chọn
}

const LoadingModal: React.FC<LoadingModalProps> = ({ visible, message }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          {message && <Text style={styles.loadingText}>{message}</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Nền tối với độ mờ
  },
  activityIndicatorContainer: {
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Nền tối cho hộp loading
    borderRadius: 10,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#ffffff", // Màu trắng cho văn bản
    fontSize: 16,
  },
});

export default LoadingModal;
