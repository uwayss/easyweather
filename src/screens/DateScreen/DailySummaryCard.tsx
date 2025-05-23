// FILE: src/screens/DateScreen/DailySummaryCard.tsx
import { Image as ExpoImage } from "expo-image";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import Text from "../../components/Common/Text";
import Icon from "../../components/Icon";
import {
  PRECIPITATION_COLOR_MEDIUM,
  WIND_COLOR_HIGH,
  WIND_COLOR_LOW,
  WIND_COLOR_MEDIUM,
  WIND_COLOR_SEVERE,
} from "../../constants/colors";
import { useSettings } from "../../context/SettingsContext";
import { DayWeather } from "../../types/weather";
import { useWeatherDescriptions } from "../../utils/descriptions";
import { formatTimeStringToHour } from "../../utils/timeUtils";
import {
  convertTemperature,
  convertWindSpeed,
  formatWindSpeed,
} from "../../utils/unitConversion";

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
  const { settings } = useSettings();
  const { t } = useTranslation();
  const translatedWeatherDescriptions = useWeatherDescriptions();

  const getUvIndexDetails = (uvIndex: number | undefined) => {
    if (uvIndex === undefined || uvIndex < 0)
      return { text: "", color: WIND_COLOR_LOW, valueText: "--" };
    const roundedUvIndex = Math.round(uvIndex);
    let text = t("uv_index.low");
    let color = WIND_COLOR_LOW;

    if (roundedUvIndex >= 11) {
      text = t("uv_index.extreme");
      color = "#BA68C8";
    } else if (roundedUvIndex >= 8) {
      text = t("uv_index.very_high");
      color = WIND_COLOR_SEVERE;
    } else if (roundedUvIndex >= 6) {
      text = t("uv_index.high");
      color = WIND_COLOR_HIGH;
    } else if (roundedUvIndex >= 3) {
      text = t("uv_index.moderate");
      color = WIND_COLOR_MEDIUM;
    }
    return { text, color, valueText: roundedUvIndex.toString() };
  };

  const uvDetails = useMemo(
    () => getUvIndexDetails(dayData?.uvIndexMax),
    [dayData?.uvIndexMax, getUvIndexDetails]
  );

  if (!dayData) return null;

  const weatherInfo = translatedWeatherDescriptions[dayData.weatherCode]?.day;
  const formattedHigh = Math.round(
    convertTemperature(dayData.maxTemp, settings.useImperialUnits)
  ).toString();
  const formattedLow = Math.round(
    convertTemperature(dayData.minTemp, settings.useImperialUnits)
  ).toString();
  const tempUnit = settings.useImperialUnits ? "°F" : "°C";
  const rawWindSpeed = convertWindSpeed(
    dayData.windSpeed,
    settings.useImperialUnits
  );
  const formattedWind = formatWindSpeed(
    rawWindSpeed,
    settings.useImperialUnits
  );
  const [windValue, windUnit] = formattedWind.split(" ");
  const formattedSunrise = formatTimeStringToHour(dayData.sunrise);
  const formattedSunset = formatTimeStringToHour(dayData.sunset);

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
            color={PRECIPITATION_COLOR_MEDIUM}
          />
          <DetailItem
            icon="wind"
            label={t("weather.max_wind")}
            value={windValue}
            unit={windUnit}
            color={WIND_COLOR_MEDIUM}
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
          <DetailItem
            icon="sunrise"
            color="#FFB74D"
            label={t("weather.sunrise")}
            value={formattedSunrise || "--:--"}
          />
        </View>
        <View className="flex-row justify-around items-center">
          <DetailItem
            icon="sunset"
            label={t("weather.sunset")}
            value={formattedSunset || "--:--"}
            color="#BA68C8"
          />
          <View className="flex-1" />
        </View>
      </View>
    </View>
  );
}
