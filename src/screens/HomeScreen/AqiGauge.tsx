// FILE: src/screens/HomeScreen/AqiGauge.tsx
import Text from "@/src/components/Common/Text";
import { AqiLevelInfo } from "@/src/utils/aqiUtils";
import { t } from "i18next";
import React from "react";
import { View } from "react-native";

interface AqiGaugeProps {
  aqiValue?: number;
  aqiInfo: AqiLevelInfo;
  maxAqi?: number;
  descriptionKey?: string;
}

const AQI_LEVELS_ORDERED = [
  { max: 50, color: "#00E400", key: "good" },
  { max: 100, color: "#FFFF00", key: "moderate" },
  { max: 150, color: "#FF7E00", key: "unhealthy_sensitive" },
  { max: 200, color: "#FF0000", key: "unhealthy" },
  { max: 300, color: "#8F3F97", key: "very_unhealthy" },
  { max: 500, color: "#7E0023", key: "hazardous" },
];

const AqiGauge: React.FC<AqiGaugeProps> = ({
  aqiValue,
  aqiInfo,
  maxAqi = 301,
  descriptionKey,
}) => {
  const validAqiValue =
    aqiValue !== undefined && aqiValue !== null && !isNaN(aqiValue)
      ? aqiValue
      : -1;

  const clampedAqiForDisplay = Math.min(
    validAqiValue,
    AQI_LEVELS_ORDERED[AQI_LEVELS_ORDERED.length - 1].max
  ); // Clamp to the max of our defined levels for dot
  const displayMax = AQI_LEVELS_ORDERED[AQI_LEVELS_ORDERED.length - 1].max; // Use the max of our levels for percentage calculation

  const percentage =
    validAqiValue >= 0 ? (clampedAqiForDisplay / displayMax) * 100 : 0;

  return (
    <View className="items-center w-full mb-2">
      <View className="flex-row w-full h-4 rounded-full overflow-hidden mb-1 bg-gray-300 dark:bg-gray-700 shadow">
        {AQI_LEVELS_ORDERED.map((level, index) => {
          let prevMax = index === 0 ? 0 : AQI_LEVELS_ORDERED[index - 1].max;
          // Calculate width based on the proportion of this segment up to the defined max (e.g., 500)
          let widthPercentage = ((level.max - prevMax) / displayMax) * 100;

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
              left: `${Math.min(percentage, 97.5)}%`, // Cap to keep dot mostly within bounds
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

      <View className="mt-2.5 w-full px-3 gap-2">
        <View className="gap-0.5 items-center">
          <Text className="text-4xl font-bold">
            {validAqiValue >= 0 ? Math.round(validAqiValue) : "--"}
          </Text>
          <Text className="text-base font-medium">{aqiInfo.level}</Text>
        </View>
        <View className="flex-1 mt-0.5">
          <Text className="text-xs opacity-75 leading-snug text-wrap text-center">
            {t(aqiInfo.descriptionKey)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AqiGauge;
