import { useColorScheme } from "nativewind";
import React, { useEffect } from "react";
import { DimensionValue, StyleProp, ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface SkeletonProps {
  height?: DimensionValue;
  width?: DimensionValue;
  style?: StyleProp<ViewStyle>;
  className?: string;
  children?: React.ReactNode;
}

const Skeleton: React.FC<SkeletonProps> = ({
  height,
  width,
  style,
  className = "",
  children,
}) => {
  const { colorScheme } = useColorScheme();
  const progress = useSharedValue(0.5);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
    };
  });

  const baseColor =
    colorScheme === "dark"
      ? "bg-dark-surfaceVariant"
      : "bg-light-surfaceVariant";

  return (
    <Animated.View
      style={[{ height, width }, animatedStyle, style]}
      className={`${baseColor} ${className}`}
    >
      {children}
    </Animated.View>
  );
};

export default Skeleton;
