import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
  Image,
  Alert,
  Linking,
} from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
import { ThemedView } from "../ThemedView";
import DepositCard from "./DepositCard/DepositCard";
import { ThemedText } from "../ThemedText";
import UploadIcon from "@/assets/icon/deposit/upload";
import DeclareInput from "./input/DeclareInput";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  Camera,
} from "expo-camera";
import { Overlay } from "./input/CameraOverlay/Overlay";
import ContractIcon from "@/assets/icon/deposit/contract";
import Checkbox from "expo-checkbox";
import { Apartment } from "@/model/apartments";
import { OverlayQR } from "./input/CameraOverlay/OverlayQR";
import Button from "../button/Button";

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
  const cameraRef = useRef<CameraView | null>(null);
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
            if (photo) {
              setSelectedFrontImage(photo.uri);
            }
            closeCamera();
            return;
          }
        }
        if (!isFrontImage) {
          if (photo) {
            setSelectedBackImage(photo.uri);
          }
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
      Alert.alert("Vui lòng xác nhận đồng ý với Hợp đồng đặt cọc giữ chỗ");
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

  const handleOpenLink = async () => {
    const url =
      "https://drive.google.com/file/d/1hXUsStK3fKfYxsyP1wVwKF_kBGvrzh32/view?usp=sharing";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      console.log("Opening the link");
      await Linking.openURL(url);
    } else {
      alert("Không thể mở liên kết này!");
    }
  };

  return (
    <>
      <ThemedView
        style={{
          marginTop: 5,
          borderRadius: 10,
          position: "relative",
          paddingBottom: 200,
        }}
      >
        {/* deposit profile */}
        <View
          style={{
            margin: 5,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <DepositCard data={data} />
        </View>
        <View
          style={{
            margin: 5,
            borderRadius: 10,
            padding: 10,
            position: "relative",
          }}
        >
          <ThemedText type="defaultSemiBold">
            Quý khách vui lòng điền đầy đủ và chính xác các thông tin dưới đây
            để tiến hành đặt cọc giữ chỗ
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
              <ThemedText numberOfLines={2} type="default">
                Tôi là Cá nhân đặt cọc giữ chỗ căn hộ và đứng tên Hợp đồng đặt
                cọc giữ chỗ
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
                Tôi đặt cọc giữ chỗ hộ người khác
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
              />

              <DeclareInput
                title="Số điện thoại"
                value={phone}
                editable={true}
                onChangeText={(text) => {
                  setPhone(text);
                }}
                isNumber
              />
            </View>
          )}

          <View>
            <ThemedText type="heading">
              Xem quy chế hoạt động của hệ thống
            </ThemedText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ContractIcon />
              <TouchableOpacity onPress={handleOpenLink}>
                <ThemedText
                  style={{
                    textDecorationLine: "underline",
                  }}
                  type="defaultSemiBold"
                >
                  Quy chế hoạt động của hệ thống
                </ThemedText>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                setChecked1(!isChecked1);
              }}
              style={styles.checkBoxContainer}
            >
              <Checkbox
                value={isChecked1}
                style={styles.checkbox}
                color={isChecked1 ? "#000000" : undefined}
              />
              <ThemedText style={styles.checkBoxText}>
                Tôi đồng ý với các Điều kiện & Điều khoản của Luxuer
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setChecked2(!isChecked2);
              }}
              style={styles.checkBoxContainer}
            >
              <Checkbox
                value={isChecked2}
                style={styles.checkbox}
                color={isChecked2 ? "#000000" : undefined}
              />
              <ThemedText style={styles.checkBoxText}>
                Tôi cam kết các thông tin bên đặt cọc giữ chỗ được cung cấp tại
                đây là hoàn toàn chính xác
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setChecked3(!isChecked3);
              }}
              style={styles.checkBoxContainer}
            >
              <Checkbox
                value={isChecked3}
                style={styles.checkbox}
                color={isChecked3 ? "#000000" : undefined}
              />
              <ThemedText style={styles.checkBoxText}>
                Tôi đã đọc, hiểu rõ và xác nhận đồng ý với toàn bộ nội dung Hợp
                đồng đặt ọc trên ấp dụng tại thời điểm thanh toán đặt cọc giữ
                chỗ trên hệ thống Luxuer
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
      <ThemedView
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          right: 0,
          bottom: 100,
          padding: 10,
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
          <View style={styles.cameraContainer}>
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
          </View>
        </CameraView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f4c144",
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

  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
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
    backgroundColor: "transparent",
    // backgroundColor: "rgba(0,0,0,0.5)",
    margin: 32,
    zIndex: 100,
    top: 0,
  },
  button: {},
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  CameraContainer: {
    justifyContent: "center",
  },
  footerCamera: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    zIndex: 100,
    position: "absolute",
    bottom: 0,
    paddingBottom: 20,
    width: "100%",
  },
  cameraContainer: {
    // padding: 10,
    zIndex: 100,
    paddingBottom: 20,
    width: "100%",
    flex: 1,
    backgroundColor: "transparent",
    // opacity: 0.6,
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
});

export default DeclareInfoForm;
