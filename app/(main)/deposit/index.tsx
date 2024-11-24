import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import DeclareActiveIcon from "@/assets/icon/deposit/declare-active";
import DeclareInactiveIcon from "@/assets/icon/deposit/declare-inactive";
import ConfirmActiveIcon from "@/assets/icon/deposit/confirm-active";
import ConfirmInactiveIcon from "@/assets/icon/deposit/confirm-inactive";
import StatusActiveIcon from "@/assets/icon/deposit/status-active";
import StatusInactiveIcon from "@/assets/icon/deposit/status-inactive";
import DeclareInfoForm from "@/components/deposit/DeclareInfoForm";
import Button from "@/components/button/Button";
import TickGreenIcon from "@/assets/icon/deposit/tick-green";
import ConfirmInfo from "@/components/deposit/ConfirmInfo";
import OrderStatus from "@/components/deposit/OrderStatus";
import { useLocalSearchParams } from "expo-router";
import { apartmentsDetail } from "@/services/api/apartments";
import { Apartment } from "@/model/apartments";
import { useAuth } from "@/context/AuthContext";
import { ScannedInfo } from "@/model/deposit";

const DepositDeclare = () => {
  const [step, setStep] = useState(0); // Track the current step
  const [formData, setFormData] = useState<ScannedInfo>(); // Store user-entered data
  const [checkValidation, setCheckValidation] = useState(false);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const [apartmentInfo, setApartmentInfo] = useState<Apartment>();
  const { userInfo } = useAuth();
  const { id } = useLocalSearchParams();

  const getApartmentInfo = async () => {
    try {
      const response = await apartmentsDetail(id?.toString());
      console.log("Apartments detail API response:", response);
      setApartmentInfo(response.data);
      return response.data;
    } catch (error) {
      console.error("Apartments detail API error:", error);
      throw error;
    }
  };

  useEffect(() => {
    getApartmentInfo();
  }, []);

  const handleFormSubmit = (data: any) => {
    setFormData({
      ...data,
      apartmentId: id,
      accountId: userInfo?.id,
    });
    nextStep();
  };

  useEffect(() => {
    console.log("Form data after setting state:", formData);
  }, [formData]);

  return (
    <>
      {/* trang thai */}
      <ThemedView
        style={{
          height: 100,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {step === 0 ? <DeclareActiveIcon /> : <TickGreenIcon />}

          <ThemedText type="deposit">Khai báo thông tin</ThemedText>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {step === 0 && <ConfirmInactiveIcon />}
          {step === 1 && <ConfirmActiveIcon />}
          {step === 2 && <TickGreenIcon />}

          <ThemedText type="deposit">Xác nhận thông tin </ThemedText>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {step === 2 ? <StatusActiveIcon /> : <StatusInactiveIcon />}

          <ThemedText type="deposit">Trạng thái đơn hàng</ThemedText>
        </View>
      </ThemedView>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 5,
        }}
      >
        {step === 0 && (
          <DeclareInfoForm
            data={apartmentInfo}
            onSubmitInfo={handleFormSubmit}
          />
        )}
        {step === 1 && (
          <ConfirmInfo
            data={formData as ScannedInfo}
            onConfirm={() => nextStep()}
            onBack={() => prevStep()}
          />
        )}
        {step === 2 && (
          <OrderStatus
            onConfirm={() => nextStep()}
            prevStep={() => prevStep()}
          />
        )}
      </View>
    </>
  );
};

export default DepositDeclare;
