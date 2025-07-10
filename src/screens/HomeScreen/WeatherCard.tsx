import React from "react";
import Card from "../../components/Common/Card";
import { useSettings } from "../../context/SettingsContext";
import { useWeather } from "../../context/WeatherContext";
import backgroundMappings from "../../utils/backgroundMappings";
import { generateWeatherSummaryLabel } from "../../utils/weatherSummaryUtils";
import AnimatedWeatherSummary from "./WeatherCard/AnimatedWeatherSummary";
import { MainInfo } from "./WeatherCard/MainInfo";
import WeatherCardSkeleton from "./WeatherCard/WeatherCardSkeleton";
import { Details } from "./WeatherCard/WeatherDetails";

export default function WeatherCard() {
  const { weather, yesterdaySummary, todaySummary, tomorrowSummary, loading } =
    useWeather();
  const { settings } = useSettings();
  const currentWeather = weather?.current;
  const weatherSummaryLabel = React.useMemo(() => {
    return generateWeatherSummaryLabel(
      todaySummary,
      tomorrowSummary,
      yesterdaySummary,
      settings.useImperialUnits
    );
  }, [
    todaySummary,
    tomorrowSummary,
    yesterdaySummary,
    settings.useImperialUnits,
  ]);

  if (loading || !weather) {
    return <WeatherCardSkeleton />;
  }

  return (
    <Card
      className="p-4 justify-around gap-5 h-90"
      elevated
      background={
        currentWeather
          ? backgroundMappings[currentWeather.weatherCode]?.[
              currentWeather.isDay ? "day" : "night"
            ]
          : undefined
      }
    >
      <MainInfo current={currentWeather} />
      <Card className="gap-2" borderType="hidden">
        <Details current={currentWeather} />
        <AnimatedWeatherSummary label={weatherSummaryLabel} />
      </Card>
    </Card>
  );
}
