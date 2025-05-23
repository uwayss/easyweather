// FILE: src/components/Graph/MetricButton.tsx
import React from "react";
import { Text, TouchableOpacity } from "react-native";
// Icon import removed as it's no longer used

interface MetricButtonProps {
  label: string;
  value: string;
  isActive: boolean;
  onPress: (value: string) => void;
  // icon prop removed
}

const MetricButton: React.FC<MetricButtonProps> = ({
  label,
  value,
  isActive,
  onPress,
}) => {
  const activeBg = "bg-light-primary/20 dark:bg-dark-primary/20";
  const activeTextClass = "text-light-primary dark:text-dark-primary";
  const inactiveTextClass = "text-light-onSurface dark:text-dark-onSurface";
  const activeBorder = "border-light-primary dark:border-dark-primary";
  const inactiveBorder = "border-light-outline dark:border-dark-outline";

  const textStyle = isActive ? activeTextClass : inactiveTextClass;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`
        py-1.5 px-3 mr-2 rounded-lg border flex-row items-center 
        ${isActive ? activeBg : ""}
        ${isActive ? activeBorder : inactiveBorder}
      `}
      onPress={() => onPress(value)}
    >
      {/* Icon rendering removed */}
      <Text className={`text-sm font-medium ${textStyle}`}>{label}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(MetricButton);
