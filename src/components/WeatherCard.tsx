import { CurrentWeather } from "../types/weather";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import React from "react";
import { ConditionalBackground, Details, GradientTint, MainInfo } from "./WeatherCard.components";

type WeatherCardProps = {
  current?: CurrentWeather;
  name: string;
};
export default function WeatherCard({ current, name }: WeatherCardProps) {
  if (!current) return null;
  return (
    <Card style={styles.card}>
      <ConditionalBackground current={current}>
        <GradientTint />
        <Card.Content style={styles.content}>
          <MainInfo current={current} name={name} />
          <Details current={current} />
        </Card.Content>
      </ConditionalBackground>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    overflow: "hidden",
    borderRadius: 16,
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "space-around",
  },
});
