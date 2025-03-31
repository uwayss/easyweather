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
  metricType: MetricType;
}

const Hour = React.memo(function Hour({ item, metricType }: HourItemProps) {
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

  const metricData = React.useMemo(() => getMetricData(), [item, metricType]);

  return (
    <HourProgress
      time={item.time}
      color={metricData.color}
      progress={metricData.progress}
      value={metricData.value}
      isCurrentHour={isCurrentHour}
    />
  );
});

export function MergedConditionsCard({
  selectedDateHourly,
}: {
  selectedDateHourly: ForecastHour[];
}) {
  const [metricType, setMetricType] = useState<MetricType>("temperature");
  const flatListRef = React.useRef<FlatList>(null);

  const metricButtons = React.useMemo(
    () => [
      { value: "temperature", label: "Temperature" },
      { value: "precipitation", label: "Precipitation" },
      { value: "humidity", label: "Humidity" },
      { value: "wind", label: "Wind" },
    ],
    [],
  );

  React.useEffect(() => {
    if (flatListRef.current && selectedDateHourly.length > 0) {
      const scrollToCurrentHour = () => {
        const currentHour = new Date().getHours();
        const currentIndex = selectedDateHourly.findIndex(
          hour => new Date(hour.time).getHours() === currentHour,
        );

        if (currentIndex >= 0) {
          flatListRef.current?.scrollToIndex({
            index: currentIndex,
            animated: true,
            viewOffset: 0,
            viewPosition: 0.5,
          });
        } else {
          // Fallback to scroll to middle if current hour not found
          flatListRef.current?.scrollToOffset({
            offset: (selectedDateHourly.length * 130) / 2 - 65,
            animated: true,
          });
        }
      };

      // Add small delay to ensure list is rendered
      const timer = setTimeout(scrollToCurrentHour, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedDateHourly]);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <Text variant="titleMedium" style={styles.precipitationTitle}>
            The Next Hours
          </Text>
        </View>
        <View style={styles.scrollContainer}>
          <FlatList
            horizontal
            data={metricButtons}
            renderItem={({ item: button }) => (
              <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.tabButton, metricType === button.value && styles.activeTab]}
                onPress={() => setMetricType(button.value as MetricType)}
              >
                <Text style={styles.tabText}>{button.label}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={button => button.value}
            contentContainerStyle={styles.scrollContent}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={7}
            removeClippedSubviews={false}
          />
        </View>
        <Divider style={styles.divider} />
        <FlatList
          ref={flatListRef}
          horizontal
          data={selectedDateHourly}
          renderItem={({ item }) => <Hour item={item} metricType={metricType} />}
          keyExtractor={item => item.time}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          contentContainerStyle={styles.hourlyContainer}
          removeClippedSubviews={false}
          onScrollToIndexFailed={() => {
            // Fallback to manual scrolling if automatic fails
            flatListRef.current?.scrollToEnd();
          }}
        />
        <Text style={styles.scrollHint}>Swipe to see more hours →</Text>
      </Card.Content>
    </Card>
  );
}
