// FILE: src/screens/DateScreen/DailySummaryCard.tsx
import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import FastImage from "react-native-fast-image";

import Text from "../../components/Common/Text";
import Icon from "../../components/Icon";
import { useSettings } from "../../context/SettingsContext";
import { DayWeather } from "../../types/weather";
import { useWeatherDescriptions } from "../../utils/descriptions";
import { formatTimeStringToHour } from "../../utils/timeUtils";
import { convertTemperature, convertWindSpeed, formatWindSpeed } from "../../utils/unitConversion";

interface DetailItemProps {
  icon: string; // Feather icon name
  label: string;
  value: string;
  unit?: string;
  color?: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value, unit, color }) => {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? darkThemeColors : lightThemeColors;
  const finalIconColor = color || theme.onSurfaceVariant;
  return (
    <View className="flex-row items-center gap-2 flex-1">
      <Icon name={icon} size={20} color={finalIconColor} type="feather" />
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

export default function DailySummaryCard({ dayData }: { dayData: DayWeather | undefined }) {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const translatedWeatherDescriptions = useWeatherDescriptions();

  if (!dayData) return null;

  const weatherInfo = translatedWeatherDescriptions[dayData.weatherCode]?.day;
  const formattedHigh = Math.round(
    convertTemperature(dayData.maxTemp, settings.useImperialUnits),
  ).toString();
  const formattedLow = Math.round(
    convertTemperature(dayData.minTemp, settings.useImperialUnits),
  ).toString();
  const tempUnit = settings.useImperialUnits ? "°F" : "°C";
  const rawWindSpeed = convertWindSpeed(dayData.windSpeed, settings.useImperialUnits);
  const formattedWind = formatWindSpeed(rawWindSpeed, settings.useImperialUnits);
  const [windValue, windUnit] = formattedWind.split(" ");
  const formattedSunrise = formatTimeStringToHour(dayData.sunrise);
  const formattedSunset = formatTimeStringToHour(dayData.sunset);

  return (
    <View className="bg-light-surface dark:bg-dark-surface rounded-lg shadow-sm overflow-hidden p-4 gap-3">
      <View className="flex-row items-center gap-3">
        {weatherInfo?.image && (
          <FastImage
            source={weatherInfo.image}
            style={{ width: 64, height: 64 }}
            resizeMode={FastImage.resizeMode.contain}
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
            // Use Feather icon names
            icon="cloud-drizzle" // Replaced weather-pouring
            label={t("weather.max_precipitation")}
            value={`${Math.round(dayData.rainProb)}`}
            unit="%"
            color="#64B5F6"
          />
          <DetailItem
            icon="wind" // Replaced weather-windy
            label={t("weather.max_wind")}
            value={windValue}
            unit={windUnit}
            color="#81D4FA"
          />
        </View>
        <View className="flex-row justify-around items-center">
          <DetailItem
            icon="sunrise" // Replaced weather-sunset-up
            color="#FFB74D"
            label={t("weather.sunrise")}
            value={formattedSunrise || "--:--"}
          />
          <DetailItem
            icon="sunset" // Replaced weather-sunset-down
            label={t("weather.sunset")}
            value={formattedSunset || "--:--"}
            color="#BA68C8"
          />
        </View>
      </View>
    </View>
  );
}

// Temporary color objects
const lightThemeColors = { primary: "#006d77", onSurface: "#1f1f1f", onSurfaceVariant: "#666666" };
const darkThemeColors = { primary: "#83c5be", onSurface: "#e1e1e1", onSurfaceVariant: "#aaaaaa" };
