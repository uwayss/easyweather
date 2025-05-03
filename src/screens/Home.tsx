// FILE: src/screens/Home.tsx
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useMemo, useCallback } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../App";
import HourlyConditions from "../components/HourlyConditions";
import { useLocationContext } from "../context/LocationContext";
import { useWeather } from "../context/WeatherContext";
import { filterHourlyWeatherForNext24HoursIncludingNow } from "../utils/weatherUtils";
import ForecastList from "./HomeScreen/ForecastList";
import WeatherCard from "./HomeScreen/WeatherCard";
import SearchRow from "./HomeScreen/SearchRow";
import { getAnalytics } from "@react-native-firebase/analytics";
import { useColorScheme } from "nativewind"; // Import useColorScheme

export type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: HomeProps) {
  // Removed theme usage
  const { colorScheme } = useColorScheme(); // Get color scheme for potential specific styling
  const { weather, loading: weatherLoading, fetchWeatherData } = useWeather();
  const { location, loading: locationLoading } = useLocationContext();
  const [refreshing, setRefreshing] = useState(false);

  const isLoading = locationLoading || weatherLoading;

  const onRefresh = useCallback(async () => {
    if (!location) {
      setRefreshing(false);
      return;
    }
    setRefreshing(true);
    try {
      getAnalytics().logEvent("pull_to_refresh");
      await fetchWeatherData(location.latitude, location.longitude);
    } catch (e) {
      console.error("Refresh error:", e);
    } finally {
      setRefreshing(false);
    }
  }, [location, fetchWeatherData]);

  const todaysHourlyData = useMemo(
    () => filterHourlyWeatherForNext24HoursIncludingNow(weather?.hourly),
    [weather?.hourly],
  );

  // Determine RefreshControl colors based on theme
  const refreshControlColors = colorScheme === "dark" ? ["#83c5be"] : ["#006d77"]; // Primary colors
  const refreshControlTintColor = colorScheme === "dark" ? "#83c5be" : "#006d77";

  return (
    // Use Tailwind for background
    <SafeAreaView className="flex-1 bg-light-background dark:bg-dark-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={refreshControlColors} // Use dynamic colors
            tintColor={refreshControlTintColor} // Use dynamic tintColor
            enabled={!isLoading}
          />
        }
      >
        <SearchRow navigation={navigation} />
        <WeatherCard />
        <HourlyConditions selectedDateHourly={todaysHourlyData} />
        <ForecastList />
      </ScrollView>
    </SafeAreaView>
  );
}

// Keep styles for contentContainer which might be complex for pure className
const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 10,
    gap: 20,
  },
});
