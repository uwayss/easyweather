// FILE: src/screens/HomeScreen/NextDays/ForecastItem.tsx
import { getAnalytics } from "@react-native-firebase/analytics";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";

import Card from "../../../components/Common/Card";
import Text from "../../../components/Common/Text";
import { useSettings } from "../../../context/SettingsContext";
import { useWeather } from "../../../context/WeatherContext";
import { DayWeather } from "../../../types/weather";
import { useWeatherDescriptions } from "../../../utils/descriptions";
import { convertTemperature, formatTemperature } from "../../../utils/unitConversion";
import { filterHourlyDataForDate } from "../../../utils/weatherUtils";
import { HomeNavigationProp } from "../../Home";

interface ForecastItemProps {
  item: DayWeather;
  index: number;
}

const ForecastItem = React.memo(function ForecastItem({ item, index }: ForecastItemProps) {
  const { settings } = useSettings();
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<HomeNavigationProp>();
  const translatedDescriptions = useWeatherDescriptions();
  const { weather } = useWeather();
  const hourlyWeather = weather?.hourly;

  const { dayName, weatherDescription, formattedMaxTemp, formattedMinTemp } = useMemo(() => {
    const date = new Date(item.date);
    let dayNameStr;
    if (index === 0) {
      dayNameStr = t("forecast.today");
    } else if (index === 1) {
      dayNameStr = t("forecast.tomorrow");
    } else {
      const locale = i18n.language === "ar" ? "ar-SA" : i18n.language === "tr" ? "tr-TR" : "en-UK";
      dayNameStr = date.toLocaleDateString(locale, { weekday: "long" });
    }

    const desc = translatedDescriptions[item.weatherCode]?.day;
    const maxT = formatTemperature(
      convertTemperature(item.maxTemp, settings.useImperialUnits),
      settings.useImperialUnits,
    ).replace(/°[CF]$/, "°");
    const minT = formatTemperature(
      convertTemperature(item.minTemp, settings.useImperialUnits),
      settings.useImperialUnits,
    ).replace(/°[CF]$/, "°");

    return {
      dayName: dayNameStr,
      weatherDescription: desc,
      formattedMaxTemp: maxT,
      formattedMinTemp: minT,
    };
  }, [item, index, t, i18n.language, translatedDescriptions, settings.useImperialUnits]);

  const handlePress = useCallback(() => {
    const hourly = filterHourlyDataForDate(hourlyWeather, item.date);
    getAnalytics().logEvent("view_daily_details", {
      date: item.date,
      weather_code: item.weatherCode,
    });
    navigation.navigate("DayDetails", { dayData: item, hourlyData: hourly });
  }, [navigation, hourlyWeather, item]);

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.6}>
      <Card elevated className={`mx-2 items-center justify-between p-3 gap-1.5 w-36 h-48`}>
        <Text numberOfLines={1} className="w-full text-center font-semibold">
          {dayName}
        </Text>
        {!item.empty && weatherDescription ? (
          <FastImage
            source={weatherDescription.image}
            style={{ height: 64, width: 64 }}
            resizeMode={FastImage.resizeMode.contain}
          />
        ) : (
          <Card className="size-16" />
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
