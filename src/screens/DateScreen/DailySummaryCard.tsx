import { Image as ExpoImage } from "expo-image";
import React from "react";
import { View } from "react-native";

import Text from "../../components/Common/Text";
import Icon from "../../components/Icon";
import { useDailySummaryCard } from "../../hooks/useDailySummaryCard";
import { DayWeather } from "../../types/weather";

interface DetailItemProps {
  icon: string;
  label: string;
  value: string;
  unit?: string;
  color?: string;
}

const DetailItem: React.FC<DetailItemProps> = ({
  icon,
  label,
  value,
  unit,
  color,
}) => {
  return (
    <View className="flex-row items-center gap-2 flex-1">
      <Icon
        name={icon}
        size={20}
        color={color}
        type={icon === "shield-sun-outline" ? "material" : "feather"}
      />
      <View className="items-start">
        <Text className="font-semibold text-sm">
          {value}
          {unit && (
            <Text className="text-xs ml-0.5 text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
              {unit}
            </Text>
          )}
        </Text>
        <Text
          className="text-xs mt-px text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant"
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
    </View>
  );
};

export default function DailySummaryCard({
  dayData,
}: {
  dayData: DayWeather | undefined;
}) {
  const {
    t,
    weatherInfo,
    uvDetails,
    formattedHigh,
    formattedLow,
    tempUnit,
    formattedWind,
    formattedSunrise,
    formattedSunset,
  } = useDailySummaryCard(dayData);

  if (!dayData) return null;

  const [windValue, windUnit] = formattedWind;

  return (
    <View className="bg-light-surface dark:bg-dark-surface rounded-lg shadow-sm overflow-hidden p-4 gap-3">
      <View className="flex-row items-center gap-3">
        {weatherInfo?.image && (
          <ExpoImage
            source={weatherInfo.image}
            style={{ width: 64, height: 64 }}
            contentFit="contain"
          />
        )}
        <View className="flex-1 items-start">
          <View className="flex-row items-baseline gap-1">
            <Text className="font-bold text-4xl">{formattedHigh}</Text>
            <Text className="text-2xl text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
              /{formattedLow}
              {tempUnit}
            </Text>
          </View>
          <Text className="font-medium mt-0.5" numberOfLines={1}>
            {weatherInfo?.description || ""}
          </Text>
        </View>
      </View>

      <View className="h-px bg-light-outline dark:bg-dark-outline" />

      <View className="gap-3">
        <View className="flex-row justify-around items-center">
          <DetailItem
            icon="cloud-drizzle"
            label={t("weather.max_precipitation")}
            value={`${Math.round(dayData.rainProb)}`}
            unit=" %"
            color="#f9c74f"
          />
          <DetailItem
            icon="wind"
            label={t("weather.max_wind")}
            value={windValue}
            unit={windUnit}
            color="#f9c74f"
          />
        </View>
        <View className="flex-row justify-around items-center">
          <DetailItem
            icon="sunrise"
            color="#FFB74D"
            label={t("weather.sunrise")}
            value={formattedSunrise || "--:--"}
          />
          <DetailItem
            icon="sunset"
            label={t("weather.sunset")}
            value={formattedSunset || "--:--"}
            color="#BA68C8"
          />
        </View>
        <View className="flex-row justify-around items-center">
          <DetailItem
            icon="shield-sun-outline"
            label={t("weather.uv_index")}
            value={uvDetails.valueText}
            unit={` (${uvDetails.text})`}
            color={uvDetails.color}
          />

          <View className="flex-1" />
        </View>
      </View>
    </View>
  );
}
