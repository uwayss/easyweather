// FILE: src/screens/HomeScreen/WeatherCard.tsx
import React from "react"; // Added React import for useMemo
import Card from "../../components/Common/Card";
import { useSettings } from "../../context/SettingsContext"; // Import useSettings
import { useWeather } from "../../context/WeatherContext";
import backgroundMappings from "../../utils/backgroundMappings";
import { generateWeatherSummaryLabel } from "../../utils/weatherSummaryUtils"; // Import util
import AnimatedWeatherSummary from "./WeatherCard/AnimatedWeatherSummary"; // Import component
import { MainInfo } from "./WeatherCard/MainInfo";
import { Details } from "./WeatherCard/WeatherDetails";

export default function WeatherCard() {
  const { weather, yesterdaySummary, todaySummary, tomorrowSummary } =
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

  return (
    <Card
      className="flex-1 p-4 justify-around" // Main card still handles overall padding and layout
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
      <Details current={currentWeather} />
      {weatherSummaryLabel && (
        <AnimatedWeatherSummary label={weatherSummaryLabel} />
      )}
    </Card>
  );
}
