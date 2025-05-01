// FILE: src\screens\Home.tsx
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useMemo, useCallback } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
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

export type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: HomeProps) {
  const theme = useTheme();
  const { weather, loading: weatherLoading, fetchWeatherData } = useWeather();
  const { location, loading: locationLoading } = useLocationContext();
  const [refreshing, setRefreshing] = useState(false);

  // Combined loading state for skeletons
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
      // Error is handled by Snackbar via context
    } finally {
      setRefreshing(false);
    }
  }, [location, fetchWeatherData]);

  const todaysHourlyData = useMemo(
    () => filterHourlyWeatherForNext24HoursIncludingNow(weather?.hourly),
    [weather?.hourly],
  );

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background }} className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
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

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 10,
    gap: 20,
  },
});
