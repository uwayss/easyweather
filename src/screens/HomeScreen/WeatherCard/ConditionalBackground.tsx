import React from "react";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { CurrentWeather } from "../../../types/weather";
import backgroundMappings from "../../../utils/backgroundMappings";

interface ConditionalBackgroundProps {
  children: React.ReactNode;
  current: CurrentWeather | undefined;
}

export function ConditionalBackground({ children, current }: ConditionalBackgroundProps) {
  const timeOfDay = current?.is_day ? "day" : "night";
  let background;
  if (current) {
    background = backgroundMappings[current.weather_code]?.[timeOfDay];
  }

  return (
    <FastImage
      source={background ? background : undefined}
      style={styles.background}
      resizeMode="cover"
    >
      {children}
    </FastImage>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: 360,
  },
});
