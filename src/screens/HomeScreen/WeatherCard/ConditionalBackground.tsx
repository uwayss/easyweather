// FILE: src/screens/HomeScreen/WeatherCard/ConditionalBackground.tsx
import React from "react";
import FastImage from "react-native-fast-image";
import { CurrentWeather } from "../../../types/weather";
import backgroundMappings from "../../../utils/backgroundMappings";

interface ConditionalBackgroundProps {
  children: React.ReactNode;
  current: CurrentWeather | undefined;
}

export function ConditionalBackground({ children, current }: ConditionalBackgroundProps) {
  const timeOfDay = current?.isDay ? "day" : "night";
  let background;
  if (current) {
    background = backgroundMappings[current.weatherCode]?.[timeOfDay];
  }
  return (
    <FastImage source={background || undefined} className="w-full flex-1" resizeMode="cover">
      {children}
    </FastImage>
  );
}
