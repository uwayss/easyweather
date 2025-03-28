import React from "react";
import { Text, Card, Divider } from "react-native-paper";
import { FlatList, View } from "react-native";
import { styles } from "./styles";
import { ForecastHour } from "../../types/weather";
import HourProgress from "./HourProgress";

function Hour({ item }: { item: ForecastHour }) {
  return (
    <HourProgress
      time={item.time}
      color={item.rainProb > 50 ? "#3498db" : "#a0d2eb"}
      progress={item.rainProb / 100}
      value={item.rainProb}
    />
  );
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
