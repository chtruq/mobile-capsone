import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { router, useLocalSearchParams } from "expo-router";
import { apartmentsDetail, getProjectCart } from "@/services/api/apartments";
import { Apartment } from "@/model/apartments";
import { ThemedText } from "@/components/ThemedText";
import { formatCurrency } from "@/model/other";
import Button from "@/components/button/Button";
import Search from "../(tabs)/(search)";
import { AntDesign } from "@expo/vector-icons";
import { getCurrentSetting } from "@/services/api/setting";
import { sendTradeRequest } from "@/services/api/deposit";

const PickTradeApartment = () => {
  const { apartmentId } = useLocalSearchParams();
  console.log(apartmentId);
  const { depositId } = useLocalSearchParams();
  console.log("depositId", depositId);
  const [apartmentDetails, setApartmentDetails] = useState<Apartment>();
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectApartments, setProjectApartments] = useState<Apartment[]>([]);
  const [selectedApartment, setSelectedApartment] = useState<string>();
  const [procedureFee, setProcedureFee] = useState<number>();
  const [refreshing, setRefreshing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const getApartmentDetails = async () => {
    try {
      const response = await apartmentsDetail(apartmentId);
      setApartmentDetails(response?.data);
      setProjectId(response?.data?.projectApartmentID);
      console.log("projectId", response?.data?.projectApartmentID);
      console.log("details", response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApartmentDetails();
  }, []);

  const getListProjectApartments = async (search?: string) => {
    if (projectId) {
      try {
        const res = await getProjectCart(projectId, search);

        console.log("projectApartments", res?.data?.apartments);
        const projectApartmentsList: Apartment[] = res?.data?.apartments || [];
        //i want to compare the price of this list with the price of the apartmentDetails (if the price of project is equal or more than the apartmentDetails then save it to the projectApartments) then save it to the projectApartments
        const filteredApartments = projectApartmentsList.filter(
          (apartment) =>
            apartmentDetails?.price !== undefined &&
            apartment.price >= apartmentDetails.price &&
            apartment.apartmentID !== apartmentDetails.apartmentID
        );
        // console.log("filteredApartments", filteredApartments);

        setProjectApartments(filteredApartments);
        console.log("projectApartments", projectApartments);
      } catch (error) {
        console.log(error);
        Alert.alert("Lỗi", "Không thể lấy danh sách căn hộ");
      }
    }
  };

  const getCurrentProcedureFee = async () => {
    try {
      const res = await getCurrentSetting();
      setProcedureFee(res?.procedureFee);
      console.log("procedureFee", res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListProjectApartments();
    getCurrentProcedureFee();
  }, [projectId]);

  // console.log("projectApartments", projectApartments);

  const onRefresh = async () => {
    setRefreshing(true);
    await getListProjectApartments();
    setRefreshing(false);
  };

  const handleTradeRequest = async (
    depositId: string,
    newApartmentCode: string
  ) => {
    try {
      const res = await sendTradeRequest(depositId, newApartmentCode);
      router.push("/personal/trade-request-success");
      return res;
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Lỗi",
        "Có lỗi xảy ra trong quá trình yêu cầu trao đổi căn hộ!!!"
      );
    } finally {
      setOpenModal(false);
      setSelectedApartment(undefined);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
            }}
          >
            <ThemedView
              style={{
                flex: 1,
                paddingBottom: 100,
              }}
            >
              {/* <ThemedText>Căn hộ hiện tại của bạn</ThemedText> */}
              <View>
                <ThemedText
                  style={{
                    marginLeft: 10,
                  }}
                  type="defaultSemiBold"
                >
                  Căn hộ hiện tại của bạn
                </ThemedText>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: "#000",
                    margin: 10,
                  }}
                >
                  <Image
                    source={{ uri: apartmentDetails?.images[0]?.imageUrl }}
                    style={{ width: 100, height: 100 }}
                  />
                  <View>
                    <ThemedText>{apartmentDetails?.apartmentName}</ThemedText>
                    <ThemedText>Địa chỉ:{apartmentDetails?.address}</ThemedText>
                    <ThemedText>
                      Giá trị:{formatCurrency(apartmentDetails?.price)}
                    </ThemedText>
                    <ThemedText>
                      Đã thanh toán:{" "}
                      {formatCurrency(apartmentDetails?.depositAmount)}
                    </ThemedText>
                  </View>
                </View>
              </View>

              <ThemedText
                style={{
                  marginLeft: 10,
                }}
                type="defaultSemiBold"
              >
                Căn hộ khác bạn có thể trao đổi
              </ThemedText>

              <View
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "#000",
                  margin: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TextInput
                  onChangeText={(text) => setSearch(text)}
                  style={{ padding: 10, width: "80%" }}
                  placeholder="Tìm kiếm"
                />
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    console.log("search", search);
                    getListProjectApartments(search);
                  }}
                >
                  <AntDesign name="search1" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <FlatList
                data={projectApartments}
                keyExtractor={(item) => item.apartmentID}
                renderItem={({ item }) => {
                  const neededDepositAmount: number =
                    item.depositAmount && apartmentDetails?.depositAmount
                      ? item.depositAmount -
                        (apartmentDetails?.depositAmount ?? 0)
                      : 0;
                  console.log("item", item?.depositAmount);
                  console.log("neededDepositAmount", neededDepositAmount);

                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedApartment(item.apartmentCode);
                        console.log("selectedApartment", selectedApartment);
                      }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor:
                          selectedApartment === item.apartmentCode
                            ? "#00f"
                            : "#000", // Change border color when selected
                        backgroundColor:
                          selectedApartment === item.apartmentCode
                            ? "#e0e0e0"
                            : "#fff", // Change background color when selected
                        margin: 10,
                      }}
                    >
                      <Image
                        source={{ uri: item.images[0]?.imageUrl }}
                        style={{ width: 100, height: 100 }}
                      />
                      <View style={{ width: "60%" }}>
                        <ThemedText type="default" numberOfLines={1}>
                          {item.apartmentName}
                        </ThemedText>
                        <ThemedText numberOfLines={1} lineBreakMode="tail">
                          Địa chỉ: {item.address}
                        </ThemedText>
                        <ThemedText>
                          Giá trị: {formatCurrency(item.price)}
                        </ThemedText>
                        <ThemedText>
                          Thanh toán thêm giá trị đặt cọc giữ chỗ:{" "}
                          {item?.depositAmount
                            ? formatCurrency(
                                neededDepositAmount > 0
                                  ? neededDepositAmount
                                  : 0
                              )
                            : "Liên hệ"}
                        </ThemedText>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                refreshing={refreshing}
                onRefresh={onRefresh}
                ListEmptyComponent={
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 10,
                    }}
                  >
                    <ThemedText>
                      Hiện không có căn hộ nào khác để trao đổi !!
                    </ThemedText>
                  </View>
                }

                // ListFooterComponent={
                //   <View>
                //     <ThemedText>Căn hộ khác bạn có thể trao đổi</ThemedText>
                //   </View>
                // }
              />

              {/* {projectApartments.length > 0 && ( */}

              {/* )} */}
            </ThemedView>
            <ThemedView
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                height: 100,
                borderTopWidth: 1,
                borderTopColor: "#000",
              }}
            >
              {selectedApartment ? (
                <Button
                  title="Chọn"
                  handlePress={() => {
                    console.log("selectedApartment", selectedApartment);
                    setOpenModal(true);
                  }}
                />
              ) : (
                <>
                  <ThemedText>Vui lòng chọn căn hộ để trao đổi</ThemedText>
                </>
              )}
            </ThemedView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* confirmation modal */}
      <Modal
        visible={openModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setOpenModal(false);
        }}
      >
        <ThemedView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <ThemedView
            style={{
              backgroundColor: "#fff",
              width: "80%",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <ThemedText
              style={{
                textAlign: "center",
              }}
              type="defaultSemiBold"
            >
              Bạn có chắc chắn muốn gửi yêu cầu trao đổi căn hộ này không?
            </ThemedText>
            <ThemedText
              style={{
                textAlign: "center",
              }}
            >
              Khi yêu cầu trao đổi được xác nhận, ngoài khoản tiền cần phải
              thanh toán thêm cho việc đặt cọc giữ chỗ, bạn cần phải thanh toán
              thêm phí thủ tục cho hệ thống
            </ThemedText>
            <ThemedText
              style={{
                textAlign: "center",
              }}
              type="default"
            >
              Phí thủ tục:{" "}
              <ThemedText type="price">
                {formatCurrency(procedureFee)}
              </ThemedText>
            </ThemedText>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setOpenModal(false);
                }}
              >
                <ThemedText
                  style={{
                    color: "red",
                    padding: 10,
                  }}
                >
                  Hủy
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleTradeRequest(
                    depositId as string,
                    selectedApartment as string
                  );
                }}
                style={{
                  backgroundColor: "green",
                  borderRadius: 10,
                }}
              >
                <ThemedText
                  style={{
                    color: "#fff",
                    padding: 10,
                  }}
                >
                  Đồng ý
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </ThemedView>
      </Modal>
    </>
  );
};

export default PickTradeApartment;
