import React from "react";
import { ForecastDay } from "../../types/weather";
import { Text, Button, Card, ActivityIndicator } from "react-native-paper";
import { View } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import weatherDescriptions from "../../utils/descriptions";

export function StatsCard({ selectedForecast }: { selectedForecast: ForecastDay | undefined }) {
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
                {selectedForecast ? Math.round(selectedForecast.maxTemp) : ""}°
              </Text>
            </View>

            <View style={styles.temperatureItem}>
              <Text variant="labelLarge">Low</Text>
              <Text variant="headlineMedium">
                {selectedForecast ? Math.round(selectedForecast.minTemp) : ""}°
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
