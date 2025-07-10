import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSettings } from "../context/SettingsContext";
import { DayWeather } from "../types/weather";
import { getUvIndexInfo } from "../utils/aqiUtils";
import { formatTimeStringToHour } from "../utils/timeUtils";
import {
  convertTemperature,
  convertWindSpeed,
  formatWindSpeed,
} from "../utils/unitConversion";

export const useDailySummaryCard = (dayData: DayWeather | undefined) => {
  const { settings, translatedWeatherDescriptions } = useSettings();
  const { t } = useTranslation();

  const weatherInfo = useMemo(() => {
    if (!dayData) return undefined;
    return translatedWeatherDescriptions[dayData.weatherCode]?.day;
  }, [dayData, translatedWeatherDescriptions]);

  const uvDetails = useMemo(
    () => getUvIndexInfo(dayData?.uvIndexMax),
    [dayData?.uvIndexMax]
  );

  const formattedHigh = useMemo(() => {
    if (!dayData) return "";
    return Math.round(
      convertTemperature(dayData.maxTemp, settings.useImperialUnits)
    ).toString();
  }, [dayData, settings.useImperialUnits]);

  const formattedLow = useMemo(() => {
    if (!dayData) return "";
    return Math.round(
      convertTemperature(dayData.minTemp, settings.useImperialUnits)
    ).toString();
  }, [dayData, settings.useImperialUnits]);

  const formattedWind = useMemo(() => {
    if (!dayData) return ["--", ""];
    const rawWindSpeed = convertWindSpeed(
      dayData.windSpeed,
      settings.useImperialUnits
    );
    const formatted = formatWindSpeed(rawWindSpeed, settings.useImperialUnits);
    return formatted.split(" ");
  }, [dayData, settings.useImperialUnits]);

  const formattedSunrise = useMemo(
    () => formatTimeStringToHour(dayData?.sunrise),
    [dayData?.sunrise]
  );
  const formattedSunset = useMemo(
    () => formatTimeStringToHour(dayData?.sunset),
    [dayData?.sunset]
  );

  const tempUnit = settings.useImperialUnits ? "°F" : "°C";

  return {
    t,
    weatherInfo,
    uvDetails,
    formattedHigh,
    formattedLow,
    tempUnit,
    formattedWind,
    formattedSunrise,
    formattedSunset,
  };
};
