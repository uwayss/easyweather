// FILE: src/components/HourlyConditions.tsx
import React, { useMemo, useState } from "react";
// Removed Card, Text imports from paper
import { StyleSheet, View, Dimensions, ScrollView, Text } from "react-native"; // Added core Text
import { useSettings } from "../context/SettingsContext";
import { getMetricDataForForecast, MetricType, GraphDataPoint } from "../utils/metricData";
import MetricSelector from "./Graph/MetricSelector";
import PlaceholderCard from "./PlaceholderCard";
import { useTranslation } from "react-i18next";
import LineChart from "./Graph/LineChart";
import { HourWeather } from "../types/weather";
import { useWeatherDescriptions } from "../utils/descriptions";
import FastImage from "react-native-fast-image";
import {
  HOURLY_CONDITIONS_POINT_ITEM_WIDTH,
  HOURLY_CONDITIONS_CHART_HEIGHT,
  HOURLY_CONDITIONS_VALUES_ROW_HEIGHT,
  HOURLY_CONDITIONS_DETAILS_ROW_HEIGHT,
  HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL,
} from "../constants/ui";

const screenWidth = Dimensions.get("window").width;

export default function HourlyConditions({
  selectedDateHourly,
}: {
  selectedDateHourly: HourWeather[] | undefined;
}) {
  const [currentMetric, setCurrentMetric] = useState<MetricType>("temperature");
  const { settings, activeTheme } = useSettings();
  const { t } = useTranslation();
  const theme = activeTheme === "dark" ? darkThemeColors : lightThemeColors;
  const styles = hourlyStyles(theme); // Keep styles for layout

  const weatherDescriptions = useWeatherDescriptions();

  const graphData: GraphDataPoint[] | undefined = useMemo(
    () => getMetricDataForForecast(currentMetric, selectedDateHourly, settings.useImperialUnits),
    [currentMetric, selectedDateHourly, settings.useImperialUnits],
  );

  const numDataPoints = graphData?.length || 0;
  const availableScrollWidth = screenWidth - HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL * 2;

  const internalContentWidth = useMemo(() => {
    if (numDataPoints < 1) return availableScrollWidth;
    const calculatedWidth = numDataPoints * HOURLY_CONDITIONS_POINT_ITEM_WIDTH;
    return Math.max(calculatedWidth, availableScrollWidth);
  }, [numDataPoints, availableScrollWidth]);

  const xStep = HOURLY_CONDITIONS_POINT_ITEM_WIDTH;

  const getIconForHour = (hour: HourWeather): number | undefined => {
    const image = weatherDescriptions[hour.weatherCode]?.[hour.isDay ? "day" : "night"]?.image;
    return typeof image === "number" ? image : undefined;
  };

  const chartAreaMinHeight =
    HOURLY_CONDITIONS_VALUES_ROW_HEIGHT +
    HOURLY_CONDITIONS_CHART_HEIGHT +
    HOURLY_CONDITIONS_DETAILS_ROW_HEIGHT +
    10;

  const chartColor = graphData?.[0]?.color || theme.primary;

  return (
    // Replace Card with View
    <View className="mb-4 bg-light-surface dark:bg-dark-surface rounded-lg shadow-sm overflow-hidden">
      <View style={styles.headerSection}>
        {/* Replace Paper Text */}
        <Text className="text-base font-medium text-light-onSurface dark:text-dark-onSurface">
          {t("weather.hourly_title")}
        </Text>
      </View>

      <View style={styles.selectorSection}>
        <MetricSelector currentMetric={currentMetric} setCurrentMetric={setCurrentMetric} />
      </View>

      <View
        className="h-px bg-light-outline dark:bg-dark-outline mx-4"
        style={{ marginHorizontal: HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL }}
      />

      <View style={[styles.chartOuterContainer, { minHeight: chartAreaMinHeight }]}>
        {graphData && numDataPoints > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="rounded-lg overflow-hidden bg-light-surfaceVariant/30 dark:bg-dark-surfaceVariant/30"
            contentContainerStyle={[
              styles.chartScrollContent,
              { width: internalContentWidth },
              internalContentWidth < availableScrollWidth
                ? { paddingLeft: (availableScrollWidth - internalContentWidth) / 2 }
                : {},
            ]}
          >
            <View>
              <View style={styles.valuesRow}>
                {graphData.map((pointData, index) => (
                  <View key={`value-${index}`} style={[styles.hourItemContainer, { width: xStep }]}>
                    {/* Replace Paper Text */}
                    <Text style={styles.valueText} numberOfLines={1}>
                      {pointData.value}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.lineChartWrapper}>
                <LineChart
                  data={graphData}
                  height={HOURLY_CONDITIONS_CHART_HEIGHT}
                  width={internalContentWidth}
                  itemWidth={xStep}
                  showPoints={true}
                  showGradient={true}
                  paddingVertical={5}
                  lineColor={chartColor}
                  gradientColor={chartColor}
                  pointRadius={4}
                  lineWidth={2}
                />
              </View>

              <View style={styles.detailsRow}>
                {graphData.map((pointData, index) => {
                  const hour = selectedDateHourly?.[index];
                  const iconSource = hour ? getIconForHour(hour) : undefined;
                  return (
                    <View
                      key={`detail-${index}`}
                      style={[styles.hourItemContainer, { width: xStep }]}
                    >
                      {iconSource ? (
                        <FastImage
                          source={iconSource}
                          style={styles.weatherIcon}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      ) : (
                        <View style={styles.weatherIcon} />
                      )}
                      {/* Replace Paper Text */}
                      <Text style={styles.labelText} numberOfLines={1}>
                        {pointData.label}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        ) : (
          <View style={[styles.placeholderWrapper, { minHeight: chartAreaMinHeight }]}>
            <PlaceholderCard withoutContainer />
          </View>
        )}
      </View>
    </View>
  );
}

// Temporary color objects
const lightThemeColors = { primary: "#006d77", onSurface: "#1f1f1f", onSurfaceVariant: "#666666" };
const darkThemeColors = { primary: "#83c5be", onSurface: "#e1e1e1", onSurfaceVariant: "#aaaaaa" };

// Keep StyleSheet for layout structure
const hourlyStyles = (theme: typeof lightThemeColors | typeof darkThemeColors) =>
  StyleSheet.create({
    // card style removed
    headerSection: { paddingHorizontal: HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL, paddingTop: 16 },
    selectorSection: {
      paddingHorizontal: HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL,
      paddingVertical: 8,
    },
    chartOuterContainer: {
      marginTop: 4,
      marginBottom: 8,
      paddingHorizontal: HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL,
    },
    chartScrollContent: { paddingVertical: 4 },
    lineChartWrapper: { height: HOURLY_CONDITIONS_CHART_HEIGHT },
    valuesRow: {
      flexDirection: "row",
      height: HOURLY_CONDITIONS_VALUES_ROW_HEIGHT,
      alignItems: "flex-end",
      paddingBottom: 4,
    },
    detailsRow: {
      flexDirection: "row",
      height: HOURLY_CONDITIONS_DETAILS_ROW_HEIGHT,
      alignItems: "center",
    },
    hourItemContainer: { height: "100%", alignItems: "center", justifyContent: "center" },
    valueText: {
      // Keep StyleSheet for complex styling involving theme
      fontWeight: "600",
      fontSize: 13,
      color: theme.onSurface,
      textAlign: "center",
    },
    weatherIcon: { width: 24, height: 24, marginBottom: 3 },
    labelText: {
      // Keep StyleSheet for complex styling involving theme
      color: theme.onSurfaceVariant,
      fontSize: 11,
      textAlign: "center",
    },
    placeholderWrapper: { justifyContent: "center", alignItems: "center" },
  });
