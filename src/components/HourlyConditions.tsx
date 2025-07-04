import { ImageSource } from "expo-image";
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

import { THEME_COLORS_DARK, THEME_COLORS_LIGHT } from "../constants/colors";
import {
  HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL,
  HOURLY_CONDITIONS_CHART_HEIGHT,
  HOURLY_CONDITIONS_DETAILS_ROW_HEIGHT,
  HOURLY_CONDITIONS_POINT_ITEM_WIDTH,
  HOURLY_CONDITIONS_VALUES_ROW_HEIGHT,
} from "../constants/ui";
import { useSettings } from "../context/SettingsContext";
import { useWeather } from "../context/WeatherContext";
import HourlyConditionsSkeleton from "../screens/HomeScreen/HourlyConditionsSkeleton";
import { HourWeather } from "../types/weather";
import {
  GraphDataPoint,
  MetricType,
  getMetricDataForForecast,
} from "../utils/metricData";
import { filterHourlyWeatherForNext24HoursIncludingNow } from "../utils/weatherUtils";
import Card from "./Common/Card";
import Divider from "./Common/Divider";
import Text from "./Common/Text";
import LineChart from "./Graph/LineChart";
import MetricSelector from "./Graph/MetricSelector";
import HourDetail from "./Hourly/HourDetail";
import HourValue from "./Hourly/HourValue";

const screenWidth = Dimensions.get("window").width;

export default function HourlyConditions({
  selectedHoursData,
}: {
  selectedHoursData?: HourWeather[];
}) {
  const { weather, loading } = useWeather();
  const hourlyWeather = weather?.hourly;

  const getHourlyData = useCallback(() => {
    return (
      selectedHoursData ||
      filterHourlyWeatherForNext24HoursIncludingNow(hourlyWeather)
    );
  }, [selectedHoursData, hourlyWeather]);

  const hourlyData = useMemo(() => getHourlyData(), [getHourlyData]);

  const [currentMetric, setCurrentMetric] = useState<MetricType>("temperature");
  const { settings, activeTheme, translatedWeatherDescriptions } =
    useSettings();
  const { t } = useTranslation();
  const theme = activeTheme === "dark" ? THEME_COLORS_DARK : THEME_COLORS_LIGHT;
  const styles = hourlyStyles(theme);

  const graphData: GraphDataPoint[] | undefined = useMemo(() => {
    return getMetricDataForForecast(
      currentMetric,
      hourlyData,
      settings.useImperialUnits
    );
  }, [currentMetric, hourlyData, settings.useImperialUnits]);

  const numDataPoints = graphData?.length || 0;
  const availableScrollWidth =
    screenWidth - HOURLY_CONDITIONS_CARD_PADDING_HORIZONTAL * 2;

  const internalContentWidth = useMemo(() => {
    if (numDataPoints < 1) return availableScrollWidth;
    const calculatedWidth = numDataPoints * HOURLY_CONDITIONS_POINT_ITEM_WIDTH;
    return Math.max(calculatedWidth, availableScrollWidth);
  }, [numDataPoints, availableScrollWidth]);

  const xStep = HOURLY_CONDITIONS_POINT_ITEM_WIDTH;

  const getIconForHour = (hour: HourWeather): ImageSource | undefined => {
    const image =
      translatedWeatherDescriptions[hour.weatherCode]?.[
        hour.isDay ? "day" : "night"
      ]?.image;
    return typeof image === "number" ? (image as ImageSource) : undefined;
  };

  const chartAreaMinHeight =
    HOURLY_CONDITIONS_VALUES_ROW_HEIGHT +
    HOURLY_CONDITIONS_CHART_HEIGHT +
    HOURLY_CONDITIONS_DETAILS_ROW_HEIGHT +
    10;

  if (loading && !hourlyWeather) {
    return <HourlyConditionsSkeleton />;
  }

  const chartColor = graphData?.[0]?.color || theme.primary;
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
        {graphData && numDataPoints > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="rounded-lg overflow-hidden"
            contentContainerStyle={[
              styles.chartScrollContent,
              { width: internalContentWidth },
              internalContentWidth < availableScrollWidth
                ? {
                    paddingLeft:
                      (availableScrollWidth - internalContentWidth) / 2,
                  }
                : {},
            ]}
          >
            <View>
              <View style={styles.valuesRow}>
                {graphData.map((pointData, index) => (
                  <HourValue
                    key={`value-${index}`}
                    value={pointData.value}
                    width={xStep}
                  />
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
                  const hour = hourlyData?.[index];
                  return (
                    <HourDetail
                      key={`detail-${index}`}
                      label={pointData.label}
                      iconSource={hour ? getIconForHour(hour) : undefined}
                      width={xStep}
                    />
                  );
                })}
              </View>
            </View>
          </ScrollView>
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
