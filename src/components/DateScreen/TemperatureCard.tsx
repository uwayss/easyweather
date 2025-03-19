import React from "react";
import { LinearGradient } from "react-native-linear-gradient";
import { Text, Card, Divider, ProgressBar } from "react-native-paper";
import { ScrollView, View } from "react-native";
import { styles } from "./styles";
import { ForecastHour } from "../../types/weather";

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
              {selectedDateHourly?.map((hourData, index) => {
                const hourTime = new Date(hourData.time).getHours();
                const formattedHour =
                  hourTime === 0
                    ? "12 AM"
                    : hourTime === 12
                    ? "12 PM"
                    : hourTime > 12
                    ? `${hourTime - 12} PM`
                    : `${hourTime} AM`;

                // Calculate temperature color based on value
                const temp: number = hourData.temperature;
                const getTemperatureColor = (temp: number) => {
                  if (temp <= 0) return "#9dc0e8"; // Cold blue
                  if (temp <= 10) return "#69a3db"; // Cool blue
                  if (temp <= 20) return "#4cd2c0"; // Teal
                  if (temp <= 25) return "#ffd166"; // Yellow
                  if (temp <= 30) return "#ff9f51"; // Orange
                  return "#ff6b6b"; // Hot red
                };

                // Calculate progress for the bar (normalized between 0-1)
                // Assuming temperature range from -10 to 40 degrees
                const minTemp = -10;
                const maxTemp = 40;
                const tempProgress = Math.max(
                  0,
                  Math.min(1, (temp - minTemp) / (maxTemp - minTemp)),
                );

                return (
                  <View key={index} style={styles.hourlyItem}>
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
              })}
            </View>
          </ScrollView>
          <LinearGradient
            colors={["transparent", "rgba(255,255,255,0.8)", "#fff"]}
            start={{ x: 0.75, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.scrollFadeGradient}
          />
        </View>
        <Text style={styles.scrollHint}>Swipe to see more hours →</Text>
      </Card.Content>
    </Card>
  );
}
