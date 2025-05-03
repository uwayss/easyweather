import React from "react";

import ForecastItem from "./ForecastItem";
import { DayWeather } from "../../../types/weather";

export default function EmptyComponent() {
  const emptyList: DayWeather[] = Array.from({ length: 4 }, () => ({
    empty: true,
    date: "",
    maxTemp: 0,
    minTemp: 0,
    weatherCode: 0,
    rainProb: 0,
    windSpeed: 0,
    sunset: "",
    sunrise: "",
  }));

  return (
    <>
      {emptyList.map(function (item: DayWeather, index: number) {
        return <ForecastItem item={item} index={index} key={index} />;
      })}
    </>
  );
}
