// FILE: src/components/CustomSegmentedButtons.tsx
import React from "react";
import { View, Text, TouchableOpacity, ViewStyle, StyleProp } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // Import vector icon component
import { useColorScheme } from "nativewind"; // Import useColorScheme

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
  const theme = colorScheme === "dark" ? darkThemeColors : lightThemeColors; // Get theme colors

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

        const iconColor = isActive ? theme.primary : theme.onSurface; // Determine icon color

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
              // Use MaterialCommunityIcons
              <MaterialCommunityIcons
                name={button.icon}
                size={18}
                color={iconColor} // Apply determined color
                style={{ marginRight: 6 }} // Add margin if needed (ml-1.5 on Text already exists)
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

// Temporary theme objects needed for iconColor logic
const lightThemeColors = { primary: "#006d77", onSurface: "#1f1f1f" };
const darkThemeColors = { primary: "#83c5be", onSurface: "#e1e1e1" };

export default React.memo(CustomSegmentedButtons);
