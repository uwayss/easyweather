// FILE: src/components/CustomSegmentedButtons.tsx
import React from "react";
import { View, Text, TouchableOpacity, ViewStyle, StyleProp } from "react-native";
import { useColorScheme } from "nativewind";
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
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? darkThemeColors : lightThemeColors;

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

        const iconColor = isActive ? theme.primary : theme.onSurface;

        return (
          <TouchableOpacity
            key={button.value}
            onPress={() => !button.disabled && onValueChange(button.value)}
            disabled={button.disabled}
            activeOpacity={0.7}
            className={`
              flex-1 items-center justify-center flex-row py-2 px-3
              ${isActive ? activeBg : inactiveBg}
              ${!isLast ? "border-r border-light-outline dark:border-dark-outline" : ""}
            `}
          >
            {button.icon && (
              <Icon
                name={button.icon} // Pass string name
                size={18}
                color={iconColor}
                style={{ marginRight: 6 }}
              />
            )}
            <Text
              className={`
                text-sm font-medium ml-1.5
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

const lightThemeColors = { primary: "#006d77", onSurface: "#1f1f1f" };
const darkThemeColors = { primary: "#83c5be", onSurface: "#e1e1e1" };

export default React.memo(CustomSegmentedButtons);
