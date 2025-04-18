// FILE: src/screens/DateScreen/HourlyForecastCard.tsx
import React, { useMemo, useState } from "react";
import { Text, Card, Divider, useTheme, MD3Theme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { HourWeather } from "../../types/weather";
import { useSettings } from "../../context/SettingsContext";
import { getMetricDataForForecast, MetricType, GraphDataPoint } from "../../utils/metricData";
import MetricSelector from "../../components/Graph/MetricSelector";
import HourlyChart from "./HourlyChart";
import { useTranslation } from "react-i18next";

export default function HourlyForecastCard({ hourlyData }: { hourlyData: HourWeather[] }) {
  const [currentMetric, setCurrentMetric] = useState<MetricType>("temperature");
  const { settings } = useSettings();
  const theme = useTheme();
  const styles = hourlyStyles(theme);

  const graphData: GraphDataPoint[] | undefined = useMemo(
    () => getMetricDataForForecast(currentMetric, hourlyData, settings.useImperialUnits),
    [currentMetric, hourlyData, settings.useImperialUnits],
  );
  const { t } = useTranslation();
  return (
    <Card style={styles.card} mode="contained">
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Text variant="titleMedium">{t("weather.hourly_forecast")}</Text>
        </View>
        <MetricSelector currentMetric={currentMetric} setCurrentMetric={setCurrentMetric} />
        <Divider style={styles.divider} />
        {graphData ? (
          <HourlyChart data={graphData} hourlySource={hourlyData} metric={currentMetric} />
        ) : (
          <Text style={styles.noDataText}>{t("weather.hourly_data_error")}</Text>
        )}
      </Card.Content>
    </Card>
  );
}

const hourlyStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {},
    content: {
      gap: 12,
      paddingBottom: 16,
    },
    header: {},
    divider: {
      marginVertical: 4,
    },
    scrollHint: {
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
