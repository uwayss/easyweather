import React, { useState } from "react";
import { Text, Card, Divider, SegmentedButtons } from "react-native-paper";
import { FlatList, View } from "react-native";
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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type MetricType = "temperature" | "precipitation" | "humidity" | "wind";

interface HourItemProps {
  item: ForecastHour;
  metricType: MetricType;
}

function Hour({ item, metricType }: HourItemProps) {
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
    switch (metricType) {
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

  const metricData = getMetricData();

  return (
    <View style={isCurrentHour ? styles.currentHour : null}>
      <HourProgress
        time={item.time}
        color={metricData.color}
        progress={metricData.progress}
        value={metricData.value}
      />
    </View>
  );
}

export function MergedConditionsCard({
  selectedDateHourly,
}: {
  selectedDateHourly: ForecastHour[];
}) {
  const [metricType, setMetricType] = useState<MetricType>("temperature");

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.precipitationTitle}>
          Hourly Conditions
        </Text>
        <SegmentedButtons
          value={metricType}
          onValueChange={value => setMetricType(value as MetricType)}
          buttons={[
            {
              value: "temperature",
              icon: ({ color }) => (
                <MaterialCommunityIcons name="thermometer" size={18} color={color} />
              ),
            },
            {
              value: "precipitation",
              icon: ({ color }) => (
                <MaterialCommunityIcons name="weather-pouring" size={18} color={color} />
              ),
            },
            {
              value: "humidity",
              icon: ({ color }) => (
                <MaterialCommunityIcons name="water-percent" size={18} color={color} />
              ),
            },
            {
              value: "wind",
              icon: ({ color }) => (
                <MaterialCommunityIcons name="weather-windy" size={18} color={color} />
              ),
            },
          ]}
          density="small"
          theme={{ roundness: 1 }}
        />
        <Divider style={styles.divider} />
        <View style={styles.scrollContainer}>
          <FlatList
            horizontal
            data={selectedDateHourly}
            renderItem={({ item }) => <Hour item={item} metricType={metricType} />}
            initialNumToRender={7}
            windowSize={7}
            contentContainerStyle={styles.hourlyContainer}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
          />
        </View>
        <Text style={styles.scrollHint}>Swipe to see more hours →</Text>
      </Card.Content>
    </Card>
  );
}
