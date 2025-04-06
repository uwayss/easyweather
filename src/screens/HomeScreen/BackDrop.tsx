import { BottomSheetBackdropProps, useBottomSheet } from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import React from "react";
import { StyleSheet } from "react-native";
export const Backdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  const { close } = useBottomSheet();

  const containerAnimatedStyle = useAnimatedStyle(() => {
    "worklet";
    const isHidden = animatedIndex.value === -1;

    return {
      opacity: interpolate(animatedIndex.value, [-1, 0], [0, 0.75], Extrapolation.CLAMP),
      backgroundColor: "rgba(0,0,0,0.4)",
      backfaceVisibility: "hidden",
      pointerEvents: isHidden ? "none" : "auto",
      display: isHidden ? "none" : "flex",
    };
  });

  const containerStyle = useMemo(
    () => [
      style,
      {
        flex: 1,
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  const closeSheet = () => {
    close();
  };

  const backdropTap = Gesture.Tap().maxDuration(100000).onEnd(closeSheet).runOnJS(true);

  return (
    <GestureDetector gesture={backdropTap}>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={[containerStyle, styles.backdrop, style]}
      />
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    height: "100%",
    width: "100%",
  },
});
