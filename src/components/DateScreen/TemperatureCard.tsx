import React from "react";
import { Text, Card, Divider, ProgressBar } from "react-native-paper";
import { FlatList, ScrollView, View } from "react-native";
import { styles } from "./styles";
import { ForecastHour } from "../../types/weather";

function Hour({
  item,
}: {
  item: {
    humidity: number;
    isDay: boolean;
    rainProb: number;
    temperature: number;
    time: string;
    weatherCode: number;
    windSpeed: number;
  };
}) {
  const temp: number = item.temperature;
  // Calculate progress for the bar (normalized between 0-1). Assuming temperature range from -10 to 40 degrees
  const minTemp = -10;
  const maxTemp = 40;
  const tempProgress = Math.max(0, Math.min(1, (temp - minTemp) / (maxTemp - minTemp)));
  const getTemperatureColor = (temp: number) => {
    if (temp <= 0) return "#9dc0e8"; // Cold blue
    if (temp <= 10) return "#69a3db"; // Cool blue
    if (temp <= 20) return "#ffd166"; // Yellow
    if (temp <= 25) return "#ff9f51"; // Orange
    return "#ff6b6b"; // Hot red/Crimson
  };
  const hourTime = new Date(item.time).getHours();
  const formattedHour =
    hourTime === 0
      ? "12 AM"
      : hourTime === 12
      ? "12 PM"
      : hourTime > 12
      ? `${hourTime - 12} PM`
      : `${hourTime} AM`;
  return (
    <View style={styles.hourlyItem}>
      <Text style={styles.hourText}>{formattedHour}</Text>
      <View style={styles.temperatureBar}>
        <ProgressBar
          progress={tempProgress}
          color={getTemperatureColor(temp)}
          style={styles.temperatureProgressBar}
        />
      </View>
      <Text style={styles.temperatureText}>{Math.round(temp)}°C</Text>
    </View>
  );
}
export function TemperatureCard({
  selectedDateHourly,
}: {
  selectedDateHourly: ForecastHour[] | undefined | null;
}) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.precipitationTitle}>
          Hourly Temperature
        </Text>
        <Divider style={styles.divider} />
        <View style={styles.scrollContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
            <View style={styles.hourlyContainer}>
              <FlatList
                data={selectedDateHourly}
                renderItem={Hour}
                contentContainerStyle={{
                  flexDirection: "row",
                  paddingVertical: 8,
                  paddingRight: 20,
                }}
                removeClippedSubviews={false}
              />
            </View>
          </ScrollView>
        </View>
        <Text style={styles.scrollHint}>Swipe to see more hours →</Text>
      </Card.Content>
    </Card>
  );
}
