import React, { useState, useEffect, useMemo } from "react";
import { ScrollView, StyleSheet, InteractionManager, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import { LocationSearch } from "../components/HomeScreen/LocationSearch";
import WeatherCard from "../components/HomeScreen/WeatherCard";
import ForecastList from "../components/HomeScreen/ForecastList";
import PlaceholderCard from "../components/PlaceholderCard";
import { TemperatureCard } from "../components/DateScreen/TemperatureCard";
import { PrecipitationCard } from "../components/DateScreen/PrecipitationCard";
import { HumidityCard } from "../components/DateScreen/HumidityCard";
import { WindSpeedCard } from "../components/DateScreen/WindSpeedCard";
import { useWeather } from "../context/WeatherContext";
import { filterHourlyDataForDate } from "../utils/dateScreen.helpers";
import { ForecastHour } from "../types/weather";

export default function Home() {
  const theme = useTheme();
  const { weather } = useWeather();
  const [renderHourlyLists, setRenderHourlyLists] = useState(false);
  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      console.log("[Home] Interactions complete, rendering hourly lists...");
      setRenderHourlyLists(true);
    });
    return () => interactionPromise.cancel();
  }, []);

  const todaysHourlyData: ForecastHour[] | null | undefined = useMemo(() => {
    if (!weather?.hourly) return null;
    const todayDateString = new Date().toISOString().split("T")[0];
    const filtered = filterHourlyDataForDate(weather.hourly, todayDateString);
    return filtered?.slice(0, 24);
  }, [weather?.hourly]);

  const styles = stylesheet(theme.colors.background);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <LocationSearch />
        <WeatherCard />
        <ForecastList />
        <View>
          {renderHourlyLists && todaysHourlyData && todaysHourlyData.length > 0 ? (
            <>
              <TemperatureCard selectedDateHourly={todaysHourlyData} />
              <PrecipitationCard selectedDateHourly={todaysHourlyData} />
              <HumidityCard selectedDateHourly={todaysHourlyData} />
              <WindSpeedCard selectedDateHourly={todaysHourlyData} />
            </>
          ) : (
            <>
              <PlaceholderCard />
              <PlaceholderCard />
              <PlaceholderCard />
              <PlaceholderCard />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const stylesheet = (themeBg: string) =>
  StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: themeBg,
    },
    container: {
      flex: 1,
    },
    contentContainer: {
      padding: 16,
      gap: 20,
    },
  });
