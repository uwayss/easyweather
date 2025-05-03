// FILE: src/components/Icon.tsx
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
  const IconComponent = type === "feather" ? Feather : Material;
  try {
    return <IconComponent name={name as never} size={size} color={color} style={style} />;
  } catch (error) {
    console.error("An error occurred when rendering an Icon", error);
    return null;
  }
};

export default Icon;
