// FILE: src/screens/HomeScreen/ForecastItem.tsx
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { useWeatherDescriptions } from "../../utils/descriptions";
import { DayWeather } from "../../types/weather";
import { useSettings } from "../../context/SettingsContext";
import { convertTemperature, formatTemperature } from "../../utils/unitConversion";
import { filterHourlyDataForDate } from "../../utils/weatherUtils";
import { useWeather } from "../../context/WeatherContext";
import { useTranslation } from "react-i18next";
import { getAnalytics } from "@react-native-firebase/analytics";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../Home";
import Text from "../../components/Common/Text";
import Card from "../../components/Common/Card";

interface ForecastItemProps {
  item: DayWeather;
  index: number;
}

const ForecastItem = React.memo(function ForecastItem({ item, index }: ForecastItemProps) {
  const { settings } = useSettings();
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<HomeNavigationProp>();
  const translatedDescriptions = useWeatherDescriptions();
  const weatherDescription = translatedDescriptions[item.weatherCode]?.day;
  const date = new Date(item.date);
  let dayName;
  if (index === 0) {
    dayName = t("forecast.today");
  } else if (index === 1) {
    dayName = t("forecast.tomorrow");
  } else {
    const locale = i18n.language === "ar" ? "ar-SA" : i18n.language === "tr" ? "tr-TR" : "en-UK";
    dayName = date.toLocaleDateString(locale, { weekday: "long" });
  }
  const { weather } = useWeather();
  const currentDate = new Date().toISOString().split("T")[0];
  const isToday = item.date === currentDate;

  function onPress() {
    const hourly = filterHourlyDataForDate(weather?.hourly, item.date);
    getAnalytics().logEvent("view_daily_details", {
      date: item.date,
      weather_code: item.weatherCode,
    });
    navigation.navigate("DayDetails", { dayData: item, hourlyData: hourly });
  }

  const todayStyle = isToday
    ? "border-2 border-light-primary dark:border-dark-primary bg-light-primary/10 dark:bg-dark-primary/10"
    : "bg-light-surface dark:bg-dark-surface";

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <Card className={`mr-2 items-center justify-between p-3 gap-1.5 ${todayStyle} w-32 h-44`}>
        <Text numberOfLines={1} className="w-full text-center font-semibold">
          {dayName}
        </Text>
        <Image source={weatherDescription.image} className="size-16" resizeMode="contain" />
        <Text
          numberOfLines={1}
          className="text-center text-xs text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant"
        >
          {weatherDescription.description}
        </Text>
        <View className="flex-row gap-2 items-center">
          <Text className="text-lg font-bold">
            {formatTemperature(
              convertTemperature(item.maxTemp, settings.useImperialUnits),
              settings.useImperialUnits,
            ).replace(/°[CF]$/, "°")}
          </Text>
          <Text className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
            {formatTemperature(
              convertTemperature(item.minTemp, settings.useImperialUnits),
              settings.useImperialUnits,
            ).replace(/°[CF]$/, "°")}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
});

export default ForecastItem;
