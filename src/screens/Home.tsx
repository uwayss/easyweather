import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../App";
import HourlyConditions from "../components/HourlyConditions";
import PlaceholderCard from "../components/PlaceholderCard";
import { useLocationContext } from "../context/LocationContext";
import { useWeather } from "../context/WeatherContext";
import { filterHourlyWeatherForToday } from "../utils/weatherUtils";
import ForecastList from "./HomeScreen/ForecastList";
import { LocationSearch } from "./HomeScreen/LocationSearch";
import WeatherCard from "./HomeScreen/WeatherCard";

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
type HomeProps = {
  navigation: HomeNavigationProp;
};

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
    () => filterHourlyWeatherForToday(weather?.hourly),
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
        <View style={styles.topRow}>
          <View style={styles.searchWrapper}>
            <LocationSearch />
          </View>
          <IconButton
            icon="cog-outline"
            iconColor={theme.colors.onSurface}
            size={28}
            onPress={() => navigation.navigate("Settings")}
            style={styles.settingsIcon}
            accessibilityLabel="Open settings"
          />
        </View>
        <WeatherCard />
        <View>
          {todaysHourlyData && todaysHourlyData.length > 0 ? (
            <HourlyConditions selectedDateHourly={todaysHourlyData} />
          ) : (
            // <Graph data={getMetricDataForForecast("temperature", todaysHourlyData, false)} />
            <PlaceholderCard />
          )}
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
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchWrapper: {
    flex: 1,
  },
  settingsIcon: {
    marginLeft: 8,
    marginRight: -8,
  },
});
