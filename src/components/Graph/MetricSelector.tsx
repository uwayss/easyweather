// FILE: src/components/Graph/MetricSelector.tsx
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";

import { MetricType } from "../../utils/metricData";
import MetricButton from "./MetricButton";

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
      {
        value: "temperature",
        label: t("metrics.temperature"),
        icon: "thermometer",
      },
      {
        value: "apparentTemperature",
        label: t("metrics.apparentTemperature"),
        icon: "thermometer-lines",
      },
      {
        value: "precipitation",
        label: t("metrics.precipitation"),
        icon: "weather-pouring",
      },
      {
        value: "humidity",
        label: t("metrics.humidity"),
        icon: "water-percent",
      },
      { value: "wind", label: t("metrics.wind"), icon: "weather-windy" },
    ],
    [t]
  );

  const handleMetricChange = useCallback(
    (newMetric: string) => {
      setCurrentMetric(newMetric as MetricType);
    },
    [setCurrentMetric]
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexDirection: "row",
        paddingVertical: 4,
        alignItems: "center",
      }}
    >
      {metrics.map((button) => (
        <MetricButton
          icon={button.icon}
          key={button.value}
          label={button.label}
          value={button.value}
          isActive={currentMetric === button.value}
          onPress={handleMetricChange}
        />
      ))}
    </ScrollView>
  );
}
