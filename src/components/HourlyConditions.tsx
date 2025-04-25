// FILE: src/components/HourlyConditions.tsx

import React, { useMemo, useState } from "react";
import { Text, Card, Divider, useTheme, MD3Theme } from "react-native-paper";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { useSettings } from "../context/SettingsContext";
import { getMetricDataForForecast, MetricType, GraphDataPoint } from "../utils/metricData";
import MetricSelector from "./Graph/MetricSelector";
import PlaceholderCard from "./PlaceholderCard";
import { useTranslation } from "react-i18next";
import LineChart from "./Graph/LineChart";
import { HourWeather } from "../types/weather";
import { useWeatherDescriptions } from "../utils/descriptions";
import FastImage from "react-native-fast-image";
import HourlyConditionsSkeleton from "./HourlyConditionsSkeleton"; // Import skeleton

// --- Configuration ---
const POINT_ITEM_WIDTH = 60; // Slightly reduced width for potentially more items visible
const CHART_HEIGHT = 60; // Slightly reduced height
const VALUES_ROW_HEIGHT = 28;
const DETAILS_ROW_HEIGHT = 55; // Adjusted for smaller icon/label
const cardContentPaddingHorizontal = 16; // Padding inside the card, outside the scroll area

// --- Screen Width ---
const screenWidth = Dimensions.get("window").width;

