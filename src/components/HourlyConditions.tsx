import React from "react";
import { StyleSheet, View } from "react-native";

import { THEME_COLORS_DARK, THEME_COLORS_LIGHT } from "../constants/colors";
import {
  HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL,
  HOURLY_CONDITIONS_CHART_HEIGHT,
  HOURLY_CONDITIONS_DETAILS_ROW_HEIGHT,
  HOURLY_CONDITIONS_VALUES_ROW_HEIGHT,
} from "../constants/ui";
import { useHourlyConditions } from "../hooks/useHourlyConditions";
import HourlyConditionsSkeleton from "../screens/HomeScreen/HourlyConditionsSkeleton";
import { HourWeather } from "../types/weather";
import Card from "./Common/Card";
import Divider from "./Common/Divider";
import Text from "./Common/Text";
import MetricSelector from "./Graph/MetricSelector";
import { ChartContent } from "./Hourly/ChartContent";

export default function HourlyConditions({
  selectedHoursData,
}: {
  selectedHoursData?: HourWeather[];
}) {
  const {
    t,
    loading,
    hourlyWeather,
    hourlyData,
    currentMetric,
    setCurrentMetric,
    graphData,
    numDataPoints,
    internalContentWidth,
    availableScrollWidth,
    getIconForHour,
    theme,
    chartColor,
  } = useHourlyConditions(selectedHoursData);

  const styles = hourlyStyles(theme);
  const chartAreaMinHeight =
    HOURLY_CONDITIONS_VALUES_ROW_HEIGHT +
    HOURLY_CONDITIONS_CHART_HEIGHT +
    HOURLY_CONDITIONS_DETAILS_ROW_HEIGHT +
    10;

  if (loading && !hourlyWeather) {
    return <HourlyConditionsSkeleton />;
  }

  return (
    <Card className="overflow-hidden" elevated>
      <View style={styles.headerSection}>
        <Text className="font-medium">{t("weather.hourly_title")}</Text>
      </View>
      <View style={styles.selectorSection}>
        <MetricSelector
          currentMetric={currentMetric}
          setCurrentMetric={setCurrentMetric}
        />
      </View>
      <Divider
        style={{ marginHorizontal: HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL }}
      />
      <View
        style={[styles.chartOuterContainer, { minHeight: chartAreaMinHeight }]}
      >
        {graphData && numDataPoints > 0 && hourlyData ? (
          <ChartContent
            graphData={graphData}
            hourlyData={hourlyData}
            internalContentWidth={internalContentWidth}
            availableScrollWidth={availableScrollWidth}
            chartColor={chartColor}
            getIconForHour={getIconForHour}
            styles={styles}
          />
        ) : (
          <View
            style={[
              styles.placeholderWrapper,
              { minHeight: chartAreaMinHeight },
            ]}
          >
            <HourlyConditionsSkeleton />
          </View>
        )}
      </View>
    </Card>
  );
}

const hourlyStyles = (
  theme: typeof THEME_COLORS_LIGHT | typeof THEME_COLORS_DARK
) =>
  StyleSheet.create({
    headerSection: {
      paddingHorizontal: HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL,
      paddingTop: 16,
    },
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
    placeholderWrapper: { justifyContent: "center", alignItems: "center" },
  });
