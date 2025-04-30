// FILE: src/screens/HomeScreen/WeatherCard.tsx
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import React from "react";
import { ConditionalBackground } from "./WeatherCard/ConditionalBackground";
import { Details } from "./WeatherCard/Details";
import { MainInfo } from "./WeatherCard/MainInfo";
import { useWeather } from "../../context/WeatherContext";
import { useLocationContext } from "../../context/LocationContext";
import { useTranslation } from "react-i18next";

export default function WeatherCard() {
  const { location, loading: locationLoading } = useLocationContext(); // Removed unused error
  const { weather } = useWeather(); // Renamed loading
  const { t } = useTranslation();

  const displayName = location
    ? location.displayName
    : locationLoading
    ? t("weather.loading_location")
    : t("weather.unknown_location");

  return (
    <Card style={styles.card}>
      <ConditionalBackground current={weather?.current}>
        <Card.Content style={styles.content}>
          <MainInfo current={weather?.current} name={displayName} />
          <Details current={weather?.current} />
        </Card.Content>
      </ConditionalBackground>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    overflow: "hidden",
    borderRadius: 16,
  },
  content: {
    flex: 1,
    padding: 16,
    // backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "space-around",
  },
});
