import { View } from "react-native";

import { styles } from "./styles";
import { ProgressBar, Text } from "react-native-paper";
import React from "react";

export default function HourProgress({
  time,
  progress,
  value,
  color,
}: {
  time: string;
  progress: number;
  value: number | string;
  color: string;
}) {
  const hourTime = new Date(time).getHours();
  const formattedHour =
    hourTime === 0
      ? "12 AM"
      : hourTime === 12
      ? "12 PM"
      : hourTime > 12
      ? `${hourTime - 12} PM`
      : `${hourTime} AM`;
  return (
    <View style={styles.hourlyItem}>
      <Text style={styles.hourText}>{formattedHour}</Text>
      <View style={styles.humidityBar}>
        <ProgressBar progress={progress} color={color} style={styles.progressBar} />
      </View>
      <Text style={styles.hourText}>{value}%</Text>
    </View>
  );
}
