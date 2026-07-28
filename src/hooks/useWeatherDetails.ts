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

  // Read through locals so each memo's body touches exactly what its
  // dependency list names; mixing `current?.x` deps with `current.x` reads
  // is what react-hooks/preserve-manual-memoization flags.
  const windSpeed = current?.windSpeed;
  const humidity = current?.humidity;

  const windSpeedString = useMemo(
    () =>
      windSpeed !== undefined
        ? formatWindSpeed(
            convertWindSpeed(windSpeed, settings.useImperialUnits),
            settings.useImperialUnits
          )
        : "--",
    [windSpeed, settings.useImperialUnits]
  );

  const humidityString = useMemo(
    () => (humidity !== undefined ? `${humidity}%` : "--"),
    [humidity]
  );

  return {
    iconColor,
    uvDetails,
    windSpeedString,
    humidityString,
  };
};
