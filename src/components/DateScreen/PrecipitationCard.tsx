import React from "react";
import { Text, Card, Divider } from "react-native-paper";
import { FlatList, View } from "react-native";
import { styles } from "./styles";
import { ForecastHour } from "../../types/weather";
import HourProgress from "./HourProgress";

function Hour({ item }: { item: ForecastHour }) {
  const currentHour = new Date().getHours();
  const itemHour = new Date(item.time).getHours();
  const isCurrentHour = currentHour === itemHour;

  return (
    <View style={isCurrentHour ? styles.currentHour : null}>
      <HourProgress
        time={item.time}
        color={getPrecipitationColor(item.rainProb)}
        progress={item.rainProb / 100}
        value={item.rainProb + "%"}
      />
    </View>
  );
}

function getPrecipitationColor(rainProb: number) {
  if (rainProb <= 30) return "#90be6d";
  if (rainProb <= 60) return "#f9c74f";
  return "#f94144";
}
export function PrecipitationCard({ selectedDateHourly }: { selectedDateHourly: ForecastHour[] }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.precipitationTitle}>
          Hourly Precipitation
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
