import { Weather, WeatherResponseAPI } from "../types/weather";
import { processWeatherData } from "../utils/weatherUtils";

const BASE_URL = "https://api.open-meteo.com/v1";

export async function fetchWeather(latitude: number, longitude: number): Promise<Weather> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m",
    hourly:
      "temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,is_day,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    timezone: "auto",
    forecast_days: "16",
  });

  const response = await fetch(`${BASE_URL}/forecast?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  const apiResponse: WeatherResponseAPI = await response.json();
  return processWeatherData(apiResponse);
}
