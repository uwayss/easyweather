// FILE: src/components/CustomSegmentedButtons.tsx
import React from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import Icon from "./Icon";

interface SegmentButtonOption {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

interface CustomSegmentedButtonsProps {
  buttons: SegmentButtonOption[];
  value: string;
  onValueChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

const CustomSegmentedButtons: React.FC<CustomSegmentedButtonsProps> = ({
  buttons,
  value,
  onValueChange,
  style,
}) => {
  return (
    <View
      style={style}
      className="flex-row overflow-hidden rounded-full border border-light-outline dark:border-dark-outline"
    >
      {buttons.map((button, index) => {
        const isActive = button.value === value;
        const isLast = index === buttons.length - 1;

        const activeBg = "bg-light-primary/20 dark:bg-dark-primary/20";
        const inactiveBg = "bg-transparent";

        const activeText = "text-light-primary dark:text-dark-primary";
        const inactiveText = "text-light-onSurface dark:text-dark-onSurface";

        return (
          <TouchableOpacity
            key={button.value}
            onPress={() => !button.disabled && onValueChange(button.value)}
            disabled={button.disabled}
            activeOpacity={0.7}
            className={`
              flex-1 items-center justify-center flex-row py-2 px-3
              ${isActive ? activeBg : inactiveBg}
              ${
                !isLast
                  ? "border-r border-light-outline dark:border-dark-outline"
                  : ""
              }
            `}
          >
            {button.icon && (
              <Icon
                name={button.icon}
                size={18}
                className={`mr-1.5 ${isActive ? activeText : inactiveText} ${
                  button.disabled ? "opacity-50" : ""
                }`}
              />
            )}
            <Text
              className={`
                text-sm font-medium
                ${isActive ? activeText : inactiveText}
                ${button.disabled ? "opacity-50" : ""}
              `}
              numberOfLines={1}
            >
              {button.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default React.memo(CustomSegmentedButtons);
