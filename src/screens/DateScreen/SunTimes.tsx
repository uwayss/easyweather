import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { formatTimeStringToHour } from "../../utils/timeUtils";
import { DayWeather } from "../../types/weather";

export default function SunTimes({ dayData }: { dayData: DayWeather | undefined }) {
  return (
    <View>
      <Text>{formatTimeStringToHour(dayData?.sunrise)}</Text>
      <Text>{formatTimeStringToHour(dayData?.sunset)}</Text>
    </View>
  );
}
