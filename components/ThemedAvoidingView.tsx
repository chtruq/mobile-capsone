import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  type ViewProps,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedAvoidingViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedAvoiding({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedAvoidingViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={[{ backgroundColor }, style]} {...otherProps} />;
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
