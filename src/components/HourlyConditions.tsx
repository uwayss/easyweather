import React, { useMemo, useState } from "react";
import { Text, Card, Divider } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { HourWeather } from "../types/weather";
import { useSettings } from "../context/SettingsContext";
import Graph from "./Graph/Graph";
import { getMetricDataForForecast, MetricType } from "../utils/metricData";
import MetricSelector from "./Graph/MetricSelector";
import PlaceholderCard from "./PlaceholderCard";
import { useTranslation } from "react-i18next";

export default function HourlyConditions({
  selectedDateHourly,
}: {
  selectedDateHourly: HourWeather[] | undefined;
}) {
  const [currentMetric, setCurrentMetric] = useState<MetricType>("temperature");
  const { settings } = useSettings();
  const { t } = useTranslation();

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
            {t("weather.hourly_title")}
          </Text>
        </View>
        <MetricSelector currentMetric={currentMetric} setCurrentMetric={setCurrentMetric} />
        <Divider />
        {graphData ? <Graph data={graphData} /> : <PlaceholderCard withoutContainer />}
        <Text style={styles.scrollHint}>{t("weather.hourly_scroll_hint")}</Text>
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
