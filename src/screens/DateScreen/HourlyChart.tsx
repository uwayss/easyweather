import { FlatList, StyleSheet, View, Image } from "react-native";
import React from "react";
import { MD3Theme, Text, useTheme } from "react-native-paper";
import { GraphDataPoint, MetricType } from "../../utils/metricData";
import { HourWeather } from "../../types/weather";
import weatherDescriptions from "../../utils/descriptions";
import CustomVerticalProgressBar from "./CustomVerticalProgressBar";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

interface HourlyChartProps {
  data: GraphDataPoint[];
  hourlySource: HourWeather[];
  metric: MetricType;
  inSheet?: boolean;
}

const HourItem = React.memo(function HourItem({
  graphPoint,
  hourInfo,
}: {
  graphPoint: GraphDataPoint;
  hourInfo: HourWeather;
}) {
  const theme = useTheme();
  const styles = chartStyles(theme);
  const weatherIconInfo =
    weatherDescriptions[hourInfo.weatherCode]?.[hourInfo.isDay ? "day" : "night"];

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemValueText} variant="labelSmall">
        {graphPoint.value}
      </Text>
      <CustomVerticalProgressBar
        progress={graphPoint.progress}
        color={graphPoint.color}
        style={styles.customProgressBar}
        trackColor={theme.dark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
      />
      {weatherIconInfo && (
        <Image source={weatherIconInfo.image} style={styles.weatherIcon} resizeMode="contain" />
      )}
      <Text style={styles.itemLabelText} variant="labelSmall">
        {graphPoint.label}
      </Text>
    </View>
  );
});

export default function HourlyChart({ data, hourlySource, inSheet }: HourlyChartProps) {
  const theme = useTheme();
  const styles = chartStyles(theme);

  if (data.length !== hourlySource.length) {
    return <Text style={styles.errorText}>Data mismatch</Text>;
  }
  if (inSheet) {
    return (
      <BottomSheetFlatList
        horizontal
        data={data}
        renderItem={({ item, index }) => (
          <HourItem graphPoint={item} hourInfo={hourlySource[index]} />
        )}
        keyExtractor={item => item.time}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={false}
      />
    );
  }
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={({ item, index }) => (
        <HourItem graphPoint={item} hourInfo={hourlySource[index]} />
      )}
      keyExtractor={item => item.time}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews={false}
    />
  );
}

const chartStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    itemContainer: {
      alignItems: "center",
      gap: 6,
      width: 60,
      paddingHorizontal: 4,
    },
    itemValueText: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.colors.onSurface,
    },
    customProgressBar: {
      width: 12,
      height: 60,
    },
    weatherIcon: {
      width: 28,
      height: 28,
    },
    itemLabelText: {
      fontSize: 11,
      color: theme.colors.onSurfaceVariant,
      textAlign: "center",
      width: "100%",
    },
    errorText: {
      color: theme.colors.error,
      textAlign: "center",
      padding: 16,
    },
  });
