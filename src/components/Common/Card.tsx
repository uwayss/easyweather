import React from "react";
import { View, ViewProps } from "react-native";
import FastImage, { Source } from "react-native-fast-image";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  opacity?: number;
  background?: Source;
}

export default function Card({
  children,
  className,
  elevated,
  opacity = 30,
  background,
  ...props
}: CardProps) {
  const cardBaseStyle = "overflow-hidden rounded-xl";
  const elevationStyle = elevated ? `bg-light-outline/${opacity}` : "";
  const borderStyle = "border-light-outline border-b-hairline border-r-hairline";
  const combinedClassName = `${cardBaseStyle} ${elevationStyle} ${borderStyle} ${className || ""}`;

  return background ? (
    <View className={`${cardBaseStyle} ${elevationStyle} ${borderStyle}`}>
      <FastImage source={background} className="w-full flex-1" resizeMode="cover">
        <View className={className} {...props}>
          {children}
        </View>
      </FastImage>
    </View>
  ) : (
    <View className={`${combinedClassName} `} {...props}>
      {children}
    </View>
  );
}
