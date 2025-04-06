import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import React from "react";
import { ConditionalBackground } from "./WeatherCard/ConditionalBackground";
import { Details } from "./WeatherCard/Details";
import { MainInfo } from "./WeatherCard/MainInfo";
import { useWeather } from "../../context/WeatherContext";
import { useLocationContext } from "../../context/LocationContext";

export default function WeatherCard() {
  const { location, loading: locationLoading, error: locationError } = useLocationContext();
  const { weather, loading } = useWeather();
  // TODO: You might want to show locationLoading or locationError here
  if (locationLoading) {
    // Optional: Render a loading state specifically for location
  }
  if (locationError) {
    // Optional: Render an error state specifically for location
  }

  console.log(
    `[WeatherCard] Re-rendering. Loading: ${loading}, Location: ${location?.displayName}, Weather Temp: ${weather?.current?.temperature}`,
  );
  const displayName = location
    ? location.displayName
    : locationLoading
    ? "Loading Location..."
    : "Unknown Location";

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
