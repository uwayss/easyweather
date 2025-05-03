// FILE: src/components/Icon.tsx
import { useColorScheme } from "nativewind";
import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { ColorValue } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Material from "react-native-vector-icons/MaterialCommunityIcons";

interface IconProps {
  name: string;
  size?: number;
  color?: ColorValue;
  style?: StyleProp<TextStyle>;
  type?: "feather" | "material";
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color, style, type = "material" }) => {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? darkThemeColors : lightThemeColors;
  const iconColor = theme.onSurface;

  const IconComponent = type === "feather" ? Feather : Material;
  try {
    return (
      <IconComponent name={name as never} size={size} color={color || iconColor} style={style} />
    );
  } catch (error) {
    console.error("An error occurred when rendering an Icon", error);
    return null;
  }
};
const lightThemeColors = { primary: "#006d77", onSurface: "#1f1f1f" };
const darkThemeColors = { primary: "#83c5be", onSurface: "#e1e1e1" };

export default Icon;
