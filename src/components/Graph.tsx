import React, { useState } from "react";
import { Text, Card, Divider } from "react-native-paper";
import { FlatList, View, TouchableOpacity } from "react-native";
import { styles } from "../screens/DateScreen/styles";
import { ForecastHour } from "../types/weather";
import HourProgress from "../screens/DateScreen/HourProgress";
import { useSettings } from "../context/SettingsContext";
import {
  convertTemperature,
  formatTemperature,
  convertWindSpeed,
  formatWindSpeed,
} from "../utils/unitConversion";
import { DEFAULT_TEMP_COLOR_STOPS, getTemperatureGradientColor } from "../utils/colorUtils";

type MetricType = "temperature" | "precipitation" | "humidity" | "wind";

interface HourItemProps {
  item: ForecastHour;
  metric: MetricType;
}

const Hour = React.memo(function Hour({ item, metric }: HourItemProps) {
  const { settings } = useSettings();
  const currentHour = new Date().getHours();
  const itemHour = new Date(item.time).getHours();
  const isCurrentHour = currentHour === itemHour;

  // Temperature specific calculations
  const getTemperatureData = () => {
    const tempCelsius: number = item.temperature;
    const temp = convertTemperature(tempCelsius, settings.useImperialUnits);

    // Adjust min/max temp range based on unit system
    const minTemp = settings.useImperialUnits ? 14 : -10;
    const maxTemp = settings.useImperialUnits ? 104 : 40;
    const tempProgress = Math.max(0, Math.min(1, (temp - minTemp) / (maxTemp - minTemp)));

    // Use default color stops from colorUtils
    const colorStops = DEFAULT_TEMP_COLOR_STOPS;
    const color = getTemperatureGradientColor(tempCelsius, minTemp, maxTemp, colorStops);

    return {
      progress: tempProgress,
      color,
      value: formatTemperature(temp, settings.useImperialUnits),
    };
  };

  // Precipitation specific calculations
  const getPrecipitationData = () => {
    const rainProb = item.rainProb;
    let color = "#90be6d";
    if (rainProb > 30) color = "#f9c74f";
    if (rainProb > 60) color = "#f94144";

    return {
      progress: rainProb / 100,
      color,
      value: rainProb + "%",
    };
  };

  // Humidity specific calculations
  const getHumidityData = () => {
    const humidity = item.humidity;
    let color = "#ffd166";
    if (humidity > 30) color = "#06d6a0";
    if (humidity > 60) color = "#118ab2";

    return {
      progress: humidity / 100,
      color,
      value: humidity + "%",
    };
  };

  // Wind speed specific calculations
  const getWindSpeedData = () => {
    const windSpeed = item.windSpeed || 0;
    // Convert wind speed based on user preference
    const convertedWindSpeed = convertWindSpeed(windSpeed, settings.useImperialUnits);

    // Adjust color thresholds based on unit system
    let color = "#90be6d";
    if (settings.useImperialUnits) {
      // Thresholds in mph
      if (convertedWindSpeed >= 3) color = "#f9c74f";
      if (convertedWindSpeed >= 12) color = "#f8961e";
      if (convertedWindSpeed >= 25) color = "#f94144";
    } else {
      // Thresholds in km/h
      if (convertedWindSpeed >= 5) color = "#f9c74f";
      if (convertedWindSpeed >= 20) color = "#f8961e";
      if (convertedWindSpeed >= 40) color = "#f94144";
    }

    // Adjust max wind speed based on unit system
    const maxWindSpeed = settings.useImperialUnits ? 37 : 60; // 60 km/h ≈ 37 mph
    const progress = Math.min(1, convertedWindSpeed / maxWindSpeed);

    return {
      progress,
      color,
      value: formatWindSpeed(convertedWindSpeed, settings.useImperialUnits),
    };
  };

  // Get the appropriate data based on the metric type
  const getMetricData = () => {
    switch (metric) {
      case "temperature":
        return getTemperatureData();
      case "precipitation":
        return getPrecipitationData();
      case "humidity":
        return getHumidityData();
      case "wind":
        return getWindSpeedData();
      default:
        return getTemperatureData();
    }
  };

  const metricData = React.useMemo(() => getMetricData(), [item, metric]);
  const isToday = new Date(item.time).toDateString() === new Date().toDateString();
  return (
    <HourProgress
      time={item.time}
      color={metricData.color}
      progress={metricData.progress}
      value={metricData.value}
      highlight={isCurrentHour && isToday}
    />
  );
});
function Title({ title, centered }: { title: string; centered?: boolean }) {
  return (
    <View style={styles.titleContainer}>
      <Text variant="titleMedium" style={centered ? styles.title : undefined}>
        {title}
      </Text>
    </View>
  );
}

function MetricSelector({
  metrics,
  currentMetric,
  setCurrentMetric,
}: {
  metrics: GraphItem[];
  currentMetric: MetricType;
  setCurrentMetric: React.Dispatch<React.SetStateAction<MetricType>>;
}) {
  return (
    <FlatList
      horizontal
      data={metrics}
      renderItem={({ item: button }) => (
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.tabButton, currentMetric === button.value && styles.activeTab]}
          onPress={() => setCurrentMetric(button.value as MetricType)}
        >
          <Text style={styles.tabText}>{button.label}</Text>
        </TouchableOpacity>
      )}
      // eslint-disable-next-line react/prop-types
      keyExtractor={(button: { value: string; label: string }) => button.value}
      contentContainerStyle={styles.scrollContent}
      showsHorizontalScrollIndicator={false}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={7}
      removeClippedSubviews={false}
    />
  );
}
function Items({ data, currentMetric }: { data: ForecastHour[]; currentMetric: MetricType }) {
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={({ item }) => <Hour item={item} metric={currentMetric} />}
      keyExtractor={item => item.time}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
      contentContainerStyle={styles.graphContainer}
      removeClippedSubviews={false}
    />
  );
}
interface GraphConfig {
  title?: string;
  titleCentered?: boolean;
}
interface GraphItem {
  value: string;
  label: string;
}
export function Graph({
  selectedDateHourly,
  config,
}: {
  selectedDateHourly: ForecastHour[];
  config?: GraphConfig;
}) {
  const [currentMetric, setCurrentMetric] = useState<MetricType>("temperature");

  const metricButtons: GraphItem[] = React.useMemo(
    () => [
      { value: "temperature", label: "Temperature" },
      { value: "precipitation", label: "Precipitation" },
      { value: "humidity", label: "Humidity" },
      { value: "wind", label: "Wind" },
    ],
    [],
  );

  return (
    <Card style={styles.card}>
      <Card.Content style={{ gap: 8 }}>
        {config?.title && <Title title={config.title} centered={config.titleCentered} />}
        <MetricSelector
          currentMetric={currentMetric}
          setCurrentMetric={setCurrentMetric}
          metrics={metricButtons}
        />
        <Divider />
        <Items data={selectedDateHourly} currentMetric={currentMetric} />
        <Text style={styles.scrollHint}>Swipe to see more hours →</Text>
      </Card.Content>
    </Card>
  );
}
