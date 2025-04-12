import React, { useMemo, useState } from "react";
import { Text, Card, Divider, useTheme, MD3Theme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { HourWeather } from "../types/weather";
import { useSettings } from "../context/SettingsContext";
import { getMetricDataForForecast, MetricType, GraphDataPoint } from "../utils/metricData";
import MetricSelector from "./Graph/MetricSelector";
import PlaceholderCard from "./PlaceholderCard";
import { useTranslation } from "react-i18next";
import HourlyChart from "../screens/DateScreen/HourlyChart";

export default function HourlyConditions({
  selectedDateHourly,
}: {
  selectedDateHourly: HourWeather[] | undefined;
}) {
  const [currentMetric, setCurrentMetric] = useState<MetricType>("temperature");
  const { settings } = useSettings();
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = hourlyStyles(theme);

  const graphData: GraphDataPoint[] | undefined = useMemo(
    () => getMetricDataForForecast(currentMetric, selectedDateHourly, settings.useImperialUnits),
    [currentMetric, selectedDateHourly, settings.useImperialUnits],
  );

  return (
    <Card style={styles.card} mode="contained">
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Text variant="titleMedium">{t("weather.hourly_title")}</Text>
        </View>
        <MetricSelector currentMetric={currentMetric} setCurrentMetric={setCurrentMetric} />
        <Divider style={styles.divider} />
        {graphData ? (
          <HourlyChart
            data={graphData}
            hourlySource={selectedDateHourly || []}
            metric={currentMetric}
          />
        ) : (
          <PlaceholderCard withoutContainer />
        )}
      </Card.Content>
    </Card>
  );
}
const hourlyStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {
      marginBottom: 16,
    },
    content: {
      gap: 12,
      paddingBottom: 16,
    },
    header: {},
    divider: {
      marginVertical: 4,
    },
    noDataText: {
      textAlign: "center",
      paddingVertical: 20,
      color: theme.colors.onSurfaceVariant,
    },
  });
