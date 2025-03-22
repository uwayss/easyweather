import React from "react";
import { Text, Card, Divider, ProgressBar } from "react-native-paper";
import { ScrollView, View } from "react-native";
import { styles } from "./styles";
import { ForecastHour } from "../../types/weather";
export function PrecipitationCard({
  selectedDateHourly,
}: {
  selectedDateHourly: ForecastHour[] | undefined | null;
}) {
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

                return (
                  <View key={index} style={styles.hourlyItem}>
                    <Text style={styles.hourText}>{formattedHour}</Text>
                    <View style={styles.precipitationBar}>
                      <ProgressBar
                        progress={hourData.rainProb / 100}
                        color={hourData.rainProb > 50 ? "#3498db" : "#a0d2eb"}
                        style={styles.progressBar}
                      />
                    </View>
                    <Text style={styles.precipitationText}>{hourData.rainProb}%</Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <Text style={styles.scrollHint}>Swipe to see more hours →</Text>
      </Card.Content>
    </Card>
  );
}
