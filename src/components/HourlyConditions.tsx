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

// --- Configuration ---
const POINT_ITEM_WIDTH = 65; // *** INCREASED width for better readability ***
const CHART_HEIGHT = 65;
const VALUES_ROW_HEIGHT = 28;
const DETAILS_ROW_HEIGHT = 60;
const CHART_INTERNAL_PADDING_HORIZONTAL = 15;
const cardContentPaddingHorizontal = 16;

// --- Screen Width ---
const screenWidth = Dimensions.get("window").width;

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
  const weatherDescriptions = useWeatherDescriptions();

  const graphData: GraphDataPoint[] | undefined = useMemo(
    () => getMetricDataForForecast(currentMetric, selectedDateHourly, settings.useImperialUnits),
    [currentMetric, selectedDateHourly, settings.useImperialUnits],
  );

  // --- Width Calculations ---
  const numDataPoints = graphData?.length || 0;
  const minimumVisibleWidth = screenWidth - cardContentPaddingHorizontal * 2;

  // Calculate the width needed *inside* the ScrollView for the combined rows + chart
  const internalContentWidth = useMemo(() => {
    if (numDataPoints < 1) return minimumVisibleWidth;
    const calculatedWidth = numDataPoints * POINT_ITEM_WIDTH;
    return Math.max(calculatedWidth, minimumVisibleWidth);
  }, [numDataPoints, minimumVisibleWidth]);

  // Calculate the horizontal step between the *center* of each item column
  const xStep = POINT_ITEM_WIDTH;
  // --- End Width Calculations ---

  const getIconForHour = (hour: HourWeather): number | undefined => {
    const image = weatherDescriptions[hour.weatherCode]?.[hour.isDay ? "day" : "night"]?.image;
    return typeof image === "number" ? image : undefined;
  };

  // Total height for the chart section inside the card
  const chartAreaMinHeight = VALUES_ROW_HEIGHT + CHART_HEIGHT + DETAILS_ROW_HEIGHT;

  // Determine the color for the line and gradient based on the first data point
  const chartColor = graphData?.[0]?.color || theme.colors.primary;

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
          <View
            style={[
              styles.chartScrollViewContainer,
              { backgroundColor: theme.colors.surfaceVariant + "30" },
            ]}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                styles.chartScrollContent,
                // Add paddingRight to ensure the last item can be scrolled fully into view
                { paddingRight: CHART_INTERNAL_PADDING_HORIZONTAL },
                // Center content horizontally if it's narrower than the screen
                internalContentWidth < minimumVisibleWidth
                  ? { paddingHorizontal: (minimumVisibleWidth - internalContentWidth) / 2 }
                  : {},
              ]}
              // Optional: Helps scrolling feel less abrupt
              // snapToInterval={xStep} // Snap to each item center
              // decelerationRate="fast"
            >
              {/* Container for all chart-related rows */}
              <View style={{ width: internalContentWidth }}>
                {/* === Values Row (Above Chart) === */}
                <View
                  style={[
                    styles.valuesRow,
                    // { paddingHorizontal: CHART_INTERNAL_PADDING_HORIZONTAL }, // REMOVED padding here
                  ]}
                >
                  {graphData.map((pointData, index) => (
                    // Use precise width for alignment
                    <View
                      key={`value-${index}`}
                      style={[styles.hourItemContainer, { width: xStep }]}
                    >
                      <Text style={styles.valueText} variant="labelLarge" numberOfLines={1}>
                        {pointData.value}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* === Line Chart === */}
                <View style={styles.lineChartWrapper}>
                  {numDataPoints >= 1 ? ( // Render chart even for 1 point if showPoints is true
                    <LineChart
                      data={graphData}
                      height={CHART_HEIGHT}
                      width={internalContentWidth} // SVG takes full calculated width
                      itemWidth={xStep} // PASS itemWidth for alignment
                      showPoints={true}
                      showGradient={true}
                      // paddingHorizontal={CHART_INTERNAL_PADDING_HORIZONTAL} // REMOVED prop
                      paddingVertical={5}
                      lineColor={chartColor}
                      gradientColor={chartColor}
                      pointRadius={4}
                      lineWidth={2}
                    />
                  ) : (
                    // Placeholder only if no data at all
                    <View style={{ height: CHART_HEIGHT }} />
                  )}
                </View>

                {/* === Icons and Labels Row (Below Chart) === */}
                <View
                  style={[
                    styles.detailsRow,
                    // { paddingHorizontal: CHART_INTERNAL_PADDING_HORIZONTAL }, // REMOVED padding here
                  ]}
                >
                  {graphData.map((pointData, index) => {
                    const hour = selectedDateHourly?.[index];
                    const iconSource = hour ? getIconForHour(hour) : undefined;
                    return (
                      <View
                        key={`detail-${index}`}
                        style={[styles.hourItemContainer, { width: xStep }]}
                      >
                        {/* Icon */}
                        {iconSource ? (
                          <FastImage
                            source={iconSource}
                            style={styles.weatherIcon}
                            resizeMode={FastImage.resizeMode.contain}
                          />
                        ) : (
                          <View style={styles.weatherIcon} /> // Placeholder
                        )}
                        {/* Label */}
                        <Text style={styles.labelText} variant="labelMedium" numberOfLines={1}>
                          {pointData.label}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
          </View>
        ) : (
          // Placeholder when no data
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
      marginTop: 4, // Reduced space above chart area
      marginBottom: 8,
    },
    chartScrollViewContainer: {
      // marginHorizontal: cardContentPaddingHorizontal,
      borderRadius: 8,
      overflow: "hidden",
    },
    chartScrollContent: {
      // paddingVertical: 4, // Reduced vertical padding in scroll area
      // Removed paddingRight from here, moved to inline style above
    },
    lineChartWrapper: {
      // Added wrapper for potential vertical centering if needed later
      height: CHART_HEIGHT,
      // marginLeft: 20, // REMOVED this line to fix alignment
      // backgroundColor: 'rgba(0, 255, 0, 0.1)', // DEBUG
    },
    // --- Row Styles ---
    valuesRow: {
      flexDirection: "row",
      height: VALUES_ROW_HEIGHT,
      alignItems: "center", // Center values vertically in their row
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
      height: "100%",
      alignItems: "center", // Center content horizontally within the xStep width
      justifyContent: "center", // Center content vertically
      // backgroundColor: 'rgba(255,0,0,0.1)', // DEBUG
    },
    // --- Element Styles ---
    valueText: {
      fontWeight: "600",
      fontSize: 14, // Kept original size for now, can adjust if needed
      color: theme.colors.onSurface,
      textAlign: "center",
    },
    weatherIcon: {
      width: 26, // *** DECREASED ICON SIZE ***
      height: 26, // *** DECREASED ICON SIZE ***
      marginBottom: 2, // Added small margin below icon
    },
    labelText: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 11, // *** DECREASED FONT SIZE ***
      textAlign: "center",
    },
    placeholderWrapper: {
      paddingHorizontal: cardContentPaddingHorizontal,
      justifyContent: "center",
      alignItems: "center",
    },
  });
