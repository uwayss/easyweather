import { useRouter } from "expo-router";
import { useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSettings } from "../context/SettingsContext";
import { useWeather } from "../context/WeatherContext";
import { DayWeather } from "../types/weather";
import { convertTemperature, formatTemperature } from "../utils/unitConversion";
import { filterHourlyDataForDate } from "../utils/weatherUtils";

export const useForecastItem = (item: DayWeather, index: number) => {
  const { settings, translatedWeatherDescriptions } = useSettings();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { weather } = useWeather();
  const hourlyWeather = weather?.hourly;

  const { dayName, weatherDescription, formattedMaxTemp, formattedMinTemp } =
    useMemo(() => {
      const date = new Date(item.date);
      let dayNameStr;
      if (index === 0) {
        dayNameStr = t("forecast.today");
      } else if (index === 1) {
        dayNameStr = t("forecast.tomorrow");
      } else {
        const locale =
          i18n.language === "ar"
            ? "ar-SA"
            : i18n.language === "tr"
            ? "tr-TR"
            : "en-UK";
        dayNameStr = date.toLocaleDateString(locale, { weekday: "long" });
      }

      const desc = translatedWeatherDescriptions[item.weatherCode]?.day;
      const maxT = formatTemperature(
        convertTemperature(item.maxTemp, settings.useImperialUnits),
        settings.useImperialUnits
      ).replace(/°[CF]$/, "°");
      const minT = formatTemperature(
        convertTemperature(item.minTemp, settings.useImperialUnits),
        settings.useImperialUnits
      ).replace(/°[CF]$/, "°");

      return {
        dayName: dayNameStr,
        weatherDescription: desc,
        formattedMaxTemp: maxT,
        formattedMinTemp: minT,
      };
    }, [
      item,
      index,
      t,
      i18n.language,
      translatedWeatherDescriptions,
      settings.useImperialUnits,
    ]);

  const handlePress = useCallback(() => {
    const hourly = filterHourlyDataForDate(hourlyWeather, item.date);

    const paramsForNavigation: Record<string, string> = {
      dayData: JSON.stringify(item),
    };
    if (hourly) {
      paramsForNavigation.hourlyData = JSON.stringify(hourly);
    }
    router.push({
      pathname: "/details",
      params: paramsForNavigation,
    });
  }, [router, hourlyWeather, item]);

  return {
    dayName,
    weatherDescription,
    formattedMaxTemp,
    formattedMinTemp,
    handlePress,
  };
};
