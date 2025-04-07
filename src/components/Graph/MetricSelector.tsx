import React, { ReactNode } from "react";
import { MetricType } from "../../utils/metricData";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";

export default function MetricSelector({
  currentMetric,
  setCurrentMetric,
  inSheet,
}: {
  currentMetric: MetricType;
  setCurrentMetric: React.Dispatch<React.SetStateAction<MetricType>>;
  inSheet?: boolean;
}) {
  const { t } = useTranslation();

  const metrics = React.useMemo(
    () => [
      { value: "temperature", label: t("metrics.temperature") },
      { value: "precipitation", label: t("metrics.precipitation") },
      { value: "humidity", label: t("metrics.humidity") },
      { value: "wind", label: t("metrics.wind") },
    ],
    [t],
  );
  function ScrollWrapper({ children }: { children: ReactNode }) {
    if (inSheet) {
      return (
        <BottomSheetScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {children}
        </BottomSheetScrollView>
      );
    }
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {children}
      </ScrollView>
    );
  }
  return (
    <ScrollWrapper>
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
    </ScrollWrapper>
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
