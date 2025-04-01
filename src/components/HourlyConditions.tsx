import React, { useState } from "react";
import { Text, Card, Divider } from "react-native-paper";
import { FlatList, View, TouchableOpacity } from "react-native";
import { styles } from "../screens/DateScreen/styles";
import { ForecastHour } from "../types/weather";
import { useSettings } from "../context/SettingsContext";
import Graph from "./Graph";
import { getMetricDataForForecast } from "../utils/metricData";

type MetricType = "temperature" | "precipitation" | "humidity" | "wind";

export function MergedConditionsCard({
  selectedDateHourly,
}: {
  selectedDateHourly: ForecastHour[];
}) {
  const [metricType, setMetricType] = useState<MetricType>("temperature");
  const { settings } = useSettings();
  const metricButtons = React.useMemo(
    () => [
      { value: "temperature", label: "Temperature" },
      { value: "precipitation", label: "Precipitation" },
      { value: "humidity", label: "Humidity" },
      { value: "wind", label: "Wind" },
    ],
    [],
  );
  const graphData = getMetricDataForForecast(
    metricType,
    selectedDateHourly,
    settings.useImperialUnits,
  );
  return (
    <Card style={styles.card}>
      <Card.Content style={{ gap: 8 }}>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <Text variant="titleMedium" style={{ textAlign: "center" }}>
            The Next Hours
          </Text>
        </View>
        <FlatList
          horizontal
          data={metricButtons}
          renderItem={({ item: button }) => (
            <TouchableOpacity
              activeOpacity={0.5}
              style={[styles.tabButton, metricType === button.value && styles.activeTab]}
              onPress={() => setMetricType(button.value as MetricType)}
            >
              <Text style={styles.tabText}>{button.label}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={button => button.value}
          contentContainerStyle={styles.scrollContent}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={7}
          removeClippedSubviews={false}
        />
        <Divider />
        {/* <FlatList
          ref={flatListRef}
          horizontal
          data={selectedDateHourly}
          renderItem={({ item }) => <Hour item={item} metricType={metricType} />}
          keyExtractor={item => item.time}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          contentContainerStyle={styles.hourlyContainer}
          removeClippedSubviews={false}
          onScrollToIndexFailed={() => {
            // Fallback to manual scrolling if automatic fails
            flatListRef.current?.scrollToEnd();
          }}
        /> */}
        <Graph data={graphData} />
        <Text style={styles.scrollHint}>Swipe to see more hours →</Text>
      </Card.Content>
    </Card>
  );
}
