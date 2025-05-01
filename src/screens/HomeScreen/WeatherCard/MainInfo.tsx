// FILE: src/screens/HomeScreen/WeatherCard/MainInfo.tsx
import React from "react";
import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { CurrentWeather } from "../../../types/weather";
import { useWeatherDescriptions } from "../../../utils/descriptions";
import { useSettings } from "../../../context/SettingsContext";
import { convertTemperature, formatTemperature } from "../../../utils/unitConversion";
import { useTranslation } from "react-i18next";
import { useLocationContext } from "../../../context/LocationContext";

export function MainInfo({
  // name,
  current,
}: {
  // name: string;
  current: CurrentWeather | undefined;
}) {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const { location, loading: locationLoading } = useLocationContext();
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

  return (
    <View className="flex-1">
      {current ? (
        <View className="p-4 w-full self-center items-center justify-center opacity-80 rounded-xl flex-1 elevation-sm">
          <View className="p-3 self-center w-full bg-transparent">
            <Text numberOfLines={1} ellipsizeMode="tail" className="text-center w-full">
              {name}
            </Text>
          </View>
          <Text className="font-bold text-5xl">
            {current
              ? formatTemperature(
                  convertTemperature(current.temperature, settings.useImperialUnits),
                  settings.useImperialUnits,
                )
              : ""}
          </Text>
          <Text className="width-full flex-wrap uppercase mt-1 tracking-widest text-center text-base font-semibold leading-relaxed">
            {description || ""}
          </Text>
          <Text className="opacity-90 mt-2 text-base font-semibold leading-relaxed">
            {t("weather.feltTemperature")}
            {current
              ? formatTemperature(
                  convertTemperature(current.feltTemp, settings.useImperialUnits),
                  settings.useImperialUnits,
                ).replace(/°[CF]$/, "°")
              : ""}
          </Text>
        </View>
      ) : (
        <View className="p-4 w-full self-center items-center justify-center opacity-80 rounded-xl flex-1 elevation-sm">
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
}
