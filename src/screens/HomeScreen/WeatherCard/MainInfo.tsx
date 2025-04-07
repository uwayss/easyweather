import React from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
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
  const timeOfDay = current?.isDay ? "day" : "night";
  const translatedDescriptions = useWeatherDescriptions();

  const description = current
    ? translatedDescriptions[current.weatherCode]?.[timeOfDay].description
    : null;
  return (
    <View style={styles.mainInfoContainer}>
      <Surface style={styles.mainInfo} elevation={5}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationName} numberOfLines={1} ellipsizeMode="tail">
            {name}
          </Text>
        </View>
        <Text style={styles.temperature}>
          {current
            ? formatTemperature(
                convertTemperature(current.temperature, settings.useImperialUnits),
                settings.useImperialUnits,
              )
            : ""}
        </Text>
        <Text variant="headlineSmall" style={styles.description}>
          {description ? description : ""}
        </Text>
        <Text variant="titleMedium" style={styles.feelsLike}>
          {t("weather.feltTemperature")}
          {current
            ? formatTemperature(
                convertTemperature(current.feltTemp, settings.useImperialUnits),
                settings.useImperialUnits,
              ).replace(/°[CF]$/, "°")
            : ""}
        </Text>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  mainInfoContainer: {
    flex: 1,
  },
  mainInfo: {
    borderRadius: 12,
    padding: 16,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    opacity: 0.8,
  },
  temperature: {
    fontWeight: "bold",
    fontSize: 48,
  },
  description: {
    width: "100%",
    flexWrap: "wrap",
    textTransform: "uppercase",
    marginTop: 4,
    letterSpacing: 3,
    textAlign: "center",
  },
  feelsLike: {
    opacity: 0.9,
    marginTop: 8,
  },
  locationContainer: {
    borderRadius: 12,
    padding: 12,
    alignSelf: "center",
    width: "100%",
    backgroundColor: "transparent",
  },
  locationName: {
    textAlign: "center",
    width: "100%",
  },
});
