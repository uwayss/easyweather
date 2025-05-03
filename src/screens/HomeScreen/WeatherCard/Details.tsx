// FILE: src/screens/HomeScreen/WeatherCard/Details.tsx
import React from "react";
// import { Text, View } from "react-native";
import { View } from "react-native";
import { CurrentWeather } from "../../../types/weather";
import { useSettings } from "../../../context/SettingsContext";
import { convertWindSpeed, formatWindSpeed } from "../../../utils/unitConversion";
import { useTranslation } from "react-i18next";
import Text from "../../../components/Common/Text";
import Card from "../../../components/Common/Card";

export function Details({ current }: { current: CurrentWeather | undefined }) {
  const { settings } = useSettings();
  const { t } = useTranslation();
  return (
    <Card
      className="flex-row justify-center items-center mt-5 rounded-xl p-4 w-full opacity-80"
      elevated
    >
      <View className="flex-1 items-center">
        <Text passive className="mb-1">
          {t("weather.humidity")}
        </Text>
        <Text className="font-semibold">{current?.humidity ? current?.humidity + "%" : ""}</Text>
      </View>
      <View className="w-px h-full bg-neutral-400 opacity-30 mx-4" />
      <View className="flex-1 items-center">
        <Text passive className="mb-1">
          {t("weather.wind_speed")}
        </Text>
        <Text className="font-semibold">
          {current
            ? formatWindSpeed(
                convertWindSpeed(current.windSpeed, settings.useImperialUnits),
                settings.useImperialUnits,
              )
            : ""}
        </Text>
      </View>
    </Card>
  );
}
