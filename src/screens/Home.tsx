import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
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
import { useMemo } from "react";
import MobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";

// Set global ad content rating to family-friendly
MobileAds().setRequestConfiguration({
  // Set max ad content rating to family-friendly (G rating)
  maxAdContentRating: MaxAdContentRating.G,
  // Enable Google's child-directed treatment
  tagForChildDirectedTreatment: true,
  // Enable Google's under-age-of-consent treatment
  tagForUnderAgeOfConsent: true,
});

export type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: HomeProps) {
  const theme = useTheme();
  const { weather, fetchWeatherData } = useWeather();
  const [refreshing, setRefreshing] = useState(false);
  const { location } = useLocationContext();

  const onRefresh = async () => {
    console.log("Pull to refresh triggered");
    if (location) {
      setRefreshing(true);
      console.log("Fetching weather data...");
      try {
        getAnalytics().logEvent("pull_to_refresh");
        await fetchWeatherData(location.latitude, location.longitude);
        console.log("Weather data fetched");
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        setRefreshing(false);
      }
    } else {
      console.error("Cannot refresh - location is not available");
      setRefreshing(false);
    }
  };

  const todaysHourlyData = useMemo(
    () => filterHourlyWeatherForNext24HoursIncludingNow(weather?.hourly),
    [weather?.hourly],
  );

  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      >
        <SearchRow textColor={theme.colors.onSurface} navigation={navigation} />
        <WeatherCard />
        <View>
          <HourlyConditions selectedDateHourly={todaysHourlyData} />
        </View>
        <ForecastList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 10,
    gap: 20,
  },
});
