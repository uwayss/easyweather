import React from "react";
import { Text, Card, Divider } from "react-native-paper";
import { FlatList, View } from "react-native";
import { styles } from "./styles";
import { ForecastHour } from "../../types/weather";
import HourProgress from "./HourProgress";

function Hour({ item }: { item: ForecastHour }) {
  const windSpeed = item.windSpeed || 0;

  const getWindSpeedColor = (speed: number) => {
    if (speed < 5) return "#90be6d";
    if (speed < 20) return "#f9c74f";
    if (speed < 40) return "#f8961e";
    return "#f94144";
  };

  const maxWindSpeed = 60;
  const windProgress = Math.min(1, windSpeed / maxWindSpeed);
  const currentHour = new Date().getHours();
  const itemHour = new Date(item.time).getHours();
  const isCurrentHour = currentHour === itemHour;

  return (
    <View style={isCurrentHour ? styles.currentHour : null}>
      <HourProgress
        time={item.time}
        color={getWindSpeedColor(windSpeed)}
        progress={windProgress}
        value={windSpeed + " km/h"}
      />
    </View>
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
            initialNumToRender={7}
            windowSize={7}
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
