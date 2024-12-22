import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { FC, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { handleFavorite } from "@/services/api/interaction";
import Toast from "react-native-toast-message";

interface FavIconProps {
  isFav: boolean;
  style?: any;
  ApartmentId?: string | undefined;
  refreshData?: () => void;
}
const FavIcon: FC<FavIconProps> = ({
  isFav,
  style,
  ApartmentId,
  refreshData,
}) => {
  const { userInfo } = useAuth();
  const [fav, setFav] = React.useState(isFav);

  const handleFav = async () => {
    try {
      if (ApartmentId && userInfo?.id) {
        const res = await handleFavorite(ApartmentId, isFav, userInfo?.id);
        console.log("res", res);
        if (isFav) {
          Toast.show({
            type: "success",
            text2: "Đã xóa khỏi danh sách yêu thích",
          });
        } else {
          Toast.show({
            type: "success",
            text2: "Đã thêm vào danh sách yêu thích",
          });
        }
        setFav(!isFav);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFav(isFav);
  }, [isFav]);

  return (
    <TouchableOpacity
      onPress={() => {
        handleFav();
      }}
      style={style}
    >
      {fav ? (
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={require("@/assets/images/favorite-active.png")}
        />
      ) : (
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={require("@/assets/images/favorite-inactive.png")}
        />
      )}
    </TouchableOpacity>
  );
};

export default FavIcon;
