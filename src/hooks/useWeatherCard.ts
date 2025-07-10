import { useMemo } from "react";
import { useSettings } from "../context/SettingsContext";
import { useWeather } from "../context/WeatherContext";
import backgroundMappings from "../utils/backgroundMappings";
import { generateWeatherSummaryLabel } from "../utils/weatherSummaryUtils";

export const useWeatherCard = () => {
  const { weather, yesterdaySummary, todaySummary, tomorrowSummary, loading } =
    useWeather();
  const { settings } = useSettings();
  const currentWeather = weather?.current;

  const weatherSummaryLabel = useMemo(() => {
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

  const background = useMemo(() => {
    if (!currentWeather) return undefined;
    return backgroundMappings[currentWeather.weatherCode]?.[
      currentWeather.isDay ? "day" : "night"
    ];
  }, [currentWeather]);

  return {
    loading,
    weather,
    currentWeather,
    weatherSummaryLabel,
    background,
  };
};
