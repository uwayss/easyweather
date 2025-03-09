import { ForecastDay } from "../types/weather";

interface DailyWeatherData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
}

/**
 * Converts the API's daily weather data format to an array of ForecastDay objects
 */
export function convertToForecastDays(dailyData: DailyWeatherData): ForecastDay[] {
  if (!dailyData || !dailyData.time) {
    return [];
  }

  return dailyData.time.map((date, index) => ({
    date,
    weatherCode: dailyData.weather_code[index],
    maxTemp: dailyData.temperature_2m_max[index],
    minTemp: dailyData.temperature_2m_min[index],
    precipitationProbability: dailyData.precipitation_probability_max[index],
  }));
}
