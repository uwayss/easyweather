// FILE: src/api/weather.ts
import { Weather, WeatherResponseAPI } from "../types/weather";
import { processWeatherData } from "../utils/weatherUtils";
import {
  WEATHER_API_BASE_URL,
  WEATHER_API_CURRENT_PARAMS,
  WEATHER_API_DAILY_PARAMS,
  WEATHER_API_DEFAULT_FORECAST_DAYS,
  WEATHER_API_HOURLY_PARAMS,
} from "../constants/api";

export async function fetchWeather(latitude: number, longitude: number): Promise<Weather> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: WEATHER_API_CURRENT_PARAMS,
    hourly: WEATHER_API_HOURLY_PARAMS,
    daily: WEATHER_API_DAILY_PARAMS,
    timezone: "auto",
    forecast_days: WEATHER_API_DEFAULT_FORECAST_DAYS,
  });

  const response = await fetch(`${WEATHER_API_BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  const apiResponse: WeatherResponseAPI = await response.json();
  console.warn("THE DATA IS HERE");
  return processWeatherData(apiResponse);
}
