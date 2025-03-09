import { WeatherResponse } from "../types/weather";

const BASE_URL = "https://api.open-meteo.com/v1";

export async function fetchWeather(latitude: number, longitude: number): Promise<WeatherResponse> {
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

  return response.json();
}

export function processWeatherData(data: WeatherResponse) {
  const current = {
    temperature: data.current.temperature_2m,
    weatherCode: data.current.weather_code,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    isDay: data.current.is_day,
    feelsLike: data.current.apparent_temperature,
  };

  const hourly = data.hourly.time.map((time, index) => ({
    time,
    temperature: data.hourly.temperature_2m[index],
    humidity: data.hourly.relative_humidity_2m[index],
    precipitationProbability: data.hourly.precipitation_probability[index],
    weatherCode: data.hourly.weather_code[index],
    isDay: data.hourly.is_day[index] === 1,
    windSpeed: data.hourly.wind_speed_10m ? data.hourly.wind_speed_10m[index] : 0,
  }));

  const daily = data.daily.time.map((date, index) => ({
    date,
    maxTemp: data.daily.temperature_2m_max[index],
    minTemp: data.daily.temperature_2m_min[index],
    weatherCode: data.daily.weather_code[index],
    precipitationProbability: data.daily.precipitation_probability_max[index],
  }));

  return {
    current,
    hourly,
    daily,
    timezone: data.timezone,
  };
}
