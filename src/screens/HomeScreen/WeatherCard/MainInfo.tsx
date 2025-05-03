// FILE: src/screens/HomeScreen/WeatherCard/MainInfo.tsx
import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, ActivityIndicator } from "react-native";

import Card from "../../../components/Common/Card";
import Text from "../../../components/Common/Text";
import { useLocationContext } from "../../../context/LocationContext";
import { useSettings } from "../../../context/SettingsContext";
import { CurrentWeather } from "../../../types/weather";
import { useWeatherDescriptions } from "../../../utils/descriptions";
import { convertTemperature, formatTemperature } from "../../../utils/unitConversion";

export function MainInfo({ current }: { current: CurrentWeather | undefined }) {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const { location, loading: locationLoading } = useLocationContext();
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

  const indicatorColor = colorScheme === "dark" ? "#83c5be" : "#006d77";

  return (
    <Card className="h-48" elevated>
      {current ? (
        <View className="p-4 w-full self-center items-center justify-center opacity-80 rounded-xl flex-1">
          <View className="p-3 self-center w-full bg-transparent">
            <Text numberOfLines={1} ellipsizeMode="tail" className="text-center w-full text-sm" pop>
              {name}
            </Text>
          </View>
          <Text className="font-bold text-5xl" pop>
            {formatTemperature(
              convertTemperature(current.temperature, settings.useImperialUnits),
              settings.useImperialUnits,
            )}
          </Text>
          <Text
            className="w-full flex-wrap uppercase mt-1 tracking-widest text-center text-base font-semibold leading-relaxed"
            pop
          >
            {description || ""}
          </Text>
          <Text className="opacity-90 mt-2 text-base font-semibold leading-relaxed" pop>
            {t("weather.feltTemperature")}
            {formatTemperature(
              convertTemperature(current.feltTemp, settings.useImperialUnits),
              settings.useImperialUnits,
            ).replace(/°[CF]$/, "°")}
          </Text>
        </View>
      ) : (
        <View className="self-center items-center justify-center h-48">
          <ActivityIndicator color={indicatorColor} />
        </View>
      )}
    </Card>
  );
}
