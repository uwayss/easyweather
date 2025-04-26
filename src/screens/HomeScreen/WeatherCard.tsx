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

  // If you decide to use the skeleton again, uncomment this:
  // if (isLoading) {
  //   return <WeatherCardSkeleton />;
  // }

  const displayName = location
    ? location.displayName
    : locationLoading // Check locationLoading specifically for the text
    ? t("weather.loading_location")
    : t("weather.unknown_location");

  return (
    <Card style={styles.card}>
      <ConditionalBackground current={weather?.current}>
        {/* Card.Content provides padding and layout context if needed, but we can remove it
            if ConditionalBackground handles layout fully */}
        {/* <Card.Content style={styles.content}> */}
        <MainInfo current={weather?.current} name={displayName} />
        <Details current={weather?.current} />
        {/* </Card.Content> */}
      </ConditionalBackground>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8, // Keep vertical margin
    overflow: "hidden",
    borderRadius: 16, // Keep rounded corners
    height: 360, // Keep fixed height
  },
  // content style might not be needed if ConditionalBackground handles layout
  // content: {
  //   flex: 1, // Ensure content fills the background
  //   justifyContent: 'space-between', // Position MainInfo top, Details bottom
  //   alignItems: 'center', // Center items horizontally
  //   padding: 0, // Remove padding if handled by children/background
  // },
});
