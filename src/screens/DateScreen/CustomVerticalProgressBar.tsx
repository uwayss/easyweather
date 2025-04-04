import React from "react";
import { View, StyleSheet } from "react-native";

interface CustomVerticalProgressBarProps {
  progress: number;
  color: string;
  style?: object;
  trackColor?: string;
}

const DEFAULT_LIGHT_TRACK_COLOR = "rgba(0, 0, 0, 0.1)";

const CustomVerticalProgressBar: React.FC<CustomVerticalProgressBarProps> = ({
  progress,
  color,
  style = {},
  trackColor = DEFAULT_LIGHT_TRACK_COLOR,
}) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  return (
    <View style={[styles.track, style, { backgroundColor: trackColor }]}>
      <View
        style={[
          styles.fill,
          {
            backgroundColor: color,
            height: `${clampedProgress * 100}%`,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    justifyContent: "flex-end",
    overflow: "hidden",

    borderRadius: 6,
  },
  fill: {
    width: "100%",
    borderRadius: 6,
  },
});

export default React.memo(CustomVerticalProgressBar);
