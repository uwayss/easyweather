import { ImageSource } from "expo-image";
import { useMemo, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions } from "react-native";

import { useSettings } from "../context/SettingsContext";
import { useWeather } from "../context/WeatherContext";
import { HourWeather } from "../types/weather";
import { filterHourlyWeatherForNext24HoursIncludingNow } from "../utils/weatherUtils";
import {
  GraphDataPoint,
  MetricType,
  getMetricDataForForecast,
} from "../utils/metricData";
import { THEME_COLORS_DARK, THEME_COLORS_LIGHT } from "../constants/colors";
import {
  HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL,
  HOURLY_CONDITIONS_POINT_ITEM_WIDTH,
} from "../constants/ui";

const screenWidth = Dimensions.get("window").width;

export const useHourlyConditions = (selectedHoursData?: HourWeather[]) => {
  const { weather, loading } = useWeather();
  const hourlyWeather = weather?.hourly;
  const { settings, activeTheme, translatedWeatherDescriptions } =
    useSettings();
  const { t } = useTranslation();

  const [currentMetric, setCurrentMetric] = useState<MetricType>("temperature");

  const getHourlyData = useCallback(() => {
    return (
      selectedHoursData ||
      filterHourlyWeatherForNext24HoursIncludingNow(hourlyWeather)
    );
  }, [selectedHoursData, hourlyWeather]);

  const hourlyData = useMemo(() => getHourlyData(), [getHourlyData]);

  const graphData: GraphDataPoint[] | undefined = useMemo(() => {
    return getMetricDataForForecast(
      currentMetric,
      hourlyData,
      settings.useImperialUnits
    );
  }, [currentMetric, hourlyData, settings.useImperialUnits]);

  const numDataPoints = graphData?.length || 0;
  const availableScrollWidth =
    screenWidth - HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL * 2;

  const internalContentWidth = useMemo(() => {
    if (numDataPoints < 1) return availableScrollWidth;
    const calculatedWidth = numDataPoints * HOURLY_CONDITIONS_POINT_ITEM_WIDTH;
    return Math.max(calculatedWidth, availableScrollWidth);
  }, [numDataPoints, availableScrollWidth]);

  const getIconForHour = (hour: HourWeather): ImageSource | undefined => {
    const image =
      translatedWeatherDescriptions[hour.weatherCode]?.[
        hour.isDay ? "day" : "night"
      ]?.image;
    return typeof image === "number" ? (image as ImageSource) : undefined;
  };

  const theme = activeTheme === "dark" ? THEME_COLORS_DARK : THEME_COLORS_LIGHT;
  const chartColor = graphData?.[0]?.color || theme.primary;

  return {
    t,
    loading,
    hourlyWeather,
    hourlyData,
    currentMetric,
    setCurrentMetric,
    graphData,
    numDataPoints,
    internalContentWidth,
    availableScrollWidth,
    getIconForHour,
    theme,
    chartColor,
  };
};
