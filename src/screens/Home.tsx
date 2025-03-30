import React, { useState, useEffect, useMemo } from "react";
import { ScrollView, StyleSheet, InteractionManager, View, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, IconButton } from "react-native-paper";
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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
type HomeProps = {
  navigation: HomeNavigationProp;
};

export default function Home({ navigation }: HomeProps) {
  const theme = useTheme();
  const { weather, fetchWeatherData, loading } = useWeather();
  const [renderHourlyLists, setRenderHourlyLists] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    console.log("Pull to refresh triggered");
    if (weather?.location) {
      setRefreshing(true);
      console.log("Fetching weather data...");
      await fetchWeatherData(weather.location.latitude, weather.location.longitude);
      console.log("Weather data fetched");
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
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
            refreshing={refreshing || loading}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      >
        {/* --- Row for Search and Settings --- */}
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

        {/* --- Rest of the content --- */}
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
