import React from "react";
import { View } from "react-native";
import { Text, Button, Card, ActivityIndicator } from "react-native-paper";
import { ForecastDay } from "../../types/weather";
import { styles } from "./styles";
import weatherDescriptions from "../../utils/descriptions";
import { useNavigation } from "@react-navigation/native";
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

export function DayTitle({ title }: { title: string | undefined }) {
  return (
    <View>
      {title ? (
        <Text variant="headlineMedium" style={styles.title}>
          {title}
        </Text>
      ) : (
        <ActivityIndicator style={styles.title} size="large" />
      )}
    </View>
  );
}

export function BackButton() {
  const navigation = useNavigation();
  return (
    <Button
      icon="arrow-left"
      mode="outlined"
      onPress={() => navigation.goBack()}
      style={styles.button}
    >
      Back to Forecast
    </Button>
  );
}

// Export the StatsCard component as default
export default StatsCard;
