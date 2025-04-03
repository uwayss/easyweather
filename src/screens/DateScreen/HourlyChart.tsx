// src/screens/DateScreen/HourlyChart.tsx
import { FlatList, StyleSheet, View, Image } from "react-native";
import React from "react";
import { MD3Theme, Text, useTheme } from "react-native-paper";
import { GraphDataPoint, MetricType } from "../../utils/metricData";
import { HourWeather } from "../../types/weather";
import weatherDescriptions from "../../utils/descriptions";
import CustomVerticalProgressBar from "./CustomVerticalProgressBar"; // Keep the progress bar logic

interface HourlyChartProps {
  data: GraphDataPoint[];
  hourlySource: HourWeather[]; // Need the original data for icons
  metric: MetricType;
}

const HourItem = React.memo(function HourItem({
  graphPoint,
  hourInfo,
}: {
  graphPoint: GraphDataPoint;
  hourInfo: HourWeather;
}) {
  const theme = useTheme();
  const styles = chartStyles(theme);
  const weatherIconInfo =
    weatherDescriptions[hourInfo.weatherCode]?.[hourInfo.isDay ? "day" : "night"];

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemValueText} variant="labelSmall">
        {graphPoint.value}
      </Text>
      <CustomVerticalProgressBar
        progress={graphPoint.progress}
        color={graphPoint.color}
        style={styles.customProgressBar}
        trackColor={theme.dark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"} // Theme-aware track
      />
      {weatherIconInfo && (
        <Image source={weatherIconInfo.image} style={styles.weatherIcon} resizeMode="contain" />
      )}
      <Text style={styles.itemLabelText} variant="labelSmall">
        {graphPoint.label}
      </Text>
    </View>
  );
});

export default function HourlyChart({ data, hourlySource }: HourlyChartProps) {
  const theme = useTheme();
  const styles = chartStyles(theme);

  // Basic check to ensure data arrays align, though they should if processed correctly
  if (data.length !== hourlySource.length) {
    return <Text style={styles.errorText}>Data mismatch</Text>;
  }

  return (
    <FlatList
      horizontal
      data={data} // Use the processed data for the list items
      renderItem={({ item, index }) => (
        <HourItem graphPoint={item} hourInfo={hourlySource[index]} />
      )}
      keyExtractor={item => item.time}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContentContainer}
      removeClippedSubviews={false} // Keep this false if performance is okay
    />
  );
}

const chartStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    listContentContainer: {
      paddingVertical: 8,
    },
    itemContainer: {
      alignItems: "center",
      gap: 6, // Adjusted gap
      width: 60, // Increased width for icon
      paddingHorizontal: 4,
    },
    itemValueText: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.colors.onSurface,
    },
    customProgressBar: {
      width: 12, // Slimmer bar
      height: 60, // Shorter bar
    },
    weatherIcon: {
      width: 28,
      height: 28,
    },
    itemLabelText: {
      fontSize: 11,
      color: theme.colors.onSurfaceVariant,
      textAlign: "center",
      width: "100%",
    },
    errorText: {
      color: theme.colors.error,
      textAlign: "center",
      padding: 16,
    },
  });
