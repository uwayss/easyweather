import React from "react";
import { LinearGradient } from "react-native-linear-gradient";
import { Text, Card, Divider, ProgressBar } from "react-native-paper";
import { ScrollView, View } from "react-native";
import { styles } from "./styles";
import { ForecastHour } from "../../types/weather";

export function HumidityCard({
  selectedDateHourly,
}: {
  selectedDateHourly: ForecastHour[] | undefined | null;
}) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.humidityTitle}>
          Hourly Humidity
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

                // Calculate humidity color based on value
                const humidity = hourData.humidity;
                const getHumidityColor = (humidity: number) => {
                  if (humidity <= 30) return "#ffd166"; // Dry - yellow
                  if (humidity <= 60) return "#06d6a0"; // Moderate - green
                  return "#118ab2"; // Humid - blue
                };

                return (
                  <View key={index} style={styles.hourlyItem}>
                    <Text style={styles.hourText}>{formattedHour}</Text>
                    <View style={styles.humidityBar}>
                      <ProgressBar
                        progress={humidity / 100}
                        color={getHumidityColor(humidity)}
                        style={styles.progressBar}
                      />
                    </View>
                    <Text style={styles.humidityText}>{humidity}%</Text>
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
