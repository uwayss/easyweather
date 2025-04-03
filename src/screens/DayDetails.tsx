import React from "react";
import { StyleSheet, ScrollView, ActivityIndicator, View } from "react-native";
import { useWeather } from "../context/WeatherContext";
import { formatForecastDate } from "../utils/dateScreen.helpers";
import { RouteProp } from "@react-navigation/native";
import { Text, useTheme, Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { filterHourlyDataForDate } from "../utils/weatherUtils";
import { RootStackParamList } from "../../App";
import DailySummaryCard from "./DateScreen/DailySummaryCard";
import HourlyForecastCard from "./DateScreen/HourlyForecastCard";
import { useNavigation } from "@react-navigation/native";

type DayDetailsRouteProp = RouteProp<RootStackParamList, "DayDetails">;

export default function DayDetails({ route }: { route: DayDetailsRouteProp }) {
  const navigation = useNavigation();
  const date = route.params.date;
  const { weather, loading, error } = useWeather();
  const theme = useTheme();

  const selectedDay = React.useMemo(
    () => weather?.daily?.find(day => day.date === date),
    [weather?.daily, date],
  );
  const selectedDateHourly = React.useMemo(
    () => filterHourlyDataForDate(weather?.hourly, String(date)),
    [weather?.hourly, date],
  );

  const formattedTitle = formatForecastDate(selectedDay?.date);

  if (loading && !weather) {
    return (
      <SafeAreaView style={[styles.safeContainer, { backgroundColor: theme.colors.background }]}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title={formattedTitle || "Loading..."} />
        </Appbar.Header>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.safeContainer, { backgroundColor: theme.colors.background }]}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Error" />
        </Appbar.Header>
        <View style={styles.centered}>
          <Text
            variant="headlineMedium"
            style={{
              textAlign: "center",
              color: theme.colors.error,
            }}
          >
            {"Error: " + error}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!selectedDay) {
    return (
      <SafeAreaView style={[styles.safeContainer, { backgroundColor: theme.colors.background }]}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title={formattedTitle || "Details"} />
        </Appbar.Header>
        <View style={styles.centered}>
          <Text>Weather data for this day is unavailable.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={formattedTitle || "Details"} titleStyle={styles.appBarTitle} />
      </Appbar.Header>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Pass the selected day data */}
        <DailySummaryCard dayData={selectedDay} />

        {/* Pass the hourly data for that day */}
        {selectedDateHourly && selectedDateHourly.length > 0 ? (
          <HourlyForecastCard hourlyData={selectedDateHourly} />
        ) : (
          <View style={styles.centered}>
            <Text>No hourly data available for this day.</Text>
          </View>
        )}
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
    padding: 16,
    paddingTop: 8,
    gap: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  appBarTitle: {
    fontWeight: "500",
  },
});
