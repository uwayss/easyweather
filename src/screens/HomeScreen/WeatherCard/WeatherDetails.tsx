// FILE: src/screens/HomeScreen/WeatherCard/Details.tsx
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { useColorScheme } from "nativewind";
import Card from "../../../components/Common/Card";
import Text from "../../../components/Common/Text";
import Icon from "../../../components/Icon";
import {
  THEME_COLORS_DARK,
  THEME_COLORS_LIGHT,
  WIND_COLOR_HIGH,
  WIND_COLOR_LOW,
  WIND_COLOR_MEDIUM,
  WIND_COLOR_SEVERE,
} from "../../../constants/colors";
import { useSettings } from "../../../context/SettingsContext";
import { CurrentWeather } from "../../../types/weather";
import {
  convertWindSpeed,
  formatWindSpeed,
} from "../../../utils/unitConversion";

const UvIndexDetail = ({ uvIndexValue }: { uvIndexValue: number }) => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const defaultIconColor =
    colorScheme === "dark"
      ? THEME_COLORS_DARK.onSurfaceVariant
      : THEME_COLORS_LIGHT.onSurfaceVariant;

  const getUvDetails = useCallback(() => {
    if (uvIndexValue === undefined || uvIndexValue < 0)
      return { text: "", color: defaultIconColor, valueText: "--" };
    const roundedUvIndex = Math.round(uvIndexValue);
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
  }, [uvIndexValue, t, defaultIconColor]);

  const uvDetails = useMemo(() => getUvDetails(), [getUvDetails]);

  return (
    <View className="flex-1 items-center">
      <View className="flex-row items-center mb-1">
        <Icon
          name="shield-sun-outline"
          type="material"
          size={16}
          color={uvDetails.color}
          className="mr-1"
        />
        <Text pop passive className="text-center">
          {t("weather.uv_index")}
        </Text>
      </View>
      <Text pop className="font-semibold text-center">
        {uvDetails.valueText}
        <Text pop passive className="text-xs">
          {` (${uvDetails.text})`}
        </Text>
      </Text>
    </View>
  );
};

export function Details({ current }: { current: CurrentWeather | undefined }) {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === "dark"
      ? THEME_COLORS_DARK.onSurfaceVariant
      : THEME_COLORS_LIGHT.onSurfaceVariant;

  return (
    <Card
      className="flex-row justify-around items-center mt-5 rounded-xl p-4 w-full opacity-80"
      elevated
    >
      <View className="flex-1 items-center">
        <View className="flex-row items-center mb-1">
          <Icon
            name="water-percent"
            type="material"
            size={16}
            color={iconColor}
            className="mr-1"
          />
          <Text pop passive className="text-center">
            {t("weather.humidity")}
          </Text>
        </View>
        <Text pop className="font-semibold text-center">
          {current?.humidity !== undefined ? `${current.humidity}%` : "--"}
        </Text>
      </View>
      <View className="w-px h-full bg-neutral-400 opacity-30 mx-2" />
      <View className="flex-1 items-center">
        <View className="flex-row items-center mb-1">
          <Icon
            name="weather-windy"
            type="material"
            size={16}
            color={iconColor}
            className="mr-1"
          />
          <Text pop passive className="text-center">
            {t("weather.wind_speed")}
          </Text>
        </View>
        <Text pop className="font-semibold text-center">
          {current?.windSpeed !== undefined
            ? formatWindSpeed(
                convertWindSpeed(current.windSpeed, settings.useImperialUnits),
                settings.useImperialUnits
              )
            : "--"}
        </Text>
      </View>
      <View className="w-px h-full bg-neutral-400 opacity-30 mx-2" />
      {current?.uvIndex !== undefined ? (
        <UvIndexDetail uvIndexValue={current.uvIndex} />
      ) : (
        <View className="flex-1 items-center">
          <View className="flex-row items-center mb-1">
            <Icon
              name="shield-sun-outline"
              type="material"
              size={16}
              color={iconColor}
              className="mr-1"
            />
            <Text pop passive className="text-center">
              {t("weather.uv_index")}
            </Text>
          </View>
          <Text pop className="font-semibold text-center">
            --
          </Text>
        </View>
      )}
    </Card>
  );
}
