import { Colors } from "@/constants/Colors";
import React, { FC } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

interface BottomSheetProps {
  isOpen: Animated.SharedValue<boolean>;
  toggleSheet: () => void;
  duration?: number;
  children: React.ReactNode;
}

const BottomSheet: FC<BottomSheetProps> = ({
  isOpen,
  toggleSheet,
  duration = 500,
  children,
}) => {
  const colorScheme = useColorScheme();
  const height = useSharedValue(0);
  const progress = useDerivedValue(() =>
    withTiming(isOpen.value ? 0 : 1, { duration })
  );

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * 2 * height.value }],
  }));

  const backgroundColorSheetStyle = {
    backgroundColor:
      colorScheme === "dark" ? Colors.dark.background : Colors.light.background,
  };

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpen.value
      ? 1
      : withDelay(duration, withTiming(-1, { duration: 0 })),
  }));

  return (
    <>
      <Animated.View style={[sheetStyles.backdrop, backdropStyle]}>
        <TouchableOpacity style={styles.flex} onPress={toggleSheet} />
      </Animated.View>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={[sheetStyles.sheet, sheetStyle, backgroundColorSheetStyle]}
      >
        {children}
      </Animated.View>
    </>
  );
};

const sheetStyles = StyleSheet.create({
  sheet: {
    padding: 16,
    //   paddingRight: '2rem',
    //   paddingLeft: '2rem',
    height: 600,
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 2,
    alignItems: "center",
    // justifyContent: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default BottomSheet;
