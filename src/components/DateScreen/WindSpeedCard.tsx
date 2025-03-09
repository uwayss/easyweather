import React from "react";
import { LinearGradient } from "react-native-linear-gradient";
import { Text, Card, Divider, ProgressBar } from "react-native-paper";
import { ScrollView, View } from "react-native";
import { styles } from "./styles";
export function WindSpeedCard({ selectedDateHourly }: { selectedDateHourly: any[] }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.windTitle}>
          Hourly Wind Speed
        </Text>
        <Divider style={styles.divider} />
        <View style={styles.scrollContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
            <View style={styles.hourlyContainer}>
              {selectedDateHourly.map((hourData, index) => {
                const hourTime = new Date(hourData.time).getHours();
                const formattedHour =
                  hourTime === 0
                    ? "12 AM"
                    : hourTime === 12
                    ? "12 PM"
                    : hourTime > 12
                    ? `${hourTime - 12} PM`
                    : `${hourTime} AM`;

                // Use wind speed if available, otherwise use a placeholder
                const windSpeed = hourData.windSpeed || 0;

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
                  <View key={index} style={styles.hourlyItem}>
                    <Text style={styles.hourText}>{formattedHour}</Text>
                    <View style={styles.windBar}>
                      <ProgressBar
                        progress={windProgress}
                        color={getWindSpeedColor(windSpeed)}
                        style={styles.progressBar}
                      />
                    </View>
                    <Text style={styles.windText}>{windSpeed} km/h</Text>
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
