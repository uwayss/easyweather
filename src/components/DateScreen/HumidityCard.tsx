import React from "react";
import { Text, Card, Divider } from "react-native-paper";
import { FlatList, View } from "react-native";
import { styles } from "./styles";
import { ForecastHour } from "../../types/weather";
import HourProgress from "./HourProgress";

function Hour({ item }: { item: ForecastHour }) {
  const getHumidityColor = (humidity: number) => {
    if (humidity <= 30) return "#ffd166";
    if (humidity <= 60) return "#06d6a0";
    return "#118ab2";
  };
  return (
    <HourProgress
      time={item.time}
      color={getHumidityColor(item.humidity)}
      progress={item.humidity / 100}
      value={item.humidity + "%"}
    />
  );
}
export function HumidityCard({ selectedDateHourly }: { selectedDateHourly: ForecastHour[] }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.humidityTitle}>
          Hourly Humidity
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
