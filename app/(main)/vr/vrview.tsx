import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import React, { useState } from "react";
import WebView from "react-native-webview";
import { useLocalSearchParams } from "expo-router";
import { apartmentsDetail } from "@/services/api/apartments";
import { Apartment, VrVideoUrls } from "@/model/apartments";
import { AntDesign } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";

const VRModal = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = React.useState<Apartment>();
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [listVisible, setListVisible] = useState(true); // Trạng thái ẩn/hiện danh sách
  const translateY = React.useRef(new Animated.Value(0)).current; // Animation cho danh sách

  const getApartmentDetails = async () => {
    try {
      const res = await apartmentsDetail(id);
      setData(res.data);
      // Mặc định chọn ảnh đầu tiên
      if (res.data?.vrVideoUrls && res.data.vrVideoUrls.length > 0) {
        setSelectedImage(res.data.vrVideoUrls[0].videoUrl);
      }
    } catch (error) {
      console.error("Error getting apartment details:", error);
    }
  };

  React.useEffect(() => {
    getApartmentDetails();
  }, []);

  if (!data?.vrVideoUrls || data?.vrVideoUrls.length === 0) {
    return (
      <Text>
        Không tìm thấy hình ảnh panorama. Vui lòng kiểm tra dữ liệu được truyền.
      </Text>
    );
  }

  const toggleList = () => {
    Animated.timing(translateY, {
      toValue: listVisible ? 200 : 0, // Chuyển đổi giữa ẩn và hiện
      duration: 300,
      useNativeDriver: true,
    }).start();
    setListVisible(!listVisible); // Cập nhật trạng thái ẩn/hiện
  };

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A simple example</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"/>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script>
    <style>
    #panorama {
        height: 90vh;
    }
    </style>
  </head>
  <body>
    <div id="panorama"></div>
    <script>
      pannellum.viewer('panorama', {
        type: 'equirectangular',
        panorama: '${selectedImage}',
        autoLoad: true
      });
    </script>
  </body>
  </html>
`;

  const renderImageItem = ({
    item,
    index,
  }: {
    item: VrVideoUrls;
    index: number;
  }) => (
    <TouchableOpacity
      style={[
        styles.imageButton,
        selectedImage === item.videoUrl && styles.selectedImageButton,
      ]}
      onPress={() => setSelectedImage(item.videoUrl)}
    >
      <Image
        source={{ uri: item.videoUrl }}
        style={{ width: 100, height: 100, borderRadius: 5 }}
      />
      <ThemedText style={styles.imageButtonText}>
        {" "}
        {item.description ? item.description : "Ảnh" + " " + index}{" "}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* WebView hiển thị ảnh panorama */}
      <WebView
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={{ flex: 1 }}
      />
      {/* Nút toggle danh sách */}
      <TouchableOpacity
        style={!listVisible ? styles.toggleButtonHide : styles.toggleButtonShow}
        onPress={toggleList}
      >
        <Text style={styles.toggleButtonText}>
          {listVisible ? (
            <AntDesign name="down" size={24} color="black" />
          ) : (
            <AntDesign name="up" size={24} color="black" />
          )}
        </Text>
      </TouchableOpacity>
      {/* Danh sách hình ảnh */}
      <Animated.View
        style={[
          styles.imageListContainer,
          { transform: [{ translateY: translateY }] },
        ]}
      >
        <FlatList
          data={data?.vrVideoUrls.map((item) => item) || []}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => `${item.vrExperienceID}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleButtonHide: {
    position: "absolute",
    left: 20,
    bottom: 80,
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    zIndex: 2,
  },
  toggleButtonShow: {
    position: "absolute",
    left: 20,
    bottom: 210,
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    zIndex: 2,
  },
  toggleButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  imageListContainer: {
    backgroundColor: "#f0f0f0",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 5,
    position: "absolute",
    bottom: 20,
    width: "100%",
    height: 200,
  },
  imageButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  selectedImageButton: {
    borderColor: "#007bff",
    borderWidth: 2,
  },
  imageButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default VRModal;
