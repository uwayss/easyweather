import React from "react";
import { Text, Card, Divider, ProgressBar } from "react-native-paper";
import { ScrollView, View } from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
export function PrecipitationCard({ selectedDateHourly }: { selectedDateHourly: any[] }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.precipitationTitle}>
          Hourly Precipitation
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

                return (
                  <View key={index} style={styles.hourlyItem}>
                    <Text style={styles.hourText}>{formattedHour}</Text>
                    <View style={styles.precipitationBar}>
                      <ProgressBar
                        progress={hourData.precipitationProbability / 100}
                        color={hourData.precipitationProbability > 50 ? "#3498db" : "#a0d2eb"}
                        style={styles.progressBar}
                      />
                    </View>
                    <Text style={styles.precipitationText}>
                      {hourData.precipitationProbability}%
                    </Text>
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
