// FILE: src/screens/HomeScreen/WeatherCard.tsx
import React from "react";
import Card from "../../components/Common/Card";
import { useWeather } from "../../context/WeatherContext";
import backgroundMappings from "../../utils/backgroundMappings";
import { Details } from "./WeatherCard/WeatherDetails";
import { MainInfo } from "./WeatherCard/MainInfo";

export default function WeatherCard() {
  const { weather } = useWeather();
  const currentWeather = weather?.current;
  return (
    <Card
      className="flex-1 p-4 justify-around"
      elevated
      background={
        currentWeather
          ? backgroundMappings[currentWeather.weatherCode]?.[
              currentWeather?.isDay ? "day" : "night"
            ]
          : undefined
      }
    >
      <MainInfo current={currentWeather} />
      <Details current={currentWeather} />
    </Card>
  );
}
