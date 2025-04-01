import React from "react";
import { MetricType } from "../../utils/metricData";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

export default function MetricSelector({
  currentMetric,
  setCurrentMetric,
}: {
  currentMetric: MetricType;
  setCurrentMetric: React.Dispatch<React.SetStateAction<MetricType>>;
}) {
  const metrics = React.useMemo(
    () => [
      { value: "temperature", label: "Temperature" },
      { value: "precipitation", label: "Precipitation" },
      { value: "humidity", label: "Humidity" },
      { value: "wind", label: "Wind" },
    ],
    [],
  );
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {metrics.map(button => (
        <TouchableOpacity
          key={button.value}
          activeOpacity={0.5}
          style={[styles.tabButton, currentMetric === button.value && styles.activeTab]}
          onPress={() => setCurrentMetric(button.value as MetricType)}
        >
          <Text style={styles.tabText}>{button.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexDirection: "row",
    paddingVertical: 4,
  },
  tabButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
  },
  activeTab: {
    backgroundColor: "rgba(0, 109, 119, 0.2)",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
