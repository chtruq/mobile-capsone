import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import BuyIcon from "@/assets/icon/search/BuyIcon";
import SearchModal from "@/components/Search/SearchModal";
import SearchBottomSheet from "@/components/Search/SearchBottomSheet";
import { useSharedValue } from "react-native-reanimated";
import AparmentIcon from "@/assets/icon/search/AparmentIcon";
import { ThemedText } from "@/components/ThemedText";
import ApartmentSearch from "@/components/Search/ApartmentSearch";
import ProjectSearch from "@/components/Search/ProjectSearch";

const Search = () => {
  const [search, setSearch] = React.useState("");
  const isOpen1 = useSharedValue(false);
  const isOpen2 = useSharedValue(false);
  const [ApartmentData, setApartmentData] = React.useState([]);
  const [ProjectData, setProjectData] = React.useState([]);
  const toggleSheet1 = () => {
    isOpen1.value = !isOpen1.value;
  };
  const toggleSheet2 = () => {
    isOpen2.value = !isOpen2.value;
  };

  const [searchType, setSearchType] = React.useState<string>("");

  const handleSearchType = (type: string) => {
    setSearchType(type);
  };

  const handleSearch = () => {
    if (searchType === "Dự án") {
      // call api project
    } else {
      // call api apartment
    }
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <SafeAreaView>
            <SearchModal
              placeholder={
                searchType === "Dự án" ? "Tìm kiếm dự án" : `Tìm kiếm căn hộ `
              }
              value={search}
              isOpen={isOpen1}
              toggleSheet={toggleSheet1}
              onChangeText={() => {
                setSearch(search);
              }}
              searchType={searchType}
            />
            {/* {searchType === "" && (
              <View>
                <TouchableOpacity onPress={toggleSheet1}>
                  <Text>Chọn loại tìm kiếm</Text>
                </TouchableOpacity>
              </View>
            )} */}

            {searchType === "Dự án" ? (
              <ProjectSearch
              // data={ProjectData}
              />
            ) : (
              <ApartmentSearch searchQuery={search} data={ApartmentData} />
            )}
          </SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {/* initial modal */}
      <SearchBottomSheet isOpen={isOpen1} toggleSheet={toggleSheet1}>
        <View
          style={{
            padding: 16,
            borderRadius: 16,
            gap: 16,
          }}
        >
          <TouchableOpacity
            style={styles.modalSearchType}
            onPress={() => {
              handleSearchType("Dự án");
              toggleSheet1();
            }}
          >
            <AparmentIcon />
            <ThemedText>Dự án </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalSearchType}
            onPress={() => {
              handleSearchType("Mua căn hộ");
              toggleSheet1();
            }}
          >
            <BuyIcon width="18" height="20" />
            <ThemedText>Mua căn hộ </ThemedText>
          </TouchableOpacity>
        </View>
      </SearchBottomSheet>
      <SearchBottomSheet isOpen={isOpen2} toggleSheet={toggleSheet2}>
        <></>
      </SearchBottomSheet>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalSearchType: {
    flexDirection: "row",
    fontSize: 16,
    width: "100%",
  },
});

export default Search;
