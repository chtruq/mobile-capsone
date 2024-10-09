import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";

const ThemedViewSHKeyboard = (props: React.PropsWithChildren<{}>) => {
  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          {props.children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ThemedView>
  );
};

export default ThemedViewSHKeyboard;
