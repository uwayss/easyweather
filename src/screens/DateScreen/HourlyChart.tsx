// FILE: src/screens/DateScreen/HourlyChart.tsx
import { FlatList, View, Image, Text } from "react-native"; // Import core Text
import React from "react";
// Removed MD3Theme, Text, useTheme imports from 'react-native-paper'
import { GraphDataPoint } from "../../utils/metricData";
import { HourWeather } from "../../types/weather";
import weatherDescriptions from "../../utils/descriptions";
import CustomVerticalProgressBar from "./CustomVerticalProgressBar";

interface HourlyChartProps {
  data: GraphDataPoint[];
  hourlySource: HourWeather[];
}

const HourItem = React.memo(function HourItem({
  graphPoint,
  hourInfo,
}: {
  graphPoint: GraphDataPoint;
  hourInfo: HourWeather;
}) {
  // Removed theme and styles access as classes are used now
  const weatherIconInfo =
    weatherDescriptions[hourInfo.weatherCode]?.[hourInfo.isDay ? "day" : "night"];

  return (
    // Use className for layout and styling
    <View className="items-center gap-1.5 w-[60px] px-1">
      <Text className="text-xs font-semibold text-light-onSurface dark:text-dark-onSurface">
        {graphPoint.value}
      </Text>
      <CustomVerticalProgressBar
        progress={graphPoint.progress}
        color={graphPoint.color}
        style={{ height: 60 }} // Keep height from style if needed, width is in component
        className="w-3" // Adjust width with className
      />
      {weatherIconInfo && (
        <Image source={weatherIconInfo.image} className="size-7" resizeMode="contain" />
      )}
      <Text className="text-[11px] text-center w-full text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
        {graphPoint.label}
      </Text>
    </View>
  );
});

export default function HourlyChart({ data, hourlySource }: HourlyChartProps) {
  if (data.length !== hourlySource.length) {
    // Apply dark mode styling to error text
    return <Text className="p-4 text-center text-red-600 dark:text-red-400">Data mismatch</Text>;
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
      removeClippedSubviews={false} // Keep if performance requires it
    />
  );
}

// Removed chartStyles function and StyleSheet import
