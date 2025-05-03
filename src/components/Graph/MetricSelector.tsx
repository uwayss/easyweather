// FILE: src/components/Graph/MetricSelector.tsx
import { getAnalytics } from "@react-native-firebase/analytics";
import React, { useCallback } from "react"; // Added useCallback
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";

import MetricButton from "./MetricButton"; // Import the memoized button
import { MetricType } from "../../utils/metricData";

export default function MetricSelector({
  currentMetric,
  setCurrentMetric,
}: {
  currentMetric: MetricType;
  setCurrentMetric: React.Dispatch<React.SetStateAction<MetricType>>;
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

  // Memoize the handler function to ensure stability for MetricButton's onPress prop
  const handleMetricChange = useCallback(
    (newMetric: string) => {
      // Use string type here as it comes from button value
      getAnalytics().logEvent("change_hourly_metric", {
        metric: newMetric,
        screen_context: "home_or_details",
      });
      setCurrentMetric(newMetric as MetricType); // Cast back to MetricType
    },
    [setCurrentMetric], // Dependency is stable
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexDirection: "row",
        paddingVertical: 4,
      }}
    >
      {metrics.map(button => (
        <MetricButton
          key={button.value}
          label={button.label}
          value={button.value}
          isActive={currentMetric === button.value}
          onPress={handleMetricChange} // Pass the memoized handler
        />
      ))}
    </ScrollView>
  );
}
