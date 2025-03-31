import React from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { CurrentWeather } from "../../../types/weather";
import { useSettings } from "../../../context/SettingsContext";
import { convertWindSpeed, formatWindSpeed } from "../../../utils/unitConversion";

interface DetailsProps {
  current: CurrentWeather | undefined;
}

export function Details({ current }: DetailsProps) {
  const { settings } = useSettings();
  return (
    <View>
      <Surface style={styles.detailsContainer} elevation={5}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{current?.relative_humidity_2m}%</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Wind Speed</Text>
          <Text style={styles.detailValue}>
            {current
              ? formatWindSpeed(
                  convertWindSpeed(current.wind_speed_10m, settings.useImperialUnits),
                  settings.useImperialUnits,
                )
              : ""}
          </Text>
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 12,
    padding: 16,
    width: "100%",
    opacity: 0.85,
  },
  detailItem: {
    flex: 1,
    alignItems: "center",
  },
  separator: {
    width: 1,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.3)",
    marginHorizontal: 16,
  },
  detailLabel: {
    opacity: 0.8,
    fontSize: 14,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
  },
});
