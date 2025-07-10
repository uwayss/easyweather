import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import Text from "@/src/components/Common/Text";
import Icon from "@/src/components/Icon";

interface AirQualityDetailItemProps {
  labelKey: string;
  value: string;
  iconName: string;
  iconColor?: string;
}

export const AirQualityDetailItem: React.FC<AirQualityDetailItemProps> = ({
  labelKey,
  value,
  iconName,
  iconColor,
}) => {
  const { t } = useTranslation();
  return (
    <View className="items-center flex-1 flex-row gap-4">
      <Icon name={iconName} type="material" size={26} color={iconColor} />
      <View className="items-start">
        <Text className="text-xs opacity-80 mt-1 text-center" numberOfLines={1}>
          {t(labelKey)}
        </Text>
        <Text
          className="font-semibold text-sm mt-0.5 text-center"
          numberOfLines={1}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};
