import {
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  StyleProp,
  TextStyle,
  ImageSourcePropType,
  useColorScheme,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";

interface InputProps {
  placeholder?: string;
  icon?: React.ReactElement;
  fieldName?: string;
  inputStyle?: StyleProp<TextStyle>;
  value?: string;
  handleChangeText?: (text: string) => void;
  hidePassword?: boolean;
  [key: string]: any; // For any additional props
}
const Input: React.FC<InputProps> = ({
  placeholder,
  icon,
  fieldName,
  inputStyle,
  value,
  handleChangeText,
  hidePassword,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const textColor =
    colorScheme === "dark" ? Colors.dark.text : Colors.light.text;
  const border =
    colorScheme === "dark" ? Colors.dark.border : Colors.light.border;

  return (
    <ThemedView
      style={{
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor,
        borderRadius: 10,
        borderColor: border,
        borderWidth: 1,
      }}
    >
      {/* <ThemedText>{fieldName}</ThemedText> */}
      <ThemedView
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
          marginVertical: 10,
          borderRadius: 10,
          backgroundColor: backgroundColor,
          borderColor: border,
          marginHorizontal: 10,
        }}
      >
        {icon && icon}
        <TextInput
          placeholder={placeholder}
          onChangeText={handleChangeText}
          value={value}
          secureTextEntry={hidePassword && !showPassword}
          {...props}
          style={[
            {
              flex: 1,
              padding: 10,
              fontSize: 16,
              color: textColor,
            },
            inputStyle,
          ]}
        />
        {hidePassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {/* <Image
                source={
                  !showPassword ? (
                    <FontAwesome name="eye" size={24} color="black" />
                  ) : (
                    icons.eyeHide
                  )
                }
                className="w-6 h-6"
                resizeMode="contain"
              /> */}

            {!showPassword ? (
              <FontAwesome name="eye" size={20} color="gray" />
            ) : (
              <FontAwesome name="eye-slash" size={20} color="gray" />
            )}
          </TouchableOpacity>
        )}
      </ThemedView>
    </ThemedView>
  );
};

export default Input;
