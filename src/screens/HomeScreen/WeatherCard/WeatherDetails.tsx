import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import Card from "../../../components/Common/Card";
import Text from "../../../components/Common/Text";
import WeatherDetailItem from "../../../components/WeatherDetailItem";
import {
  THEME_COLORS_DARK,
  THEME_COLORS_LIGHT,
} from "../../../constants/colors";
import { useSettings } from "../../../context/SettingsContext";
import { CurrentWeather } from "../../../types/weather";
import { getUvIndexInfo } from "../../../utils/aqiUtils";
import {
  convertWindSpeed,
  formatWindSpeed,
} from "../../../utils/unitConversion";

export function Details({ current }: { current: CurrentWeather | undefined }) {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === "dark"
      ? THEME_COLORS_DARK.onSurfaceVariant
      : THEME_COLORS_LIGHT.onSurfaceVariant;

  const uvDetails = getUvIndexInfo(current?.uvIndex);
  const windSpeedString =
    current?.windSpeed !== undefined
      ? formatWindSpeed(
          convertWindSpeed(current.windSpeed, settings.useImperialUnits),
          settings.useImperialUnits
        )
      : "--";

  return (
    <Card
      className="flex-row justify-around items-center p-4 w-full h-16"
      elevated
    >
      <WeatherDetailItem
        icon="water-percent"
        label={t("weather.humidity")}
        iconColor={iconColor}
        pop
      >
        <Text pop className="font-semibold text-center">
          {current?.humidity !== undefined ? `${current.humidity}%` : "--"}
        </Text>
      </WeatherDetailItem>
      <View className="w-px h-full bg-neutral-400 opacity-30 mx-2" />
      <WeatherDetailItem
        icon="weather-windy"
        label={t("weather.wind_speed")}
        iconColor={iconColor}
        pop
      >
        <Text pop className="font-semibold text-center">
          {windSpeedString}
        </Text>
      </WeatherDetailItem>
      <View className="w-px h-full bg-neutral-400 opacity-30 mx-2" />
      <WeatherDetailItem
        icon="shield-sun-outline"
        label={t("weather.uv_index")}
        iconColor={uvDetails.color}
        pop
      >
        <Text pop className="font-semibold text-center">
          {uvDetails.valueText}
          <Text pop passive className="text-xs">
            {` (${uvDetails.text})`}
          </Text>
        </Text>
      </WeatherDetailItem>
    </Card>
  );
}
