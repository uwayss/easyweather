// FILE: src/components/Icon.tsx
import {
  Feather,
  MaterialCommunityIcons as Material,
} from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import { ColorValue, StyleProp, TextProps, TextStyle } from "react-native";

import { THEME_COLORS_DARK, THEME_COLORS_LIGHT } from "../constants/colors";

interface IconProps extends TextProps {
  name: string;
  size?: number;
  color?: ColorValue;
  style?: StyleProp<TextStyle>;
  type?: "feather" | "material";
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  style,
  type = "material",
  className,
}) => {
  const IconComponent = type === "feather" ? Feather : Material;
  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === "dark"
      ? THEME_COLORS_DARK.onSurface
      : THEME_COLORS_LIGHT.onSurface;
  try {
    return (
      <IconComponent
        name={name as never}
        size={size}
        color={color || iconColor}
        style={style}
        className={`${className || ""}`}
      />
    );
  } catch (error) {
    console.error("An error occurred when rendering an Icon", error);
    return null;
  }
};

export default Icon;
