import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "price"
    | "red"
    | "heading"
    | "deposit"
    | "small"
    | "success";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const colorName = type === "title" ? "title" : "text";
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorName
  );

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "price" ? styles.price : undefined,
        type === "red" ? styles.red : undefined,
        type === "heading" ? styles.heading : undefined,
        type === "deposit" ? styles.deposit : undefined,
        type === "small" ? styles.small : undefined,
        type === "success" ? styles.success : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#C48C37",
  },
  red: {
    fontSize: 20,
    fontWeight: "400",
    color: "#FF4040",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 28,
    color: "#252B5C",
  },
  deposit: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 24,
    color: "#000",
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    color: "#A1A5C1",
  },
  success: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    color: "#8BC83F",
  },
});
