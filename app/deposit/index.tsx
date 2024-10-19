import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import DeclareActiveIcon from "@/assets/icon/deposit/declare-active";
import DeclareInactiveIcon from "@/assets/icon/deposit/declare-inactive";
import ConfirmActiveIcon from "@/assets/icon/deposit/confirm-active";
import ConfirmInactiveIcon from "@/assets/icon/deposit/confirm-inactive";
import StatusActiveIcon from "@/assets/icon/deposit/status-active";
import StatusInactiveIcon from "@/assets/icon/deposit/status-inactive";
import DeclareInfoForm from "@/components/deposit/DeclareInfoForm";

const DepositDeclare = () => {
  const [step, setStep] = useState(0); // Track the current step
  const [formData, setFormData] = useState({}); // Store user-entered data

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const apartmentInfo = {
    name: "Căn hộ view sông Sài Gòn, view grand park 81 hướng ban công tây nam đầy đủ nội thất  2 phòng ngủ 2 phòng tắm",
    price: 22300000000,
    image: require("@/assets/images/home/home.png"),
    depositPrice: 50000000,
    tax: 0,
    quantity: 1,
    totalPrice: 50000000,
  };

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
            step === 0 ? <DeclareActiveIcon /> : <DeclareInactiveIcon />
          }

          <ThemedText type="deposit">Khai báo thông tin</ThemedText>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {
            // Show the active icon when the step is 1
            step === 1 ? <ConfirmActiveIcon /> : <ConfirmInactiveIcon />
          }

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
      <ScrollView>
        {step === 0 && (
          <DeclareInfoForm
            data={apartmentInfo}
            // onSubmit={(data) => {
            //   setFormData(data);
            //   nextStep();
            // }}
          />
          // <>
          //   <View>
          //     <Text>1</Text>
          //   </View>
          // </>
        )}
        {step === 1 && (
          // <ConfirmInfo
          //   data={formData}
          //   onConfirm={() => nextStep()}
          //   onBack={() => prevStep()}
          // />
          <>
            <View>
              <Text>2</Text>
            </View>
          </>
        )}
        {step === 2 && (
          //  <OrderStatus data={formData} />
          <>
            <View>
              <Text>3</Text>
            </View>
          </>
        )}
      </ScrollView>
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          height: 95,
          backgroundColor: "#fff",
        }}
      >
        <ThemedText>button here</ThemedText>
      </View>
    </View>
  );
};

export default DepositDeclare;
