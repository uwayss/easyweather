// FILE: src/components/Graph/MetricButton.tsx
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "../Icon";

interface MetricButtonProps {
  label: string;
  value: string;
  isActive: boolean;
  onPress: (value: string) => void;
  icon?: string;
}

const MetricButton: React.FC<MetricButtonProps> = ({
  label,
  value,
  isActive,
  onPress,
  icon,
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
        px-3 mr-2 rounded-lg border flex-row items-center justify-center min-h-[44px]
        ${isActive ? activeBg : ""}
        ${isActive ? activeBorder : inactiveBorder}
      `}
      onPress={() => onPress(value)}
    >
      {icon && (
        <Icon
          name={icon}
          type="material"
          size={16}
          className={`mr-1.5 ${textStyle}`}
        />
      )}
      <View style={{ flexShrink: 1 }}>
        <Text className={`text-sm font-medium text-center ${textStyle}`}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(MetricButton);
