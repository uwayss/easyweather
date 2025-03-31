import { View } from "react-native";
import { styles } from "./styles";
import { Text } from "react-native-paper";
import React from "react";
import CustomVerticalProgressBar from "./CustomVerticalProgressBar";

export default function HourProgress({
  time,
  progress,
  value,
  color,
  highlight,
}: {
  time: string;
  progress: number;
  value: string | number;
  color: string;
  highlight?: boolean;
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
    <View style={[styles.hourlyItem, highlight ? styles.currentHour : undefined]}>
      <Text style={styles.hourText}>{formattedHour}</Text>
      <CustomVerticalProgressBar
        progress={progress}
        color={color}
        style={styles.customProgressBar}
      />
      <Text style={styles.hourText}>{value}</Text>
    </View>
  );
}
