import { getAnalytics } from "@react-native-firebase/analytics";
import { Image as ExpoImage } from "expo-image";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";

import Card from "../../../components/Common/Card";
import Text from "../../../components/Common/Text";
import { useSettings } from "../../../context/SettingsContext";
import { useWeather } from "../../../context/WeatherContext";
import { DayWeather } from "../../../types/weather";
import {
  convertTemperature,
  formatTemperature,
} from "../../../utils/unitConversion";
import { filterHourlyDataForDate } from "../../../utils/weatherUtils";

interface ForecastItemProps {
  item: DayWeather;
  index: number;
}

const ForecastItem = React.memo(function ForecastItem({
  item,
  index,
}: ForecastItemProps) {
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
    getAnalytics().logEvent("view_daily_details", {
      date: item.date,
      weather_code: item.weatherCode,
    });

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

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.6}>
      <Card
        elevated
        className={`mr-4 items-center justify-between p-3 gap-1.5 w-36 h-48`}
      >
        <Text numberOfLines={1} className="w-full text-center font-semibold">
          {dayName}
        </Text>
        {!item.empty && weatherDescription ? (
          <ExpoImage
            source={weatherDescription.image}
            style={{ height: 64, width: 64 }}
            contentFit="contain"
          />
        ) : (
          <Card className="size-16" borderType="hidden" />
        )}
        <Text
          numberOfLines={1}
          className="text-center text-xs text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant"
        >
          {!item.empty ? weatherDescription?.description || "" : ""}
        </Text>
        {!item.empty ? (
          <View className="flex-row gap-2 items-center">
            <Text className="text-lg font-bold">{formattedMaxTemp}</Text>
            <Text className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
              {formattedMinTemp}
            </Text>
          </View>
        ) : (
          <View style={{ height: 20 }} />
        )}
      </Card>
    </TouchableOpacity>
  );
});

export default ForecastItem;
