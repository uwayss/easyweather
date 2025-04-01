import React from "react";
import { StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useWeather } from "../context/WeatherContext";
import { convertToForecastDays } from "../utils/weatherUtils";
import { formatForecastDate, filterHourlyDataForDate } from "../utils/dateScreen.helpers";
import { StatsCard } from "./DateScreen/StatsCard";
import HourlyConditions from "../components/HourlyConditions";
import { RouteProp } from "@react-navigation/native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "./DateScreen/BackButton";
import DayTitle from "./DateScreen/DayTitle";

type DayDetailsParams = {
  date: string;
};

type DayDetailsRouteProp = RouteProp<{ DayDetails: DayDetailsParams }, "DayDetails">;

export default function DayDetails({ route }: { route?: DayDetailsRouteProp }) {
  if (!route) return null;
  const date = route.params.date;
  const { weather, error } = useWeather();
  const theme = useTheme();
  const styles = stylesheet(theme.colors.background);

  if (!weather) {
    return (
      <SafeAreaView style={styles.container}>
        <BackButton />
        <DayTitle title={formatForecastDate(date)} />
        <ActivityIndicator size="large" color="#006d77" />
      </SafeAreaView>
    );
  }
  if (error)
    return (
      <SafeAreaView style={styles.safeContainer}>
        <Text variant="headlineMedium" style={{ textAlign: "center" }}>
          {"Error: " + error}
        </Text>
      </SafeAreaView>
    );

  const forecastDays = convertToForecastDays(weather?.daily);
  const selectedForecast = forecastDays?.find(day => day.date === date);
  const selectedDateHourly = filterHourlyDataForDate(weather?.hourly, String(date));
  if (!selectedDateHourly) return null;
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        <BackButton />
        <DayTitle title={formatForecastDate(selectedForecast?.date)} />
        <StatsCard selectedForecast={selectedForecast} />
        <HourlyConditions selectedDateHourly={selectedDateHourly} />
      </ScrollView>
    </SafeAreaView>
  );
}

const stylesheet = (themeBg: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      gap: 20,
      backgroundColor: themeBg,
    },
    safeContainer: {
      flex: 1,
    },
  });
