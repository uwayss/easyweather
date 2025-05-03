import React from "react";
import { View, ViewProps } from "react-native";
import FastImage, { Source } from "react-native-fast-image";

interface CardProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
  elevated?: boolean;
  background?: Source;
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
  const elevationStyle = elevated ? `bg-light-outline/35 dark:bg-dark-outline/50` : "";
  let borderStyle =
    "border-light-outline dark:border-dark-outline border-b-2 border-r-2 border-t-hairline border-l-hairline";
  if (borderType == "thin") {
    borderStyle =
      "border-light-outline dark:border-dark-outline border-b-hairline border-r-hairline";
  } else if (borderType == "hidden") {
    borderStyle = "";
  }
  const combinedClassName = `${cardBaseStyle} ${elevationStyle} ${borderStyle}`;

  return background ? (
    <View className={combinedClassName}>
      <FastImage source={background} className="w-full flex-1" resizeMode="cover">
        <View className={className} {...props}>
          {children}
        </View>
      </FastImage>
    </View>
  ) : (
    <View className={`${combinedClassName} ${className}`} {...props}>
      {children}
    </View>
  );
}
