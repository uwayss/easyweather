// FILE: src/screens/HomeScreen/WeatherCard/MainInfo.tsx
import React from "react";
import { StyleSheet, View, Platform } from "react-native"; // Import Platform
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { CurrentWeather } from "../../../types/weather";
import { useWeatherDescriptions } from "../../../utils/descriptions";
import { useSettings } from "../../../context/SettingsContext";
import { convertTemperature, formatTemperature } from "../../../utils/unitConversion";
import { useTranslation } from "react-i18next";

interface MainInfoProps {
  name: string;
  current: CurrentWeather | undefined;
}

export function MainInfo({ name, current }: MainInfoProps) {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const theme = useTheme();
  const timeOfDay = current?.isDay ? "day" : "night";
  const translatedDescriptions = useWeatherDescriptions();

  const description = current
    ? translatedDescriptions[current.weatherCode]?.[timeOfDay].description
    : null;

  // Text color should be high contrast against backgrounds + overlay
  const textColor = theme.colors.surface; // White/Off-white usually works well

  // Add text shadow for readability
  const textShadowStyle = Platform.select({
    ios: {
      textShadowColor: "rgba(0, 0, 0, 0.5)",
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    android: undefined,
  });

  return (
    <View style={styles.mainInfoContainer}>
      {current ? (
        <>
          <Text
            style={[styles.locationName, { color: textColor }, textShadowStyle]}
            numberOfLines={1}
            ellipsizeMode="tail"
            variant="titleMedium" // Adjusted variant back
          >
            {name}
          </Text>
          <Text style={[styles.temperature, { color: textColor }, textShadowStyle]}>
            {current
              ? formatTemperature(
                  convertTemperature(current.temperature, settings.useImperialUnits),
                  settings.useImperialUnits,
                ).replace(/°[CF]$/, "°")
              : "--"}
            <Text style={[styles.temperatureUnit, { color: textColor }]}>
              {current ? (settings.useImperialUnits ? "F" : "C") : ""}
            </Text>
          </Text>
          <Text
            variant="headlineSmall" // Adjusted variant back
            style={[styles.description, { color: textColor }, textShadowStyle]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {description || ""}
          </Text>
          <Text
            variant="titleMedium" // Adjusted variant back
            style={[styles.feelsLike, { color: textColor, opacity: 0.9 }, textShadowStyle]} // Slightly less opacity
          >
            {t("weather.feltTemperature")}
            {current
              ? formatTemperature(
                  convertTemperature(current.feltTemp, settings.useImperialUnits),
                  settings.useImperialUnits,
                )
              : "--"}
          </Text>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainInfoContainer: {
    // This container now directly holds the text elements
    flex: 1, // Takes up available space above Details
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    paddingHorizontal: 16, // Padding for the text block
    paddingTop: 20, // Add padding at the top
  },
  locationName: {
    textAlign: "center",
    width: "100%",
    marginBottom: 8, // Space below location
  },
  temperature: {
    fontWeight: "bold",
    fontSize: 72, // Make temp prominent
    lineHeight: 80, // Adjust line height
    textAlign: "center",
  },
  temperatureUnit: {
    fontSize: 28, // Adjust unit size relative to temp
    fontWeight: "300",
  },
  description: {
    marginTop: 6, // Space above description
    textAlign: "center",
    fontWeight: "500", // Medium weight for description
  },
  feelsLike: {
    marginTop: 8, // Space above feels like
    textAlign: "center",
  },
});
