import React from "react";
import { StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useWeather } from "../context/WeatherContext";
import { formatForecastDate } from "../utils/dateScreen.helpers";
import { StatsCard } from "./DateScreen/StatsCard";
import HourlyConditions from "../components/HourlyConditions";
import { RouteProp } from "@react-navigation/native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "./DateScreen/BackButton";
import DayTitle from "./DateScreen/DayTitle";
import { filterHourlyDataForDate } from "../utils/weatherUtils";
import SunTimes from "./DateScreen/SunTimes";

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

  const selectedDay = weather.daily?.find(day => day.date === date);
  const selectedDateHourly = filterHourlyDataForDate(weather?.hourly, String(date));
  if (!selectedDateHourly) return null;
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        <BackButton />
        <DayTitle title={formatForecastDate(selectedDay?.date)} />
        <StatsCard selectedForecast={selectedDay} />
        <HourlyConditions selectedDateHourly={selectedDateHourly} />
        <SunTimes dayData={selectedDay} />
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
