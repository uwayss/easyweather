/* eslint-disable @typescript-eslint/no-require-imports */
// FILE: src/screens/HomeScreen/WeatherCard/ConditionalBackground.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { CurrentWeather } from "../../../types/weather";
import backgroundMappings from "../../../utils/backgroundMappings";
import { useTheme } from "react-native-paper";

interface ConditionalBackgroundProps {
  children: React.ReactNode;
  current: CurrentWeather | undefined;
}

export function ConditionalBackground({ children, current }: ConditionalBackgroundProps) {
  const theme = useTheme();
  const timeOfDay = current?.isDay ? "day" : "night";
  let backgroundSource;

  if (current && backgroundMappings[current.weatherCode]) {
    backgroundSource = backgroundMappings[current.weatherCode]?.[timeOfDay];
  } else {
    backgroundSource = theme.dark
      ? require("../../../../assets/backgrounds/default_dark.webp")
      : require("../../../../assets/backgrounds/default_light.webp");
  }

  // Increase overlay darkness slightly for better text contrast
  const overlayColor = theme.dark ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.15)";

  return (
    <FastImage source={backgroundSource} style={styles.background} resizeMode="cover">
      <View style={[styles.overlay, { backgroundColor: overlayColor }]} />
      {/* Children are now rendered directly on top of the overlay */}
      {children}
    </FastImage>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: 360,
    // justifyContent removed from here, handled inside WeatherCard's content
    // alignItems removed from here
    // paddingVertical removed from here
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});
