import React from "react";
import { View } from "react-native";
import { Text, Card } from "react-native-paper";
import { ForecastDay } from "../../types/weather";
import { styles } from "./styles";
import weatherDescriptions from "../../utils/descriptions";
import { useSettings } from "../../context/SettingsContext";
import { convertTemperature, formatTemperature } from "../../utils/unitConversion";

export function StatsCard({ selectedForecast }: { selectedForecast: ForecastDay | undefined }) {
  const { settings } = useSettings();
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <>
          <View style={styles.weatherHeader}>
            <Text variant="headlineSmall">
              {selectedForecast
                ? weatherDescriptions[selectedForecast.weatherCode].day.description
                : ""}
            </Text>
          </View>

          <View style={styles.temperatureContainer}>
            <View style={styles.temperatureItem}>
              <Text variant="labelLarge">High</Text>
              <Text variant="headlineMedium">
                {selectedForecast
                  ? formatTemperature(
                      convertTemperature(selectedForecast.maxTemp, settings.useImperialUnits),
                      settings.useImperialUnits,
                    ).replace(/°[CF]$/, "°")
                  : ""}
              </Text>
            </View>

            <View style={styles.temperatureItem}>
              <Text variant="labelLarge">Low</Text>
              <Text variant="headlineMedium">
                {selectedForecast
                  ? formatTemperature(
                      convertTemperature(selectedForecast.minTemp, settings.useImperialUnits),
                      settings.useImperialUnits,
                    ).replace(/°[CF]$/, "°")
                  : ""}
              </Text>
            </View>
          </View>
        </>
      </Card.Content>
    </Card>
  );
}

export default StatsCard;
