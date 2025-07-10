import { useColorScheme } from "nativewind";
import { useMemo } from "react";
import { THEME_COLORS_DARK, THEME_COLORS_LIGHT } from "../constants/colors";
import { useSettings } from "../context/SettingsContext";
import { CurrentWeather } from "../types/weather";
import { getUvIndexInfo } from "../utils/aqiUtils";
import { convertWindSpeed, formatWindSpeed } from "../utils/unitConversion";

export const useWeatherDetails = (current: CurrentWeather | undefined) => {
  const { settings } = useSettings();
  const { colorScheme } = useColorScheme();

  const iconColor = useMemo(
    () =>
      colorScheme === "dark"
        ? THEME_COLORS_DARK.onSurfaceVariant
        : THEME_COLORS_LIGHT.onSurfaceVariant,
    [colorScheme]
  );

  const uvDetails = useMemo(
    () => getUvIndexInfo(current?.uvIndex),
    [current?.uvIndex]
  );

  const windSpeedString = useMemo(
    () =>
      current?.windSpeed !== undefined
        ? formatWindSpeed(
            convertWindSpeed(current.windSpeed, settings.useImperialUnits),
            settings.useImperialUnits
          )
        : "--",
    [current?.windSpeed, settings.useImperialUnits]
  );

  const humidityString = useMemo(
    () => (current?.humidity !== undefined ? `${current.humidity}%` : "--"),
    [current?.humidity]
  );

  return {
    iconColor,
    uvDetails,
    windSpeedString,
    humidityString,
  };
};
