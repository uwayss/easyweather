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
import {
  HOURLY_CONDITIONS_POINT_ITEM_WIDTH,
  HOURLY_CONDITIONS_CHART_HEIGHT,
  HOURLY_CONDITIONS_VALUES_ROW_HEIGHT,
  HOURLY_CONDITIONS_DETAILS_ROW_HEIGHT,
  HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL,
} from "../constants/ui";

// Screen Width
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

  // Width Calculations
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chartScrollView} // Style the ScrollView itself
            contentContainerStyle={[
              styles.chartScrollContent,
              { width: internalContentWidth },
              internalContentWidth < availableScrollWidth
                ? { paddingLeft: (availableScrollWidth - internalContentWidth) / 2 }
                : {},
            ]}
          >
            <View>
              {/* Values Row */}
              <View style={styles.valuesRow}>
                {graphData.map((pointData, index) => (
                  <View key={`value-${index}`} style={[styles.hourItemContainer, { width: xStep }]}>
                    <Text style={styles.valueText} variant="labelLarge" numberOfLines={1}>
                      {pointData.value}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Line Chart */}
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

              {/* Icons and Labels Row */}
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
      paddingHorizontal: HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL,
      paddingTop: 16,
    },
    selectorSection: {
      paddingHorizontal: HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL,
      paddingVertical: 8,
    },
    divider: {
      marginHorizontal: HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL,
    },
    chartOuterContainer: {
      marginTop: 4,
      marginBottom: 8,
      paddingHorizontal: HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL,
    },
    chartScrollView: {
      backgroundColor: theme.colors.surfaceVariant + "30",
      borderRadius: 8,
      overflow: "hidden",
    },
    chartScrollContent: {
      paddingVertical: 4,
    },
    lineChartWrapper: {
      height: HOURLY_CONDITIONS_CHART_HEIGHT,
    },
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
    hourItemContainer: {
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    valueText: {
      fontWeight: "600",
      fontSize: 13,
      color: theme.colors.onSurface,
      textAlign: "center",
    },
    weatherIcon: {
      width: 24,
      height: 24,
      marginBottom: 3,
    },
    labelText: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 11,
      textAlign: "center",
    },
    placeholderWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },
  });
