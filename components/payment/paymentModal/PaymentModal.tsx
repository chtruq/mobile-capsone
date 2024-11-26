import { View, Text, Modal } from "react-native";
import React from "react";
import WebView from "react-native-webview";
import { Button } from "react-native";
import { router } from "expo-router";

interface PaymentModalProps {
  paymentModalVisible: boolean;
  setPaymentModalVisible: (visible: boolean) => void;
  paymentUrl: string;
}

const PaymentModal = ({
  paymentModalVisible,
  setPaymentModalVisible,
  paymentUrl,
}: PaymentModalProps) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={paymentModalVisible}
        onRequestClose={() => setPaymentModalVisible(false)}
        style={{ flex: 1, paddingBottom: 20 }}
      >
        <WebView source={{ uri: paymentUrl || "" }} style={{ flex: 1 }} />
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <Button
            title="Đóng"
            onPress={() => {
              setPaymentModalVisible(false);
              router.back();
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default PaymentModal;
