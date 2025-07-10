import React from "react";
import { View } from "react-native";
import { AqiLevelInfo } from "@/src/utils/aqiUtils";

interface GaugeBarProps {
  validAqiValue: number;
  percentage: number;
  aqiInfo: AqiLevelInfo;
  AQI_LEVELS_ORDERED: { max: number; color: string; key: string }[];
  displayMax: number;
}

export const GaugeBar: React.FC<GaugeBarProps> = ({
  validAqiValue,
  percentage,
  aqiInfo,
  AQI_LEVELS_ORDERED,
  displayMax,
}) => {
  return (
    <View className="flex-row w-full h-4 rounded-full overflow-hidden mb-1 bg-gray-300 dark:bg-gray-700 shadow">
      {AQI_LEVELS_ORDERED.map((level, index) => {
        const prevMax = index === 0 ? 0 : AQI_LEVELS_ORDERED[index - 1].max;
        const widthPercentage = ((level.max - prevMax) / displayMax) * 100;

        return (
          <View
            key={level.key}
            style={{
              width: `${widthPercentage}%`,
              backgroundColor: level.color,
              height: "100%",
            }}
          />
        );
      })}
      {validAqiValue >= 0 && (
        <View
          style={{
            position: "absolute",
            left: `${Math.min(percentage, 97.5)}%`,
            top: 0.5,
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: aqiInfo.color,
            borderColor: "rgba(255,255,255,0.7)",
            borderWidth: 1,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0.5 },
            shadowOpacity: 0.2,
            shadowRadius: 0.5,
            elevation: 2,
          }}
        />
      )}
    </View>
  );
};
