// FILE: src/screens/HomeScreen/WeatherCard.tsx
import { View } from "react-native";
import React from "react";
import { ConditionalBackground } from "./WeatherCard/ConditionalBackground";
import { Details } from "./WeatherCard/Details";
import { MainInfo } from "./WeatherCard/MainInfo";
import { useWeather } from "../../context/WeatherContext";

export default function WeatherCard() {
  const { weather } = useWeather();
  return (
    <View className="my-2 overflow-hidden rounded-2xl">
      <ConditionalBackground current={weather?.current}>
        <View className="flex-1 p-4 justify-around">
          <MainInfo current={weather?.current} />
          <Details current={weather?.current} />
        </View>
      </ConditionalBackground>
    </View>
  );
}
