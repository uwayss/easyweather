import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, ActivityIndicator, InteractionManager } from "react-native";
import { useWeather } from "../context/WeatherContext";
import { convertToForecastDays } from "../utils/weatherUtils";
import { formatForecastDate, filterHourlyDataForDate } from "../utils/dateScreen.helpers";
import { BackButton, DayTitle, StatsCard } from "../components/DateScreen/StatsCard";
import { MergedConditionsCard } from "../components/DateScreen/MergedConditionsCard";
import { RouteProp } from "@react-navigation/native";
import PlaceholderCard from "../components/PlaceholderCard";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type DayDetailsParams = {
  date: string;
};

type DayDetailsRouteProp = RouteProp<{ DayDetails: DayDetailsParams }, "DayDetails">;

export default function DayDetails({ route }: { route?: DayDetailsRouteProp }) {
  if (!route) return null;
  const date = route.params.date;
  const { weather, error } = useWeather();
  const [renderLists, setRenderLists] = useState(false);
  const theme = useTheme();
  const styles = stylesheet(theme.colors.background);
  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      console.log("[DayDetails] Interactions complete, rendering lists...");
      setRenderLists(true);
    });

    return () => interactionPromise.cancel();
  }, []);

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
        {renderLists ? (
          <>
            <MergedConditionsCard selectedDateHourly={selectedDateHourly} />
          </>
        ) : (
          <>
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
          </>
        )}
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
