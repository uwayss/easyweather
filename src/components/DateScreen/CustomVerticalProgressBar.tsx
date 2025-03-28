// FILE: src/components/DateScreen/CustomVerticalProgressBar.tsx
import React from "react";
import { View, StyleSheet } from "react-native";

interface CustomVerticalProgressBarProps {
  progress: number; // Value between 0 and 1
  color: string;
  style?: object; // Allow passing additional styles like width/height
  trackColor?: string; // Optional background color for the track
}

const DEFAULT_TRACK_COLOR = "rgba(128, 128, 128, 0.2)"; // Light gray track

const CustomVerticalProgressBar: React.FC<CustomVerticalProgressBarProps> = ({
  progress,
  color,
  style = {},
  trackColor = DEFAULT_TRACK_COLOR,
}) => {
  const clampedProgress = Math.max(0, Math.min(1, progress)); // Ensure progress is 0-1

  return (
    // Outer container (Track) - defines the bounds and background
    <View style={[styles.track, style, { backgroundColor: trackColor }]}>
      {/* Inner container (Fill) - height determined by progress */}
      <View
        style={[
          styles.fill,
          {
            backgroundColor: color,
            height: `${clampedProgress * 100}%`, // Set height as percentage
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    justifyContent: "flex-end", // Makes the fill start from the bottom
    overflow: "hidden", // Ensures fill doesn't overflow bounds
    width: 24, // Default width (can be overridden by style prop)
    height: 100, // Default height (can be overridden by style prop)
    borderRadius: 4, // Match previous styling
  },
  fill: {
    width: "100%", // Fill takes full width of the track
    // Height is set dynamically inline
  },
});

export default React.memo(CustomVerticalProgressBar); // Memoize for potential performance boost
