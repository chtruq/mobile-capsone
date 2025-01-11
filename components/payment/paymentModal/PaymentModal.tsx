import { View, Text, Modal, Alert } from "react-native";
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
  const [currentUrl, setCurrentUrl] = React.useState<string | null>(null);

  const handleNavigationChange = (navState: any) => {
    // if (!currentUrl) return;
    if (currentUrl?.includes("vnp_TransactionStatus=00")) {
      setPaymentModalVisible(false);
      router.back();
      Alert.alert("Thanh toán thành công");
    }
  };
  // get the current url

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={paymentModalVisible}
        onRequestClose={() => setPaymentModalVisible(false)}
        style={{ flex: 1, paddingBottom: 20 }}
      >
        <WebView
          source={{ uri: paymentUrl || "" }}
          style={{ flex: 1 }}
          onNavigationStateChange={handleNavigationChange}
          onLoadProgress={({ nativeEvent }) => {
            console.log("URL (progress):", nativeEvent.url);
            setCurrentUrl(nativeEvent.url);
          }}
        />
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
