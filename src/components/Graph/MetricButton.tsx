// FILE: src/components/Graph/MetricButton.tsx
import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface MetricButtonProps {
  label: string;
  value: string;
  isActive: boolean;
  onPress: (value: string) => void;
}

const MetricButton: React.FC<MetricButtonProps> = ({ label, value, isActive, onPress }) => {
  const activeBg = "bg-light-primary/20 dark:bg-dark-primary/20";
  const activeText = "text-light-primary dark:text-dark-primary";
  const activeBorder = "border-light-primary dark:border-dark-primary";
  const inactiveBorder = "border-light-outline dark:border-dark-outline";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`
        py-1.5 px-2 mr-2 rounded-lg border
        ${isActive ? activeBg : ""}
        ${isActive ? activeBorder : inactiveBorder}
      `}
      onPress={() => onPress(value)}
    >
      <Text className={`text-sm font-medium ${isActive && activeText}`}>{label}</Text>
    </TouchableOpacity>
  );
};

// Memoize the button component
export default React.memo(MetricButton);
