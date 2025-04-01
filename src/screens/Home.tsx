import React, { useState, useMemo } from "react";
import { ScrollView, StyleSheet, View, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, IconButton } from "react-native-paper";
import { LocationSearch } from "./HomeScreen/LocationSearch";
import WeatherCard from "./HomeScreen/WeatherCard";
import ForecastList from "./HomeScreen/ForecastList";
import PlaceholderCard from "../components/PlaceholderCard";
import { MergedConditionsCard } from "../components/HourlyConditions";
import { useWeather } from "../context/WeatherContext";
import { useLocationContext } from "../context/LocationContext";
import { filterHourlyDataForDate } from "../utils/dateScreen.helpers";
import { ForecastHour } from "../types/weather";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

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

  const todaysHourlyData: ForecastHour[] | null | undefined = useMemo(() => {
    if (!weather?.hourly) return null;
    const todayDateString = new Date().toISOString().split("T")[0];
    const filtered = filterHourlyDataForDate(weather.hourly, todayDateString);
    return filtered?.slice(0, 24);
  }, [weather?.hourly]);

  const styles = stylesheet(theme.colors.background, theme.colors.onSurface);

  return (
    <SafeAreaView style={styles.safeContainer}>
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
            iconColor={styles.settingsIcon.color}
            size={28}
            onPress={() => navigation.navigate("Settings")}
            style={styles.settingsIcon}
            accessibilityLabel="Open settings"
          />
        </View>
        <WeatherCard />
        <ForecastList />
        <View>
          {todaysHourlyData && todaysHourlyData.length > 0 ? (
            <MergedConditionsCard selectedDateHourly={todaysHourlyData} />
          ) : (
            // <Graph data={getMetricDataForForecast("temperature", todaysHourlyData, false)} />
            <PlaceholderCard />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const stylesheet = (themeBg: string, textColor: string) =>
  StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: themeBg,
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
      color: textColor,
    },
  });
