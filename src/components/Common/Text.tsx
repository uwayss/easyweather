import { Text as NativeText, TextProps as NativeTextProps } from "react-native";
import React from "react";

interface TextProps extends NativeTextProps {
  children: React.ReactNode;
  className?: string;
  passive?: boolean;
  invertColors?: boolean;
}

export default function Text({ children, className, passive, invertColors, ...props }: TextProps) {
  const colorStyle = invertColors
    ? "text-dark-onSurface dark:text-light-onSurface"
    : "text-light-onSurface dark:text-dark-onSurface";
  const sizeStyle = passive ? "opacity-80 text-sm" : "";
  return (
    <NativeText className={`${colorStyle} ${sizeStyle} ${className}`} {...props}>
      {children}
    </NativeText>
  );
}
