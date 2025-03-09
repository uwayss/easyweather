import React from "react";
import { ForecastDay } from "../../types/weather";
import { Text, Button, Card } from "react-native-paper";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "./styles";

export function StatsCard({
  selectedForecast,
  weatherCondition,
}: {
  selectedForecast: ForecastDay;
  weatherCondition: string;
}) {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <>
          <View style={styles.weatherHeader}>
            <Text variant="headlineSmall">{weatherCondition}</Text>
          </View>

          <View style={styles.temperatureContainer}>
            <View style={styles.temperatureItem}>
              <Text variant="labelLarge">High</Text>
              <Text variant="headlineMedium">{Math.round(selectedForecast.maxTemp)}°</Text>
            </View>

            <View style={styles.temperatureItem}>
              <Text variant="labelLarge">Low</Text>
              <Text variant="headlineMedium">{Math.round(selectedForecast.minTemp)}°</Text>
            </View>
          </View>
        </>
      </Card.Content>
    </Card>
  );
}

export function DayTitle({ title }: { title: string }) {
  return (
    <Text variant="headlineMedium" style={styles.title}>
      {title}
    </Text>
  );
}
export function BackButton() {
  const router = useRouter();
  return (
    <Button icon="arrow-left" mode="outlined" onPress={() => router.back()} style={styles.button}>
      Back to Forecast
    </Button>
  );
}
