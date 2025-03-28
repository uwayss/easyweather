import React from "react";
import { Text, Card, Divider } from "react-native-paper";
import { FlatList, View } from "react-native";
import { styles } from "./styles";
import { ForecastHour } from "../../types/weather";
import HourProgress from "./HourProgress";

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

  return (
    <HourProgress
      color={getTemperatureColor(temp)}
      time={item.time}
      progress={tempProgress}
      value={Math.round(temp)}
    />
  );
}
export function TemperatureCard({ selectedDateHourly }: { selectedDateHourly: ForecastHour[] }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.precipitationTitle}>
          Hourly Temperature
        </Text>
        <Divider style={styles.divider} />
        <View style={styles.scrollContainer}>
          <FlatList
            horizontal
            data={selectedDateHourly}
            renderItem={Hour}
            contentContainerStyle={styles.hourlyContainer}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
          />
        </View>
        <Text style={styles.scrollHint}>Swipe to see more hours →</Text>
      </Card.Content>
    </Card>
  );
}
