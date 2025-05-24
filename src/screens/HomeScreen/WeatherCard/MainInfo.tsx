// FILE: src/screens/HomeScreen/WeatherCard/MainInfo.tsx
import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";

import Card from "../../../components/Common/Card";
import Text from "../../../components/Common/Text";
import Icon from "../../../components/Icon";
import {
  THEME_COLORS_DARK,
  THEME_COLORS_LIGHT,
} from "../../../constants/colors";
import { useLocationContext } from "../../../context/LocationContext";
import { useSettings } from "../../../context/SettingsContext";
import { useWeather } from "../../../context/WeatherContext"; // Import useWeather
import { CurrentWeather } from "../../../types/weather";
import { useWeatherDescriptions } from "../../../utils/descriptions";
import {
  convertTemperature,
  formatTemperature,
} from "../../../utils/unitConversion";
import { generateWeatherSummaryLabel } from "../../../utils/weatherSummaryUtils"; // Import the new util

export function MainInfo({ current }: { current: CurrentWeather | undefined }) {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const {
    location,
    loading: locationLoading,
    addSavedLocation,
    isLocationSaved,
  } = useLocationContext();
  const { yesterdaySummary, todaySummary, tomorrowSummary } = useWeather(); // Get day summaries
  const { colorScheme } = useColorScheme();
  const timeOfDay = current?.isDay ? "day" : "night";
  const translatedDescriptions = useWeatherDescriptions();

  const name = location
    ? location.displayName
    : locationLoading
    ? t("weather.loading_location")
    : t("weather.unknown_location");

  const description = current
    ? translatedDescriptions[current.weatherCode]?.[timeOfDay].description
    : null;

  const indicatorColor =
    colorScheme === "dark"
      ? THEME_COLORS_DARK.primary
      : THEME_COLORS_LIGHT.primary;

  const isCurrentLocSaved = isLocationSaved(location);
  const canBeSaved =
    location &&
    location.displayName !== t("weather.current_location") &&
    location.displayName !== t("weather.loading_location") &&
    location.displayName !== t("weather.unknown_location");

  const handleSaveLocation = () => {
    if (location && canBeSaved && !isCurrentLocSaved) {
      addSavedLocation(location);
    }
  };

  const weatherSummaryLabel = React.useMemo(() => {
    return generateWeatherSummaryLabel(
      todaySummary,
      tomorrowSummary,
      yesterdaySummary,
      settings.useImperialUnits
    );
  }, [
    todaySummary,
    tomorrowSummary,
    yesterdaySummary,
    settings.useImperialUnits,
  ]);

  return (
    <Card elevated>
      {current ? (
        <View className="p-4 w-full self-center items-center justify-center opacity-80 rounded-xl flex-1">
          <View className="p-3 self-center w-full bg-transparent flex-row items-center justify-center">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-center text-sm max-w-[80%]"
              pop
            >
              {name}
            </Text>
            {canBeSaved && (
              <TouchableOpacity
                onPress={handleSaveLocation}
                className="ml-2 p-1"
              >
                <Icon
                  name={isCurrentLocSaved ? "star" : "star-outline"}
                  size={20}
                  color={
                    isCurrentLocSaved
                      ? colorScheme === "dark"
                        ? THEME_COLORS_DARK.primary
                        : THEME_COLORS_LIGHT.primary
                      : colorScheme === "dark"
                      ? THEME_COLORS_DARK.onSurface
                      : THEME_COLORS_LIGHT.onSurface
                  }
                />
              </TouchableOpacity>
            )}
          </View>
          <Text className="font-bold text-5xl" pop>
            {formatTemperature(
              convertTemperature(
                current.temperature,
                settings.useImperialUnits
              ),
              settings.useImperialUnits
            )}
          </Text>
          <Text
            className="w-full flex-wrap uppercase mt-1 tracking-widest text-center text-base font-semibold leading-relaxed"
            pop
          >
            {description || ""}
          </Text>
          <Text
            className="opacity-90 mt-2 text-base font-semibold leading-relaxed"
            pop
          >
            {t("weather.feltTemperature")}
            {": "}
            {formatTemperature(
              convertTemperature(current.feltTemp, settings.useImperialUnits),
              settings.useImperialUnits
            ).replace(/°[CF]$/, "")}
          </Text>
          {weatherSummaryLabel && (
            <Text
              className="opacity-80 mt-1.5 text-xs text-center leading-snug"
              pop
            >
              {weatherSummaryLabel}
            </Text>
          )}
        </View>
      ) : (
        <View className="self-center items-center justify-center h-48">
          <ActivityIndicator color={indicatorColor} />
        </View>
      )}
    </Card>
  );
}
