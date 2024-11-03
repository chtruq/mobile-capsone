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
    <View
      style={{
        flex: 1,
        backgroundColor: "#ccc",
        // marginBottom: 20,
        paddingBottom: 100,
      }}
    >
      {/* trang thai */}
      <ThemedView
        style={{
          height: "15%",
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
          {
            // Show the active icon when the step is 0
            step === 0 ? <DeclareActiveIcon /> : <TickGreenIcon />
          }

          <ThemedText type="deposit">Khai báo thông tin</ThemedText>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {step === 0 && <ConfirmInactiveIcon />}
          {
            // Show the active icon when the step is 1
            step === 1 && <ConfirmActiveIcon />
          }
          {step === 2 && <TickGreenIcon />}

          <ThemedText type="deposit">Xác nhận thông tin </ThemedText>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {
            // Show the active icon when the step is 2
            step === 2 ? <StatusActiveIcon /> : <StatusInactiveIcon />
          }

          <ThemedText type="deposit">Trạng thái đơn hàng</ThemedText>
        </View>
      </ThemedView>
      <View>
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
          // <>
          //   <View>
          //     <Text>3</Text>
          //   </View>
          // </>
        )}
      </View>
      {/* <ThemedView
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          height: 95,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {step === 0 ? (
          <Button
            width={"90%"}
            title="Xác nhận thông tin"
            handlePress={() => {
              handleFormSubmit(formData);
            }}
          />
        ) : step === 1 ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <Button
              width={"30%"}
              title="Quay lại"
              handlePress={() => prevStep()}
              backgroundColor="#fff"
              textColor="#000"
              isBack
            />
            <Button
              width={"60%"}
              title="Xác nhận yêu cầu"
              handlePress={() => nextStep()}
            />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <Button
              width={"30%"}
              title="Quay lại"
              handlePress={() => prevStep()}
              backgroundColor="#fff"
              textColor="#000"
              isBack
            />
            <Button
              width={"60%"}
              title="Tiến hành chuyển khoản"
              handlePress={() => nextStep()}
            />
          </View>
        )}
      </ThemedView> */}
    </View>
  );
};

export default DepositDeclare;
