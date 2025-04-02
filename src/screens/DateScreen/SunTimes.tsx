import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Icon } from "react-native-paper";
import { formatTimeStringToHour } from "../../utils/timeUtils";
import { DayWeather } from "../../types/weather";

export default function SunTimes({ dayData }: { dayData: DayWeather | undefined }) {
  return (
    <View style={styles.sunTimesContainer}>
      <View style={styles.timeContainer}>
        <Icon source="white-balance-sunny" size={24} color="#FFA726" />
        <Text variant="bodyLarge" style={styles.sunriseText}>
          {formatTimeStringToHour(dayData?.sunrise)}
        </Text>
      </View>

      <View style={styles.timeContainer}>
        <Icon source="weather-night" size={24} color="#7E57C2" />
        <Text variant="bodyLarge" style={styles.sunsetText}>
          {formatTimeStringToHour(dayData?.sunset)}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  cardContent: {
    padding: 12,
  },
  sunTimesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  timeContainer: {
    alignItems: "center",
    gap: 8,
  },
  sunriseText: {
    color: "#FFA726",
  },
  sunsetText: {
    color: "#7E57C2",
  },
});
