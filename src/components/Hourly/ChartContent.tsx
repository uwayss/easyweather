import React from "react";
import { ScrollView, View } from "react-native";
import { GraphDataPoint } from "@/src/utils/metricData";
import { HourWeather } from "@/src/types/weather";
import LineChart from "../Graph/LineChart";
import HourValue from "./HourValue";
import HourDetail from "./HourDetail";
import { ImageSource } from "expo-image";
import {
  HOURLY_CONDITIONS_CHART_HEIGHT,
  HOURLY_CONDITIONS_POINT_ITEM_WIDTH,
} from "@/src/constants/ui";

interface ChartContentProps {
  graphData: GraphDataPoint[];
  hourlyData: HourWeather[];
  internalContentWidth: number;
  availableScrollWidth: number;
  chartColor: string;
  getIconForHour: (hour: HourWeather) => ImageSource | undefined;
  styles: any;
}

export const ChartContent: React.FC<ChartContentProps> = ({
  graphData,
  hourlyData,
  internalContentWidth,
  availableScrollWidth,
  chartColor,
  getIconForHour,
  styles,
}) => {
  const xStep = HOURLY_CONDITIONS_POINT_ITEM_WIDTH;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="rounded-lg overflow-hidden"
      contentContainerStyle={[
        styles.chartScrollContent,
        { width: internalContentWidth },
        internalContentWidth < availableScrollWidth
          ? {
              paddingLeft: (availableScrollWidth - internalContentWidth) / 2,
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
  );
};
