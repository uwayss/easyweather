// FILE: src/screens/HomeScreen/WeatherCard/Details.tsx
import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Text, useTheme, Icon } from "react-native-paper";
import { CurrentWeather } from "../../../types/weather";
import { useSettings } from "../../../context/SettingsContext";
import { convertWindSpeed, formatWindSpeed } from "../../../utils/unitConversion";
import { useTranslation } from "react-i18next";

interface DetailsProps {
  current: CurrentWeather | undefined;
}

export function Details({ current }: DetailsProps) {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const theme = useTheme();

  const textColor = theme.colors.surface;
  const iconColor = theme.colors.surface;

  const textShadowStyle = Platform.select({
    ios: {
      textShadowColor: "rgba(0, 0, 0, 0.5)",
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    android: {},
  });

  const formattedWind = current
    ? formatWindSpeed(
        convertWindSpeed(current.windSpeed, settings.useImperialUnits),
        settings.useImperialUnits,
      )
    : null;
  if (!current) return null;
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailItem}>
        <Icon source="water-percent" size={22} color={iconColor} />
        <View style={styles.detailTextContainer}>
          <Text style={[styles.detailValue, { color: textColor }, textShadowStyle]}>
            {current?.humidity ? `${current.humidity}%` : "--"}
          </Text>
          <Text style={[styles.detailLabel, { color: textColor, opacity: 0.85 }, textShadowStyle]}>
            {t("weather.humidity")}
          </Text>
        </View>
      </View>
      <View style={styles.detailItem}>
        <Icon source="weather-windy" size={22} color={iconColor} />
        <View style={styles.detailTextContainer}>
          <Text style={[styles.detailValue, { color: textColor }, textShadowStyle]}>
            {formattedWind}
          </Text>
          <Text style={[styles.detailLabel, { color: textColor, opacity: 0.85 }, textShadowStyle]}>
            {t("weather.wind_speed")}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,.1)",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailTextContainer: {
    alignItems: "flex-start",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  detailLabel: {
    fontSize: 12,

    marginTop: 1,
  },
});
