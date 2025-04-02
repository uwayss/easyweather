import React from "react";
import { View, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Card, Text, ActivityIndicator, useTheme } from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import { useWeather } from "../../context/WeatherContext";
import { HourWeather } from "../../types/weather";
import { useSettings } from "../../context/SettingsContext";
import { convertTemperature } from "../../utils/unitConversion";
import { filterHourlyDataForDate } from "../../utils/weatherUtils";

const screenWidth = Dimensions.get("window").width;
const PADDING_OUTSIDE_CARD = 16 * 2;

const BAR_SECTION_WIDTH = 50;

const TodayHourlyChart: React.FC = () => {
  const { weather, loading: weatherLoading } = useWeather();
  const { settings } = useSettings();
  const theme = useTheme();
  const labelColor = theme.dark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)";

  const todayDateString = new Date().toISOString().split("T")[0];

  const todaysHourlyData: HourWeather[] | null | undefined = React.useMemo(() => {
    if (!weather?.hourly) return null;
    const filtered = filterHourlyDataForDate(weather.hourly, todayDateString);
    return filtered?.slice(0, 24);
  }, [weather?.hourly, todayDateString]);

  const chartData = React.useMemo(() => {
    if (!todaysHourlyData || todaysHourlyData.length === 0) return null;
    return {
      labels: todaysHourlyData.map(() => ""),
      datasets: [
        {
          data: todaysHourlyData.map((hourData: HourWeather) =>
            Math.round(convertTemperature(hourData.temp, settings.useImperialUnits)),
          ),
        },
      ],
    };
  }, [todaysHourlyData, settings.useImperialUnits]);

  const chartConfig = React.useMemo(
    () => ({
      backgroundColor: theme.colors.surface,
      backgroundGradientFrom: theme.colors.surface,
      backgroundGradientTo: theme.colors.surface,
      decimalPlaces: 0,
      color: (opacity = 1) =>
        theme.dark ? `rgba(255, 255, 255, ${opacity * 0.8})` : `rgba(0, 0, 0, ${opacity * 0.8})`,
      barPercentage: 0.5,
      propsForBackgroundLines: {
        strokeWidth: 0,
      },
      propsForLabels: {
        fontSize: 10,
      },
    }),
    [theme],
  );

  const formatSimpleHourLabel = React.useCallback((time: string): string => {
    const date = new Date(time);
    const hour = date.getHours();
    if (hour === 0) return "12A";
    if (hour === 12) return "12P";
    if (hour < 12) return `${hour}A`;
    return `${hour - 12}P`;
  }, []);

  const calculatedChartWidth = React.useMemo(() => {
    if (!todaysHourlyData) return screenWidth - PADDING_OUTSIDE_CARD;
    return todaysHourlyData.length * BAR_SECTION_WIDTH;
  }, [todaysHourlyData]);

  if (weatherLoading) {
    return (
      <Card style={[styles.card, styles.centerContent]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </Card>
    );
  }
  if (!chartData || !todaysHourlyData) {
    return (
      <Card style={[styles.card, styles.centerContent]}>
        <Text style={styles.noDataText}>No hourly data available for today.</Text>
      </Card>
    );
  }

  return (
    <Card style={styles.card}>
      <Text style={styles.title} variant="titleMedium">
        Today&apos;s Temperature
      </Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* View to contain Chart + Custom Labels */}
        <View>
          {/* --- BarChart --- */}
          <BarChart
            data={chartData}
            width={calculatedChartWidth}
            height={180}
            yAxisLabel=""
            yAxisSuffix={settings.useImperialUnits ? "°F" : "°C"}
            chartConfig={chartConfig}
            style={styles.chart}
            withInnerLines={false}
            withHorizontalLabels={false}
            withVerticalLabels={false}
            fromZero={true}
            showValuesOnTopOfBars={true}
            showBarTops={false}
            withCustomBarColorFromData={false}
            flatColor={true}
          />
          {/* --- Custom X Axis Labels --- */}
          <View style={[styles.customLabelsContainer, { width: calculatedChartWidth }]}>
            {todaysHourlyData.map((hourData, index) =>
              index % 3 === 0 ? (
                <View key={hourData.time} style={styles.labelItem}>
                  <Text style={[styles.labelText, { color: labelColor }]}>
                    {formatSimpleHourLabel(hourData.time)}
                  </Text>
                </View>
              ) : (
                <View key={hourData.time} style={styles.labelItem} />
              ),
            )}
          </View>
        </View>
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    paddingTop: 16,
    paddingBottom: 8,

    borderRadius: 16,
  },
  centerContent: {
    minHeight: 180 + 16 + 8 + 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  scrollView: {
    marginBottom: 8,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  customLabelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  labelItem: {
    width: BAR_SECTION_WIDTH,
    alignItems: "center",
  },
  labelText: {
    fontSize: 10,
  },
  noDataText: {
    textAlign: "center",
    opacity: 0.7,
  },
});

export default TodayHourlyChart;
