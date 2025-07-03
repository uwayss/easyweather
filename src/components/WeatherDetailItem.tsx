import React from "react";
import { View } from "react-native";

import Text from "./Common/Text";
import Icon from "./Icon";

interface WeatherDetailItemProps {
  children: React.ReactNode;
  icon: string;
  iconColor?: string;
  iconType?: "feather" | "material";
  label: string;
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
    <View className="flex-1 items-center">
      <View className="flex-row items-center mb-1">
        <Icon
          name={icon}
          type={iconType}
          size={16}
          color={iconColor}
          className="mr-1"
        />
        <Text pop={pop} passive className="text-center">
          {label}
        </Text>
      </View>
      {children}
    </View>
  );
};

export default React.memo(WeatherDetailItem);
