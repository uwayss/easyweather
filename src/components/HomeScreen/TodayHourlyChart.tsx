// FILE: src/components/HomeScreen/TodayHourlyChart.tsx
import React from "react";
import { View, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Card, Text, ActivityIndicator, useTheme } from "react-native-paper";
import { BarChart } from "react-native-chart-kit"; // Keep BarChart import
import { useWeather } from "../../context/WeatherContext";
import { filterHourlyDataForDate } from "../../utils/dateScreen.helpers";
import { ForecastHour } from "../../types/weather";

const screenWidth = Dimensions.get("window").width;
const PADDING_OUTSIDE_CARD = 16 * 2; // Wrapper padding

// --- Width per bar section ---
const BAR_SECTION_WIDTH = 50; // Adjusted for potentially smaller labels needing less space

// Helper to format hour labels - Now just formats one hour simply
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
  const labelColor = theme.dark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)"; // Consistent label color

  const todayDateString = new Date().toISOString().split("T")[0];

  const todaysHourlyData: ForecastHour[] | null | undefined = React.useMemo(() => {
    if (!weather?.hourly) return null;
    const filtered = filterHourlyDataForDate(weather.hourly, todayDateString);
    return filtered?.slice(0, 24);
  }, [weather?.hourly, todayDateString]);

  // Data Prep for BarChart - Remove labels from here
  const chartData = React.useMemo(() => {
    if (!todaysHourlyData || todaysHourlyData.length === 0) return null;
    return {
      // labels: [], // No labels passed to chart component
      labels: todaysHourlyData.map(() => ""), // Pass empty strings to satisfy type, but labels won't render
      datasets: [
        {
          data: todaysHourlyData.map((hourData: ForecastHour) => Math.round(hourData.temperature)),
        },
      ],
    };
  }, [todaysHourlyData]);

  // Chart Config - Simplified further
  const chartConfig = {
    backgroundColor: theme.colors.surface, // Match card background
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    decimalPlaces: 0,
    // Color for bars and value text on top
    color: (opacity = 1) =>
      theme.dark ? `rgba(255, 255, 255, ${opacity * 0.8})` : `rgba(0, 0, 0, ${opacity * 0.8})`,
    // Label color no longer needed here as we hide chart labels
    // labelColor: (opacity = 1) => labelColor,
    style: {},
    barPercentage: 0.5,
    propsForBackgroundLines: {
      strokeWidth: 0,
    },
    propsForLabels: {
      // Style for numbers on top of bars
      fontSize: 10,
    },
  };

  // Calculate dynamic chart width (remains the same logic)
  const calculatedChartWidth = React.useMemo(() => {
    if (!todaysHourlyData) return screenWidth - PADDING_OUTSIDE_CARD;
    return todaysHourlyData.length * BAR_SECTION_WIDTH; // Width based purely on content
  }, [todaysHourlyData]);

  // Loading / No Data States (remain the same)
  if (weatherLoading) {
    return (
      <Card style={[styles.card, styles.centerContent]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </Card>
    );
  }
  if (!chartData || !todaysHourlyData) {
    // Check todaysHourlyData too for custom labels
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
        // --- Remove padding from ScrollView content to remove start padding ---
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* View to contain Chart + Custom Labels */}
        <View>
          {/* --- BarChart --- */}
          <BarChart
            data={chartData}
            width={calculatedChartWidth}
            height={180} // Reduced height slightly more
            yAxisLabel=""
            yAxisSuffix="°C"
            chartConfig={chartConfig}
            style={styles.chart}
            withInnerLines={false}
            withHorizontalLabels={false} // Hide Y axis labels
            withVerticalLabels={false} // Hide default X axis labels
            fromZero={true}
            showValuesOnTopOfBars={true}
            showBarTops={false}
            withCustomBarColorFromData={false}
            flatColor={true}
          />
          {/* --- Custom X Axis Labels --- */}
          <View style={[styles.customLabelsContainer, { width: calculatedChartWidth }]}>
            {todaysHourlyData.map((hourData, index) =>
              // Render label only every 3 hours
              index % 3 === 0 ? (
                <View key={hourData.time} style={styles.labelItem}>
                  <Text style={[styles.labelText, { color: labelColor }]}>
                    {formatSimpleHourLabel(hourData.time)}
                  </Text>
                </View>
              ) : (
                // Render an empty spacer view for non-labeled items to maintain alignment
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
    paddingTop: 16, // Keep top padding
    paddingBottom: 8, // Reduce bottom padding slightly
    // No horizontal padding on card itself
    borderRadius: 16,
    // alignItems: 'center', // Remove this
  },
  centerContent: {
    minHeight: 180 + 16 + 8 + 20, // Adjust approx height
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  scrollView: {
    width: screenWidth - PADDING_OUTSIDE_CARD, // Limit visual width
  },
  scrollViewContent: {
    // --- Remove horizontal padding ---
    paddingHorizontal: 0,
    // Add minimal padding if bars touch edges visually
    // paddingHorizontal: 5,
  },
  chart: {
    marginLeft: 0, // Ensure no default margin pushes it
    paddingLeft: 0, // Ensure no default padding pushes it
    // marginRight: 0 // Ensure no default margin pushes it
    // paddingRight: 0 // Ensure no default padding pushes it
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
    paddingHorizontal: 16, // Add padding back for the title
  },
  noDataText: {
    textAlign: "center",
    opacity: 0.7,
  },
  // --- Styles for Custom Labels ---
  customLabelsContainer: {
    flexDirection: "row",
    paddingLeft: 0, // Align with chart's starting point
    // marginTop: 4, // Space between chart and labels
  },
  labelItem: {
    width: BAR_SECTION_WIDTH, // Each label container takes the same width as a bar section
    alignItems: "center", // Center the text horizontally
    // paddingHorizontal: 2, // Optional small padding
  },
  labelText: {
    fontSize: 11, // Smaller font size for labels
    // color set dynamically
  },
});

export default React.memo(TodayHourlyChart);
