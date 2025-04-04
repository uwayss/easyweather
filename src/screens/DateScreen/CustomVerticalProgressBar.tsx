import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

interface CustomVerticalProgressBarProps {
  progress: number;
  color: string;
  style?: object;
  trackColor?: string;
}

const CustomVerticalProgressBar: React.FC<CustomVerticalProgressBarProps> = ({
  progress,
  color,
  style = {},
}) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const theme = useTheme();
  return (
    <View
      style={[
        styles.track,
        style,
        { backgroundColor: theme.colors.onSurfaceDisabled, width: "35%" },
      ]}
    >
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
  },
});

export default React.memo(CustomVerticalProgressBar);
