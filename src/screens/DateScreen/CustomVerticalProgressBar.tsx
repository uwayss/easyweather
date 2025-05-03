// FILE: src/screens/DateScreen/CustomVerticalProgressBar.tsx
import React from "react";
import { View } from "react-native";

interface CustomVerticalProgressBarProps {
  progress: number;
  color: string;
  style?: object;
  className?: string;
}

const CustomVerticalProgressBar: React.FC<CustomVerticalProgressBarProps> = ({
  progress,
  color,
  style = {},
  className = "",
}) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  return (
    <View
      style={style}
      className={
        className
          ? `justify-end overflow-hidden rounded-md w-1/3 bg-black/10 dark:bg-white/10 ${className}`
          : className
      }
    >
      <View
        style={{ backgroundColor: color, height: `${clampedProgress * 100}%` }}
        className="w-full"
      />
    </View>
  );
};

export default React.memo(CustomVerticalProgressBar);
