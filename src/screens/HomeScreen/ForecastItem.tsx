import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text, Card } from "react-native-paper";
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

interface ForecastItemProps {
  item: DayWeather;
  index: number;
}

const ForecastItem = React.memo(function ForecastItem({ item, index }: ForecastItemProps) {
  const { settings } = useSettings();
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<HomeNavigationProp>(); // Get navigation object
  const translatedDescriptions = useWeatherDescriptions();
  const weatherDescription = translatedDescriptions[item.weatherCode]?.day;
  const date = new Date(item.date);
  let dayName;
  if (index === 0) {
    dayName = t("forecast.today");
  } else if (index === 1) {
    dayName = t("forecast.tomorrow");
  } else {
    // Use the current language for date formatting
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
    // Navigate to the DayDetails screen with parameters
    navigation.navigate("DayDetails", { dayData: item, hourlyData: hourly });
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <Card style={[styles.card, isToday ? styles.todayCard : null]} mode="contained">
        <Card.Content style={styles.cardContent}>
          <Text variant="titleMedium" numberOfLines={1} style={styles.dayName}>
            {dayName}
          </Text>
          <Image
            source={weatherDescription.image}
            style={styles.weatherIcon}
            resizeMode="contain"
          />
          <Text variant="bodyMedium" style={styles.description} numberOfLines={1}>
            {weatherDescription.description}
          </Text>
          <View style={styles.temperatures}>
            <Text style={styles.maxTemp}>
              {formatTemperature(
                convertTemperature(item.maxTemp, settings.useImperialUnits),
                settings.useImperialUnits,
              ).replace(/°[CF]$/, "°")}
            </Text>
            <Text style={styles.minTemp}>
              {formatTemperature(
                convertTemperature(item.minTemp, settings.useImperialUnits),
                settings.useImperialUnits,
              ).replace(/°[CF]$/, "°")}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    width: 130,
    marginRight: 8,
    height: 180,
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 6,
  },
  weatherIcon: {
    width: 65,
    height: 65,
  },
  dayName: {
    width: "100%",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
  },
  description: {
    textAlign: "center",
    color: "#666",
    fontSize: 12,
  },
  temperatures: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  maxTemp: {
    fontSize: 18,
    fontWeight: "bold",
  },
  minTemp: {
    fontSize: 16,
    color: "#666",
  },
  todayCard: {
    borderWidth: 2,
    borderColor: "#006d77",
    backgroundColor: "rgba(0, 109, 119, 0.1)",
  },
});

export default ForecastItem;
