// FILE: src/components/WeatherDetailItem.tsx
import React from "react";
import { View } from "react-native";

import Text from "./Common/Text";
import Icon from "./Icon";

interface WeatherDetailItemProps {
  children: React.ReactNode;
  icon: string;
  iconColor?: string;
  iconType?: "feather" | "material";
  label?: string;
  pop?: boolean;
}

const WeatherDetailItem: React.FC<WeatherDetailItemProps> = ({
  icon,
  label,
  children,
  iconColor,
  iconType = "material",
  pop,
}) => {
  return (
    <View className="flex-1 items-center justify-between">
      <View className="flex-1 items-center py-1">
        <Icon name={icon} type={iconType} size={24} color={iconColor} />
        <Text
          pop={pop}
          passive
          className="flex-shrink text-center text-xs"
          numberOfLines={2}
        >
          {label}
        </Text>
      </View>
      {children}
    </View>
  );
};

export default React.memo(WeatherDetailItem);
