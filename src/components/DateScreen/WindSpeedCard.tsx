import React from "react";
import { Text, Card, Divider } from "react-native-paper";
import { FlatList, View } from "react-native";
import { styles } from "./styles";
import { ForecastHour } from "../../types/weather";
import HourProgress from "./HourProgress";

function Hour({ item }: { item: ForecastHour }) {
  // Use wind speed if available, otherwise use a placeholder
  const windSpeed = item.windSpeed || 0;

  // Calculate wind speed color based on value (Beaufort scale inspired)
  const getWindSpeedColor = (speed: number) => {
    if (speed < 5) return "#90be6d"; // Light - green
    if (speed < 20) return "#f9c74f"; // Moderate - yellow
    if (speed < 40) return "#f8961e"; // Strong - orange
    return "#f94144"; // Gale/Storm - red
  };

  // Calculate progress for the bar (normalized between 0-1)
  // Assuming wind speed range from 0 to 60 km/h
  const maxWindSpeed = 60;
  const windProgress = Math.min(1, windSpeed / maxWindSpeed);
  return (
    <HourProgress
      time={item.time}
      color={getWindSpeedColor(windSpeed)}
      progress={windProgress}
      value={windSpeed + " km/h"}
    />
  );
}
export function WindSpeedCard({ selectedDateHourly }: { selectedDateHourly: ForecastHour[] }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.windTitle}>
          Hourly Wind Speed
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
