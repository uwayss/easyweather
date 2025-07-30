// FILE: src/screens/HomeScreen/AqiGauge/GaugeInfo.tsx
import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import Text from "@/src/components/Common/Text";
import { AqiLevelInfo } from "@/src/utils/aqiUtils";

interface GaugeInfoProps {
  validAqiValue: number;
  aqiInfo: AqiLevelInfo;
}

export const GaugeInfo: React.FC<GaugeInfoProps> = ({
  validAqiValue,
  aqiInfo,
}) => {
  const { t } = useTranslation();

  const chipBackgroundColor = `${aqiInfo.color}2A`;

  return (
    <View className="w-full px-3 gap-2 items-center">
      <View className="gap-0.5 items-center">
        <Text className="text-4xl font-bold">
          {validAqiValue >= 0 ? Math.round(validAqiValue) : "--"}
        </Text>
        <View
          style={{
            backgroundColor: chipBackgroundColor,
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 999,
          }}
          className="mt-1"
        >
          <Text className="text-base font-medium">{aqiInfo.level}</Text>
        </View>
      </View>
      <View className="flex-1 mt-1.5">
        <Text className="text-xs opacity-75 leading-snug text-wrap text-center">
          {t(aqiInfo.descriptionKey)}
        </Text>
      </View>
    </View>
  );
};
