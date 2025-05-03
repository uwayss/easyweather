// FILE: src/screens/Home.tsx
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useCallback, useEffect } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../App";
import HourlyConditions from "../components/HourlyConditions";
import { useLocationContext } from "../context/LocationContext";
import { useWeather } from "../context/WeatherContext";
import ForecastList from "./HomeScreen/NextDays/ForecastList";
import WeatherCard from "./HomeScreen/WeatherCard";
import SearchRow from "./HomeScreen/SearchRow";
import { getAnalytics } from "@react-native-firebase/analytics";
import { useColorScheme } from "nativewind";

export type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: HomeProps) {
  const { colorScheme } = useColorScheme();
  const { weather, loading: weatherLoading, fetchWeatherData } = useWeather();
  const { location, loading: locationLoading } = useLocationContext();
  const [refreshing, setRefreshing] = useState(false);
  const isLoading = locationLoading || weatherLoading;

  // Log marker for rendering when data is available
  useEffect(() => {
    if (weather && location && !isLoading) {
      console.log("LOG_MARKER: HomeScreen - Data Available, Starting Render");
    }
  }, [weather, location, isLoading]);

  const onRefresh = useCallback(async () => {
    // ... (onRefresh code remains the same)
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

  const refreshControlColors = colorScheme === "dark" ? ["#83c5be"] : ["#006d77"];
  const refreshControlTintColor = colorScheme === "dark" ? "#83c5be" : "#006d77";

  console.log("LOG_MARKER: HomeScreen - Rendering Outer Structure"); // Log outer render

  return (
    <SafeAreaView className="flex-1 bg-light-background dark:bg-dark-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
          paddingTop: 10,
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={refreshControlColors}
            tintColor={refreshControlTintColor}
            enabled={!isLoading}
          />
        }
      >
        <SearchRow navigation={navigation} />
        <WeatherCard />
        <HourlyConditions />
        <ForecastList />
      </ScrollView>
    </SafeAreaView>
  );
}
