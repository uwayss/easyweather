import React from "react";
import { View, StyleSheet } from "react-native";

interface CustomVerticalProgressBarProps {
  progress: number;
  color: string;
  style?: object;
  trackColor?: string; // Added prop
}

// Define a default light track color
const DEFAULT_LIGHT_TRACK_COLOR = "rgba(0, 0, 0, 0.1)";

const CustomVerticalProgressBar: React.FC<CustomVerticalProgressBarProps> = ({
  progress,
  color,
  style = {},
  trackColor = DEFAULT_LIGHT_TRACK_COLOR, // Use the passed or default color
}) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  return (
    // Use the trackColor prop here
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
    // width: 18, // Width controlled by style prop now
    // height: 80, // Height controlled by style prop now
    borderRadius: 6, // More rounded
  },
  fill: {
    width: "100%",
    borderRadius: 6, // Match track rounding
  },
});

export default React.memo(CustomVerticalProgressBar);
