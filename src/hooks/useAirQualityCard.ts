import { useColorScheme } from "nativewind";
import { useMemo } from "react";
import { THEME_COLORS_DARK, THEME_COLORS_LIGHT } from "../constants/colors";
import { useWeather } from "../context/WeatherContext";
import { formatOzone, formatPm25, getUsAqiInfo } from "../utils/aqiUtils";

export const useAirQualityCard = () => {
  const { currentAirQuality, loading: weatherLoading } = useWeather();
  const { colorScheme } = useColorScheme();

  const iconColor = useMemo(
    () =>
      colorScheme === "dark"
        ? THEME_COLORS_DARK.onSurfaceVariant
        : THEME_COLORS_LIGHT.onSurfaceVariant,
    [colorScheme]
  );

  const aqiInfo = useMemo(
    () => getUsAqiInfo(currentAirQuality?.usAqi),
    [currentAirQuality?.usAqi]
  );

  const formattedPm25Value = useMemo(
    () => formatPm25(currentAirQuality?.pm2_5),
    [currentAirQuality?.pm2_5]
  );
  const formattedOzoneValue = useMemo(
    () => formatOzone(currentAirQuality?.ozone),
    [currentAirQuality?.ozone]
  );

  return {
    weatherLoading,
    currentAirQuality,
    iconColor,
    aqiInfo,
    formattedPm25Value,
    formattedOzoneValue,
  };
};
