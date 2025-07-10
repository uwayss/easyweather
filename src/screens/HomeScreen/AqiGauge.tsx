import Text from "@/src/components/Common/Text";
import { useAqiGauge } from "@/src/hooks/useAqiGauge";
import { AqiLevelInfo } from "@/src/utils/aqiUtils";
import { t } from "i18next";
import React from "react";
import { View } from "react-native";

interface AqiGaugeProps {
  aqiValue?: number;
  aqiInfo: AqiLevelInfo;
  maxAqi?: number;
}

const AqiGauge: React.FC<AqiGaugeProps> = ({ aqiValue, aqiInfo }) => {
  const { validAqiValue, displayMax, percentage, AQI_LEVELS_ORDERED } =
    useAqiGauge(aqiValue);

  return (
    <View className="items-center w-full mb-2">
      <View className="flex-row w-full h-4 rounded-full overflow-hidden mb-1 bg-gray-300 dark:bg-gray-700 shadow">
        {AQI_LEVELS_ORDERED.map((level, index) => {
          let prevMax = index === 0 ? 0 : AQI_LEVELS_ORDERED[index - 1].max;
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
