import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import React from "react";
import { ConditionalBackground, Details, MainInfo } from "./WeatherCard.components";
import { useWeather } from "../context/WeatherContext";
import { useLocation } from "../hooks/useLocation";

export default function WeatherCard() {
  const { location } = useLocation();
  const { weather } = useWeather();
  return (
    <Card style={styles.card}>
      <ConditionalBackground current={weather?.current}>
        <Card.Content style={styles.content}>
          <MainInfo current={weather?.current} name={location?.displayName || "Unknown location"} />
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
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "space-around",
  },
});
