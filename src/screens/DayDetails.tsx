import React, { useEffect } from "react";
import { StyleSheet, ScrollView, ActivityIndicator, BackHandler } from "react-native";
import Wrapper from "../components/index.components";
import { useWeather } from "../context/WeatherContext";
import { convertToForecastDays } from "../utils/weatherUtils";
import { formatForecastDate, filterHourlyDataForDate } from "../utils/dateScreen.helpers";
import { BackButton, DayTitle, StatsCard } from "../components/DateScreen/StatsCard";
import { PrecipitationCard } from "../components/DateScreen/PrecipitationCard";
import { TemperatureCard } from "../components/DateScreen/TemperatureCard";
import { HumidityCard } from "../components/DateScreen/HumidityCard";
import { WindSpeedCard } from "../components/DateScreen/WindSpeedCard";

interface DayDetailsProps {
  date: string | null;
  onClose: () => void;
}

export default function DayDetails({ date, onClose }: DayDetailsProps) {
  if (!date) return null;
  const { weather, error } = useWeather();

  useEffect(() => {
    const handleBackButtonPress = () => {
      onClose();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackButtonPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonPress);
    };
  }, [onClose]);

  if (!weather) {
    return (
      <Wrapper>
        <BackButton onClose={onClose} />
        <DayTitle title={formatForecastDate(date)} />
        <ActivityIndicator size="large" color="#006d77" />
      </Wrapper>
    );
  }
  if (error) return <Wrapper msg={"Error: " + error} />;

  const forecastDays = convertToForecastDays(weather?.daily);
  const selectedForecast = forecastDays?.find(day => day.date === date);
  const selectedDateHourly = filterHourlyDataForDate(weather?.hourly, String(date));

  return (
    <Wrapper>
      <ScrollView style={styles.container}>
        <BackButton onClose={onClose} />
        <DayTitle title={formatForecastDate(selectedForecast?.date)} />
        <StatsCard selectedForecast={selectedForecast} />
        <TemperatureCard selectedDateHourly={selectedDateHourly} />
        <PrecipitationCard selectedDateHourly={selectedDateHourly} />
        <HumidityCard selectedDateHourly={selectedDateHourly} />
        <WindSpeedCard selectedDateHourly={selectedDateHourly} />
      </ScrollView>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
});
