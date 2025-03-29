import React from "react";
import { View, StyleSheet } from "react-native";

interface CustomVerticalProgressBarProps {
  progress: number;
  color: string;
  style?: object;
  trackColor?: string;
}

const DEFAULT_TRACK_COLOR = "rgba(128, 128, 128, 0.2)";

const CustomVerticalProgressBar: React.FC<CustomVerticalProgressBarProps> = ({
  progress,
  color,
  style = {},
  trackColor = DEFAULT_TRACK_COLOR,
}) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  return (
    <View style={[styles.track, style, { backgroundColor: trackColor }]}>
      {/* Inner container (Fill) - height determined by progress */}
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
    width: 24,
    height: 100,
    borderRadius: 4,
  },
  fill: {
    width: "100%",
  },
});

export default React.memo(CustomVerticalProgressBar);
