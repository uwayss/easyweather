import React from "react";
import { View } from "react-native";
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
      style={[style, { backgroundColor: theme.colors.onSurfaceDisabled }]}
      className="justify-end overflow-hidden rounded-md w-1/3"
    >
      <View
        style={{ backgroundColor: color, height: `${clampedProgress * 100}%` }}
        className="w-full"
      />
    </View>
  );
};

export default React.memo(CustomVerticalProgressBar);
