import {
  View,
  Text,
  ScrollView,
  ImageSourcePropType,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Modal,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
import { ThemedView } from "../ThemedView";
import DepositCard from "./DepositCard/DepositCard";
import { ThemedText } from "../ThemedText";
import UploadIcon from "@/assets/icon/deposit/upload";
import DeclareInput from "./input/DeclareInput";
import * as ImagePicker from "expo-image-picker";
import TextRecognition from "react-native-text-recognition";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  Camera,
} from "expo-camera";
import { Overlay } from "./input/CameraOverlay/Overlay";
import QrImageReader from "react-native-qr-image-reader";
import ThemedViewSHKeyboard from "../ThemedViewSHKeyboard";
import ContractIcon from "@/assets/icon/deposit/contract";
import { center } from "@shopify/react-native-skia";
import Checkbox from "expo-checkbox";
import { Apartment } from "@/model/apartments";
import user from "@/app/accountsetup/user";
import { OverlayQR } from "./input/CameraOverlay/OverlayQR";
import { declareInfoValidationSchema } from "@/utils/validation/depositSchemas";
import { Formik, useFormik } from "formik";
import Button from "../button/Button";
import { useAuth } from "@/context/AuthContext";

interface DeclareInfoFormProps {
  onSubmitInfo: (data: any) => void;
  data: Apartment | undefined;
}

type ImageType = string | null;

