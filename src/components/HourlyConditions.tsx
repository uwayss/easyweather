import React, { useMemo, useState } from "react";
import { Text, Card, Divider } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { HourWeather } from "../types/weather";
import { useSettings } from "../context/SettingsContext";
import Graph from "./Graph/Graph";
import { getMetricDataForForecast, MetricType } from "../utils/metricData";
import MetricSelector from "./Graph/MetricSelector";

export default function HourlyConditions({
  selectedDateHourly,
}: {
  selectedDateHourly: HourWeather[];
}) {
  const [currentMetric, setCurrentMetric] = useState<MetricType>("temperature");
  const { settings } = useSettings();

  const graphData = useMemo(
    () => getMetricDataForForecast(currentMetric, selectedDateHourly, settings.useImperialUnits),
    [currentMetric, selectedDateHourly, settings.useImperialUnits],
  );
  return (
    <Card style={styles.card}>
      <Card.Content style={{ gap: 8 }}>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <Text variant="titleMedium" style={{ textAlign: "center" }}>
            The Next Hours
          </Text>
        </View>
        <MetricSelector currentMetric={currentMetric} setCurrentMetric={setCurrentMetric} />
        <Divider />
        <Graph data={graphData} />
        <Text style={styles.scrollHint}>Swipe to see more hours →</Text>
      </Card.Content>
    </Card>
  );
}
const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  scrollHint: {
    textAlign: "right",
    fontSize: 12,
    color: "#666",
    marginTop: 8,
    fontStyle: "italic",
  },
});
