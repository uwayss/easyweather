import React from "react";
import Card from "../../components/Common/Card";
import { useWeatherCard } from "../../hooks/useWeatherCard";
import AnimatedWeatherSummary from "./WeatherCard/AnimatedWeatherSummary";
import { MainInfo } from "./WeatherCard/MainInfo";
import WeatherCardSkeleton from "./WeatherCard/WeatherCardSkeleton";
import { Details } from "./WeatherCard/WeatherDetails";

export default function WeatherCard() {
  const { loading, weather, currentWeather, weatherSummaryLabel, background } =
    useWeatherCard();

  if (loading || !weather) {
    return <WeatherCardSkeleton />;
  }

  return (
    <Card
      className="p-4 justify-around gap-5 h-90"
      elevated
      background={background}
    >
      <MainInfo current={currentWeather} />
      <Card className="gap-2" borderType="hidden">
        <Details current={currentWeather} />
        <AnimatedWeatherSummary label={weatherSummaryLabel} />
      </Card>
    </Card>
  );
}
