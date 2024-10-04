import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="signin"
        options={{
          headerTitle: "Sign In",
          headerTitleStyle: { fontSize: 24 },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "Sign Up",
          headerTitleStyle: { fontSize: 24 },
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
