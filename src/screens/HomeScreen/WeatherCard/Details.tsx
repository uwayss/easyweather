// FILE: src/screens/HomeScreen/WeatherCard/Details.tsx
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { CurrentWeather } from "../../../types/weather";
import { useSettings } from "../../../context/SettingsContext";
import { convertWindSpeed, formatWindSpeed } from "../../../utils/unitConversion";
import { useTranslation } from "react-i18next";

export function Details({ current }: { current: CurrentWeather | undefined }) {
  const { settings } = useSettings();
  const { t } = useTranslation();
  return (
    <View className="flex-row justify-center items-center mt-5 rounded-xl p-4 w-full opacity-80 elevation-sm">
      <View className="flex-1 items-center">
        <Text className="opacity-80 text-sm mb-1">{t("weather.humidity")}</Text>
        <Text className="text-base font-semibold">
          {current?.humidity ? current?.humidity + "%" : ""}
        </Text>
      </View>
      <View className="w-px h-full bg-neutral-400 opacity-30 mx-4" />
      <View className="flex-1 items-center">
        <Text className="opacity-80 text-sm mb-1">{t("weather.wind_speed")}</Text>
        <Text className="text-base font-semibold">
          {current
            ? formatWindSpeed(
                convertWindSpeed(current.windSpeed, settings.useImperialUnits),
                settings.useImperialUnits,
              )
            : ""}
        </Text>
      </View>
    </View>
  );
}
