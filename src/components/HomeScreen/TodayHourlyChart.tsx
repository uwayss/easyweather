import React from "react";
import { View, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Card, Text, ActivityIndicator, useTheme } from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import { useWeather } from "../../context/WeatherContext";
import { filterHourlyDataForDate } from "../../utils/dateScreen.helpers";
import { ForecastHour } from "../../types/weather";

const screenWidth = Dimensions.get("window").width;
const PADDING_OUTSIDE_CARD = 16 * 2;

const BAR_SECTION_WIDTH = 50;

const formatSimpleHourLabel = (time: string): string => {
  const date = new Date(time);
  const hour = date.getHours();
  if (hour === 0) return "12A";
  if (hour === 12) return "12P";
  if (hour < 12) return `${hour}A`;
  return `${hour - 12}P`;
};

const TodayHourlyChart: React.FC = () => {
  const { weather, loading: weatherLoading } = useWeather();
  const theme = useTheme();
  const labelColor = theme.dark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)";

  const todayDateString = new Date().toISOString().split("T")[0];

  const todaysHourlyData: ForecastHour[] | null | undefined = React.useMemo(() => {
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
          data: todaysHourlyData.map((hourData: ForecastHour) => Math.round(hourData.temperature)),
        },
      ],
    };
  }, [todaysHourlyData]);

  const chartConfig = {
    backgroundColor: theme.colors.surface,
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    decimalPlaces: 0,

    color: (opacity = 1) =>
      theme.dark ? `rgba(255, 255, 255, ${opacity * 0.8})` : `rgba(0, 0, 0, ${opacity * 0.8})`,

    style: {},
    barPercentage: 0.5,
    propsForBackgroundLines: {
      strokeWidth: 0,
    },
    propsForLabels: {
      fontSize: 10,
    },
  };

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
            yAxisSuffix="°C"
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
  scrollView: {
    width: screenWidth - PADDING_OUTSIDE_CARD,
  },
  scrollViewContent: {
    paddingHorizontal: 0,
  },
  chart: {
    marginLeft: 0,
    paddingLeft: 0,
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  noDataText: {
    textAlign: "center",
    opacity: 0.7,
  },

  customLabelsContainer: {
    flexDirection: "row",
    paddingLeft: 0,
  },
  labelItem: {
    width: BAR_SECTION_WIDTH,
    alignItems: "center",
  },
  labelText: {
    fontSize: 11,
  },
});

export default React.memo(TodayHourlyChart);
