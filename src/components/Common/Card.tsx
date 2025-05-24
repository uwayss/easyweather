// FILE: src/components/Common/Card.tsx
import { Image as ExpoImage, ImageSource } from "expo-image";
import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
  elevated?: boolean;
  background?: ImageSource;
  borderType?: "default" | "thin" | "hidden";
}

export default function Card({
  children,
  className,
  elevated,
  borderType = "default",
  background,
  ...props
}: CardProps) {
  const cardBaseStyle = "overflow-hidden rounded-xl";
  const elevationStyle = elevated
    ? `bg-light-outline/35 dark:bg-dark-outline/45`
    : "";
  let borderStyle =
    "border-light-outline dark:border-dark-outline border-b-2 border-r-2 border-t-hairline border-l-hairline";
  if (borderType === "thin") {
    borderStyle =
      "border-light-outline dark:border-dark-outline border-b-hairline border-r-hairline";
  } else if (borderType === "hidden") {
    borderStyle = "";
  }
  const combinedClassName = `${cardBaseStyle} ${elevationStyle} ${borderStyle}`;

  if (background) {
    return (
      <View className={combinedClassName} {...props}>
        <ExpoImage
          source={background}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
        />
        <View className={className} style={{ flex: 1 }}>
          {children}
        </View>
      </View>
    );
  }

  return (
    <View className={`${combinedClassName} ${className}`} {...props}>
      {children}
    </View>
  );
}