export default function HourlyConditions({
  selectedDateHourly,
  isLoading, // Add isLoading prop
}: {
  selectedDateHourly: HourWeather[] | undefined;
  isLoading?: boolean; // Make optional if used elsewhere without loading state
}) {
  const [currentMetric, setCurrentMetric] = useState<MetricType>("temperature");
  const { settings } = useSettings();
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = hourlyStyles(theme);
  const weatherDescriptions = useWeatherDescriptions();

  const graphData: GraphDataPoint[] | undefined = useMemo(
    () => getMetricDataForForecast(currentMetric, selectedDateHourly, settings.useImperialUnits),
    [currentMetric, selectedDateHourly, settings.useImperialUnits],
  );

  // --- Width Calculations ---
  const numDataPoints = graphData?.length || 0;
  // The width available *inside* the card for the scrollable content
  const availableScrollWidth = screenWidth - cardContentPaddingHorizontal * 2;

  // Calculate the total width needed for all the hourly items
  const internalContentWidth = useMemo(() => {
    if (numDataPoints < 1) return availableScrollWidth;
    // Use precise calculation based on item width
    const calculatedWidth = numDataPoints * POINT_ITEM_WIDTH;
    // Ensure the content width is at least the screen width to avoid empty space if few items
    return Math.max(calculatedWidth, availableScrollWidth);
  }, [numDataPoints, availableScrollWidth]);

  // Horizontal distance between the center of each item column
  const xStep = POINT_ITEM_WIDTH;
  // --- End Width Calculations ---

  const getIconForHour = (hour: HourWeather): number | undefined => {
    const image = weatherDescriptions[hour.weatherCode]?.[hour.isDay ? "day" : "night"]?.image;
    return typeof image === "number" ? image : undefined;
  };

  // Total minimum height for the chart section inside the card
  const chartAreaMinHeight = VALUES_ROW_HEIGHT + CHART_HEIGHT + DETAILS_ROW_HEIGHT + 10; // Added some buffer

  // Determine the color for the line and gradient based on the first data point or theme default
  const chartColor = graphData?.[0]?.color || theme.colors.primary;

  // Render Skeleton if loading
  if (isLoading) {
    return <HourlyConditionsSkeleton />;
  }

  return (
    <Card style={styles.card} mode="contained">
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text variant="titleMedium">{t("weather.hourly_title")}</Text>
      </View>

      {/* Metric Selector Section */}
      <View style={styles.selectorSection}>
        <MetricSelector currentMetric={currentMetric} setCurrentMetric={setCurrentMetric} />
      </View>

      {/* Divider Section */}
      <Divider style={styles.divider} />

      {/* Chart Section */}
      <View style={[styles.chartOuterContainer, { minHeight: chartAreaMinHeight }]}>
        {graphData && numDataPoints > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chartScrollView} // Style the ScrollView itself
            contentContainerStyle={[
              styles.chartScrollContent,
              { width: internalContentWidth }, // Set the precise width for the scrollable content
              // Center content horizontally *only* if it's narrower than the available space
              internalContentWidth < availableScrollWidth
                ? { paddingLeft: (availableScrollWidth - internalContentWidth) / 2 }
                : {},
            ]}
            // Optional: Snap scrolling (can feel abrupt sometimes)
            // snapToInterval={xStep}
            // decelerationRate="fast"
          >
            {/* Container for all chart-related rows, takes the full internalContentWidth */}
            <View>
              {/* === Values Row (Above Chart) === */}
              <View style={styles.valuesRow}>
                {graphData.map((pointData, index) => (
                  <View
                    key={`value-${index}`}
                    style={[styles.hourItemContainer, { width: xStep }]} // Use precise width
                  >
                    <Text style={styles.valueText} variant="labelLarge" numberOfLines={1}>
                      {pointData.value}
                    </Text>
                  </View>
                ))}
              </View>

              {/* === Line Chart === */}
              <View style={styles.lineChartWrapper}>
                <LineChart
                  data={graphData}
                  height={CHART_HEIGHT}
                  width={internalContentWidth} // SVG takes full calculated width
                  itemWidth={xStep} // Pass itemWidth for alignment
                  showPoints={true}
                  showGradient={true}
                  paddingVertical={5} // Small vertical padding within SVG
                  lineColor={chartColor}
                  gradientColor={chartColor}
                  pointRadius={4} // Adjusted point size
                  lineWidth={2} // Adjusted line width
                />
              </View>

              {/* === Icons and Labels Row (Below Chart) === */}
              <View style={styles.detailsRow}>
                {graphData.map((pointData, index) => {
                  const hour = selectedDateHourly?.[index];
                  const iconSource = hour ? getIconForHour(hour) : undefined;
                  return (
                    <View
                      key={`detail-${index}`}
                      style={[styles.hourItemContainer, { width: xStep }]} // Use precise width
                    >
                      {iconSource ? (
                        <FastImage
                          source={iconSource}
                          style={styles.weatherIcon}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      ) : (
                        <View style={styles.weatherIcon} /> // Placeholder if no icon
                      )}
                      <Text style={styles.labelText} variant="labelMedium" numberOfLines={1}>
                        {pointData.label}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        ) : (
          // Placeholder when no data AND not loading
          <View style={[styles.placeholderWrapper, { minHeight: chartAreaMinHeight }]}>
            <PlaceholderCard withoutContainer />
          </View>
        )}
      </View>
    </Card>
  );
}

const hourlyStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {
      marginBottom: 16,
    },
    headerSection: {
      paddingHorizontal: cardContentPaddingHorizontal,
      paddingTop: 16,
    },
    selectorSection: {
      paddingHorizontal: cardContentPaddingHorizontal,
      paddingVertical: 8,
    },
    divider: {
      marginHorizontal: cardContentPaddingHorizontal,
    },
    chartOuterContainer: {
      marginTop: 4,
      marginBottom: 8,
      // This container takes padding into account
      paddingHorizontal: cardContentPaddingHorizontal,
    },
    chartScrollView: {
      // ScrollView itself fills the outer container's width
      backgroundColor: theme.colors.surfaceVariant + "30", // Apply background to scroll view
      borderRadius: 8,
      overflow: "hidden", // Clip the background
    },
    chartScrollContent: {
      // This is the content *inside* the scroll view
      // Width is set dynamically
      paddingVertical: 4, // Add some vertical padding inside scroll
    },
    lineChartWrapper: {
      height: CHART_HEIGHT,
      // No margin needed here, alignment handled by itemWidth
      // backgroundColor: 'rgba(0, 255, 0, 0.1)', // DEBUG
    },
    // --- Row Styles (Values and Details) ---
    valuesRow: {
      flexDirection: "row",
      height: VALUES_ROW_HEIGHT,
      alignItems: "flex-end", // Align values to the bottom of their space
      paddingBottom: 4, // Small space below value
      // backgroundColor: 'rgba(0,255,0,0.1)', // DEBUG
    },
    detailsRow: {
      flexDirection: "row",
      height: DETAILS_ROW_HEIGHT,
      alignItems: "center", // Vertically center icon+label group
      // backgroundColor: 'rgba(0,0,255,0.1)', // DEBUG
    },
    // --- Item Container (Used by Values and Details rows) ---
    hourItemContainer: {
      // Width is set dynamically to xStep
      height: "100%", // Takes full height of its parent row
      alignItems: "center", // Center content horizontally within the xStep width
      justifyContent: "center", // Center content vertically
      // backgroundColor: 'rgba(255,0,0,0.1)', // DEBUG: Helps visualize item bounds
      // paddingHorizontal: 2, // Add tiny horizontal padding if needed
    },
    // --- Element Styles ---
    valueText: {
      fontWeight: "600",
      fontSize: 13, // Slightly smaller value font
      color: theme.colors.onSurface,
      textAlign: "center",
    },
    weatherIcon: {
      width: 24, // *** DECREASED ICON SIZE ***
      height: 24, // *** DECREASED ICON SIZE ***
      marginBottom: 3, // Adjusted margin
    },
    labelText: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 11, // Kept small label font
      textAlign: "center",
    },
    placeholderWrapper: {
      // No horizontal padding needed here, handled by outer container
      justifyContent: "center",
      alignItems: "center",
    },
  });
