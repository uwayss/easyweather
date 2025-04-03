// src/screens/DateScreen/HourlyForecastCard.tsx
import React, { useMemo, useState } from "react";
import { Text, Card, Divider, useTheme, MD3Theme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { HourWeather } from "../../types/weather";
import { useSettings } from "../../context/SettingsContext";
import { getMetricDataForForecast, MetricType, GraphDataPoint } from "../../utils/metricData";
import MetricSelector from "../../components/Graph/MetricSelector"; // Re-use existing selector
import HourlyChart from "./HourlyChart";

export default function HourlyForecastCard({ hourlyData }: { hourlyData: HourWeather[] }) {
  const [currentMetric, setCurrentMetric] = useState<MetricType>("temperature");
  const { settings } = useSettings();
  const theme = useTheme();
  const styles = hourlyStyles(theme);

  // We still need the processed graph data
  const graphData: GraphDataPoint[] | undefined = useMemo(
    () => getMetricDataForForecast(currentMetric, hourlyData, settings.useImperialUnits),
    [currentMetric, hourlyData, settings.useImperialUnits],
  );

  return (
    <Card style={styles.card} mode="contained">
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Text variant="titleMedium">Hourly Forecast</Text>
        </View>
        <MetricSelector currentMetric={currentMetric} setCurrentMetric={setCurrentMetric} />
        <Divider style={styles.divider} />
        {graphData ? (
          // Pass both raw hourly data (for icons) and processed graph data
          <HourlyChart data={graphData} hourlySource={hourlyData} metric={currentMetric} />
        ) : (
          <Text style={styles.noDataText}>Hourly data calculation failed.</Text>
        )}
        {/* Consider removing the swipe hint if the graph is intuitive */}
        {/* <Text style={styles.scrollHint}>Swipe to see more hours →</Text> */}
      </Card.Content>
    </Card>
  );
}
const hourlyStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {
      // backgroundColor: theme.colors.surfaceVariant,
    },
    content: {
      gap: 12, // Consistent spacing
      paddingBottom: 16, // Ensure padding at bottom
    },
    header: {
      // Optional: Add styling or icons to header
    },
    divider: {
      marginVertical: 4,
    },
    scrollHint: {
      // Kept for reference if needed
      textAlign: "right",
      fontSize: 12,
      color: theme.colors.onSurfaceVariant,
      marginTop: 8,
      fontStyle: "italic",
    },
    noDataText: {
      textAlign: "center",
      paddingVertical: 20,
      color: theme.colors.onSurfaceVariant,
    },
  });
