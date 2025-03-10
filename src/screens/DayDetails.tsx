import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import Wrapper from "../components/index.components";
import { useWeather } from "../hooks/useWeather";
import { useLocation } from "../hooks/useLocation";
import { convertToForecastDays } from "../utils/weatherUtils";
import weatherDescriptions from "../utils/descriptions";
import { formatForecastDate, filterHourlyDataForDate } from "../utils/dateScreen.helpers";
import { BackButton, DayTitle, StatsCard } from "../components/DateScreen/StatsCard";
import { PrecipitationCard } from "../components/DateScreen/PrecipitationCard";
import { TemperatureCard } from "../components/DateScreen/TemperatureCard";
import { HumidityCard } from "../components/DateScreen/HumidityCard";
import { WindSpeedCard } from "../components/DateScreen/WindSpeedCard";
import { RouteProp } from "@react-navigation/native";

type DayDetailsParams = {
  date: string;
};

type DayDetailsRouteProp = RouteProp<{ DayDetails: DayDetailsParams }, "DayDetails">;

export default function DayDetails({ route }: { route?: DayDetailsRouteProp }) {
  let date = null;
  try {
    date = route?.params.date;
  } catch {
    date = null;
  }
  const { location } = useLocation();
  const { weather, loading, error } = useWeather(location?.latitude ?? 0, location?.longitude ?? 0);

  if (loading) return <Wrapper msg="Loading..." />;
  if (error) return <Wrapper msg={"Error: " + error} />;
  if (!weather) return <Wrapper msg="No weather data available" />;
  const forecastDays = convertToForecastDays(weather.daily);
  const selectedForecast = forecastDays.find(day => day.date === date);
  const selectedDateHourly = filterHourlyDataForDate(weather.hourly, String(date));

  if (!selectedForecast) {
    return (
      <Wrapper>
        <BackButton />
        <Text variant="headlineMedium">Forecast not found</Text>
      </Wrapper>
    );
  }

  const weatherInfo = weatherDescriptions[selectedForecast.weatherCode]?.day;

  return (
    <Wrapper>
      <ScrollView style={styles.container}>
        <BackButton />
        <DayTitle title={formatForecastDate(selectedForecast.date)} />
        <StatsCard selectedForecast={selectedForecast} weatherCondition={weatherInfo.description} />
        <PrecipitationCard selectedDateHourly={selectedDateHourly} />
        <TemperatureCard selectedDateHourly={selectedDateHourly} />
        <HumidityCard selectedDateHourly={selectedDateHourly} />
        <WindSpeedCard selectedDateHourly={selectedDateHourly} />
      </ScrollView>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    flex: 1,
  },
});