const DeclareInfoForm: FC<DeclareInfoFormProps> = ({ onSubmitInfo, data }) => {
  const [selectedOption, setSelectedOption] = useState("personal");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFrontImage, setSelectedFrontImage] = useState<ImageType>(null);
  const [selectedBackImage, setSelectedBackImage] = useState<ImageType>(null);
  const [isFrontImage, setIsFrontImage] = useState(true);

  const [userInfo, setUserInfo] = useState<String>(
    // "0222222222221|283333386|Hồ Chí Trung|21092002|Nam|Ấp Chiến Thắng, Định An, Dầu Tiếng, Bình Dương|31052021"
    ""
  );
  const [errMes, setErrMes] = useState<String>("");

  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<typeof Camera | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [isInFrame, setIsInFrame] = useState(false);
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  // info from QR code
  const [scannedIdNumber, setScannedIdNumber] = useState("");
  const [scannedOldIdNumber, setScannedOldIdNumber] = useState("");
  const [scannedName, setScannedName] = useState("");
  const [scannedBirthDate, setScannedBirthDate] = useState("");
  const [scannedGender, setScannedGender] = useState("");
  const [scannedAddress, setScannedAddress] = useState("");
  const [scannedIssueDate, setScannedIssueDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string>("");

  // address
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [street, setStreet] = useState("");

  const formatDateTime = (dateString: string): string => {
    if (dateString.length !== 8) {
      throw new Error("Invalid dateString format. Expected format: DDMMYYYY");
    }

    const formattedDate = `${dateString.slice(2, 4)}/${dateString.slice(
      0,
      2
    )}/${dateString.slice(4)}`;
    return formattedDate;
  };

  useEffect(() => {
    if (userInfo) {
      const [id, idNumber, name, birthDate, gender, address, issueDate] =
        userInfo.split("|");
      setScannedIdNumber(id);
      setScannedOldIdNumber(idNumber);
      setScannedName(name);
      setScannedBirthDate(formatDateTime(birthDate));
      setScannedGender(gender);
      setScannedAddress(address);
      setScannedIssueDate(formatDateTime(issueDate));
    }
    if (scannedAddress) {
      const [str, ward, dis, pro] = scannedAddress.split(",");
      setProvince(pro);
      setDistrict(dis);
      setWard(ward);
      setStreet(str);
    }
  }, [userInfo, scannedAddress]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button handlePress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const closeCamera = () => {
    if (cameraRef.current) {
      // @ts-ignore
      cameraRef.current.stopRecording(); // Only if the camera was recording, ensure it stops
    }
    setModalVisible(false); // Close the modal
  };
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        // @ts-ignore
        const photo = await cameraRef.current.takePictureAsync();
        if (isFrontImage) {
          if (!userInfo) {
            setErrMes("Ảnh chưa hợp lệ, vui lòng chụp lại");
            // console.log("err", errMes);
            return;
          } else {
            setSelectedFrontImage(photo.uri);
            closeCamera();
            return;
          }
        }
        if (!isFrontImage) {
          setSelectedBackImage(photo.uri);
          closeCamera();
          return;
        }
        // console.log("Photo taken:", photo.uri);
      } catch (error) {
        console.log("Error taking picture:", error);
      }
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      Alert.alert("Vui lòng nhập email");
      return false;
    }
    if (!emailRegex.test(email)) {
      Alert.alert("Email không hợp lệ");
      return;
    }
    if (email.length > 50) {
      Alert.alert("Email không được quá 50 ký tự");
      return;
    }
    return true;
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    const phoneRegex2 = /^\d{11}$/;
    if (!phone) {
      Alert.alert("Vui lòng nhập số điện thoại");
      return false;
    }
    if (!phoneRegex.test(phone) && !phoneRegex2.test(phone)) {
      Alert.alert("Số điện thoại không hợp lệ");
      return;
    }
    return true;
  };

  const validation = () => {
    if (!selectedFrontImage) {
      Alert.alert("Vui lòng chụp ảnh mặt trước CCCD");
      return false;
    }
    if (!selectedBackImage) {
      Alert.alert("Vui lòng chụp ảnh mặt sau CCCD");
      return false;
    }
    if (!scannedName) {
      Alert.alert("Vui lòng chụp ảnh CCCD");
      return false;
    }
    if (!scannedIdNumber) {
      Alert.alert("Vui lòng chụp ảnh CCCD");
      return false;
    }
    if (!scannedGender) {
      Alert.alert("Vui lòng chụp ảnh CCCD");
      return false;
    }
    if (!scannedBirthDate) {
      Alert.alert("Vui lòng chụp ảnh CCCD");
      return false;
    }
    if (!scannedIssueDate) {
      Alert.alert("Vui lòng chụp ảnh CCCD");
      return false;
    }
    if (!scannedAddress) {
      Alert.alert("Vui lòng chụp ảnh CCCD");
      return false;
    }
    if (!validateEmail(email)) {
      return false;
    }
    if (!validatePhone(phone)) {
      return false;
    }
    if (!isChecked1) {
      Alert.alert("Bạn cần đồng ý với các Điều kiện & Điều khoản của Luxuer");
      return false;
    }
    if (!isChecked2) {
      Alert.alert("Vui lòng cam kết thông tin cá nhân chính xác");
      return false;
    }
    if (!isChecked3) {
      Alert.alert("Vui lòng xác nhận đồng ý với Hợp đồng đặt cọc");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validation() === false) {
      return;
    }
    onSubmitInfo({
      scannedName,
      scannedIdNumber,
      scannedGender,
      scannedBirthDate,
      scannedIssueDate,
      email,
      phone,
      scannedAddress,
      selectedFrontImage,
      selectedBackImage,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          backgroundColor: "#fff",
          // marginBottom: 100,
          marginTop: 5,
        }}
      >
        <ThemedView
          style={{
            margin: 5,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <DepositCard data={data} />
        </ThemedView>
        <ThemedView
          style={{
            margin: 5,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <ThemedText type="defaultSemiBold">
            Quý khách vui lòng điền đầy dủ và chính xác các thông tin dưới đây
            để tiến hành đặt cọc
          </ThemedText>
          <ThemedText type="heading">Thông tin khách hàng</ThemedText>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => setSelectedOption("personal")}
            >
              <View style={styles.radioButton}>
                {selectedOption === "personal" && (
                  <View style={styles.radioButtonSelected} />
                )}
              </View>
              <ThemedText
                style={{
                  width: "90%",
                }}
                type="default"
              >
                Tôi là Cá nhân đặt cọc căn hộ và đứng tên Hợp đồng đặt cọc
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => setSelectedOption("other")}
            >
              <View style={styles.radioButton}>
                {selectedOption === "other" && (
                  <View style={styles.radioButtonSelected} />
                )}
              </View>
              <ThemedText
                style={{
                  width: "90%",
                }}
              >
                Tôi đặt cọc hộ người khác
              </ThemedText>
            </TouchableOpacity>
          </View>

          <ThemedText type="heading">Giấy tờ chứng thực cá nhân</ThemedText>
          <ThemedText type="default">
            Quý khách hàng vui lòng cung cấp hình ảnh Căn cước công dân/Chứng
            mình thư nhân dân.
          </ThemedText>

          <View>
            {/* Ảnh mặt trước */}
            <View
              style={{
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#D9D9D9",
                  padding: 10,
                  borderRadius: 8,
                  marginTop: 10,
                  height: 200,
                  width: "80%",
                }}
                onPress={() => {
                  setModalVisible(true);
                  setIsFrontImage(true);
                }}
              >
                {selectedFrontImage ? (
                  <Image
                    source={{ uri: selectedFrontImage }}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <UploadIcon />
                )}
              </TouchableOpacity>
              <ThemedText type="default">Ảnh mặt trước</ThemedText>
            </View>

            {/* Ảnh mặt sau */}

            <View
              style={{
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#D9D9D9",
                  padding: 10,
                  borderRadius: 8,
                  marginTop: 10,
                  height: 200,
                  width: "80%",
                }}
                onPress={() => {
                  setModalVisible(true);
                  setIsFrontImage(false);
                }}
              >
                {selectedBackImage ? (
                  <Image
                    source={{ uri: selectedBackImage }}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <UploadIcon />
                )}
              </TouchableOpacity>
              <ThemedText type="default">Ảnh mặt sau</ThemedText>
            </View>
          </View>

          {selectedFrontImage && selectedBackImage && (
            <View>
              <ThemedText type="heading">Thông tin cá nhân</ThemedText>

              <DeclareInput
                title="Họ và tên"
                value={scannedName || ""}
                editable={false}
              />
              <DeclareInput
                title="Số giấy tờ chứng thực cá nhân"
                value={scannedIdNumber || ""}
                editable={false}
              />
              <DeclareInput
                title="Giới tính"
                value={scannedGender || ""}
                editable={false}
              />
              <DeclareInput
                title="Ngày cấp"
                value={scannedIssueDate || ""}
                editable={false}
                isDate
              />
              <DeclareInput
                title="Ngày sinh"
                value={scannedBirthDate || ""}
                editable={false}
                isDate
              />
              <DeclareInput
                title="Quốc tịch"
                value={"Việt Nam"}
                editable={false}
              />
              <ThemedText type="heading">Thông tin địa chỉ</ThemedText>
              <DeclareInput
                title="Tỉnh/Thành phố"
                value={province || ""}
                editable={false}
              />
              <DeclareInput
                title="Quận/Huyện"
                value={district || ""}
                editable={false}
              />
              <DeclareInput
                title="Phường/Xã"
                value={ward || ""}
                editable={false}
              />
              <DeclareInput
                title="Tên đường, số nhà, toà nhà"
                value={street || ""}
                editable={false}
              />
              <DeclareInput
                title="Email"
                value={email}
                editable={true}
                onChangeText={(text) => {
                  setEmail(text);
                }}
                // onBlur={handleBlur("email")}
              />

              <DeclareInput
                title="Số điện thoại"
                value={phone}
                editable={true}
                onChangeText={(text) => {
                  setPhone(text);
                }}
                // onBlur={handleBlur("phone")}
                isNumber
              />
            </View>
          )}

          <View>
            <ThemedText type="heading">Xem hợp đồng đặt cọc mẫu</ThemedText>
            <ThemedText type="default">
              Quý khách tham khảo các điều khoản Hợp Đồng đặt cọc dưới đây. Hợp
              đồng đặt cọc chính thức có giá trị pháp lý khi khách hàng xác nhận
              chuyển cọc trên hệ thống.
            </ThemedText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ContractIcon />
              <ThemedText
                style={{
                  textDecorationLine: "underline",
                }}
                type="defaultSemiBold"
              >
                Xem hợp đồng đặt cọc mẫu
              </ThemedText>
            </View>

            <Pressable
              onPress={() => {
                setChecked1(!isChecked1);
              }}
              style={styles.checkBoxContainer}
            >
              <Checkbox
                value={isChecked1}
                // onValueChange={setChecked1}
                style={styles.checkbox}
                color={isChecked1 ? "#000000" : undefined}
              />
              <ThemedText style={styles.checkBoxText}>
                Tôi đồng ý với các Điều kiện & Điều khoản của Luxuer
              </ThemedText>
            </Pressable>
            <Pressable
              onPress={() => {
                setChecked2(!isChecked2);
              }}
              style={styles.checkBoxContainer}
            >
              <Checkbox
                value={isChecked2}
                onValueChange={setChecked2}
                style={styles.checkbox}
                color={isChecked2 ? "#000000" : undefined}
              />
              <ThemedText style={styles.checkBoxText}>
                Tôi cam kết các thông tin Bên đặt cọc được cung cấp tại đây là
                hoàn toàn chính xác
              </ThemedText>
            </Pressable>
            <Pressable
              onPress={() => {
                setChecked3(!isChecked3);
              }}
              style={styles.checkBoxContainer}
            >
              <Checkbox
                value={isChecked3}
                onValueChange={setChecked3}
                style={styles.checkbox}
                color={isChecked3 ? "#000000" : undefined}
              />
              <ThemedText style={styles.checkBoxText}>
                Tôi đã đọc, hiểu rõ và xác nhận đồng ý với toàn bộ nội dung Hợp
                đồng đặt ọc trên ấp dụng tại thời điểm thanh toán đặt cọc trên
                hệ thống Luxuer
              </ThemedText>
            </Pressable>
          </View>
        </ThemedView>
      </ScrollView>
      <ThemedView
        style={{
          width: "100%",
          bottom: 0,
          height: 95,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 10,
        }}
      >
        <Button
          width={"90%"}
          title="Xác nhận thông tin"
          handlePress={() => {
            handleSubmit();
          }}
        />
      </ThemedView>

      {/* camera */}

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          closeCamera();
        }}
        style={styles.CameraContainer}
      >
        <CameraView
          onBarcodeScanned={async (data) => {
            // Xử lý khi phát hiện mã QR cho mặt trước
            if (data && isFrontImage) {
              console.log(data.data);
              const userData = data.data;
              setUserInfo(userData);
            }
          }}
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
        >
          <View style={styles.buttonContainer}>
            {!userInfo && (
              <Text style={styles.text}>
                Đưa camera lại gần mã QR trên góc phải của CCCD, Để quét thông
                tin
              </Text>
            )}
            {userInfo && (
              <Text style={styles.text}>
                Vui lòng đưa cccd vào khung bên dưới và chụp
              </Text>
            )}

            {!userInfo && <ThemedText type="red">{errMes}</ThemedText>}
          </View>
          {/* nếu quét nhưng chưa chụp thì xoá hết dữ liệu đã quét */}
          <View style={styles.footerCamera}>
            <Pressable style={styles.button} onPress={takePicture}>
              {userInfo && <Text style={styles.text}> Chụp </Text>}
            </Pressable>

            <Pressable
              style={styles.button}
              onPress={() => {
                if (userInfo && !selectedFrontImage) {
                  setUserInfo("");
                }
                closeCamera();
              }}
            >
              <Text style={styles.text}> Đóng </Text>
            </Pressable>
          </View>
          {!userInfo ? <OverlayQR /> : <Overlay />}
        </CameraView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f4c144", // Custom border color as in the image
    borderRadius: 8,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000", // Black border for radio buttons
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#000", // Black dot for the selected radio button
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalButton: {
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
  },
  buttonClose: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: "40%",
  },
  qrInfo: {
    padding: 20,
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    margin: 64,
    zIndex: 100,
  },
  button: {},
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  CameraContainer: {
    flex: 1,
    justifyContent: "center",
  },
  footerCamera: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor: "#f4c144",
    padding: 10,
    zIndex: 100,
    position: "absolute",
    bottom: 0,
    paddingBottom: 20,
    width: "100%",
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  checkBoxText: {
    width: "90%",
    marginLeft: 20,
  },
  checkbox: {
    position: "absolute",
    left: 0,
    top: 10,
    paddingRight: 10,
  },

  customCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#000",
    position: "absolute",
    left: 0,
    top: 10,
  },
  customCheckboxChecked: {
    backgroundColor: "#000",
  },
  checkmark: {
    width: "80%",
    height: "80%",
    backgroundColor: "#fff",
    margin: "10%",
  },
});

export default DeclareInfoForm;
