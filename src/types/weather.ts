export interface WeatherUnits {
  time: string;
  interval?: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  apparent_temperature?: string;
  is_day: string;
  weather_code: string;
  wind_speed_10m: string;
  precipitation_probability?: string;
}

export interface CurrentWeather {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: 0 | 1;
  weather_code: number;
  wind_speed_10m: number;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  precipitation_probability: number[];
  weather_code: number[];
  is_day: number[];
  wind_speed_10m?: number[];
}
export interface ForecastHour {
  time: string;
  temperature: number;
  humidity: number;
  rainProb: number;
  weatherCode: number;
  isDay: boolean;
  windSpeed: number;
}
export interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  precipitationProbability?: number;
}
export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current_units: WeatherUnits;
  current: CurrentWeather;
  hourly_units: WeatherUnits;
  hourly: HourlyWeather;
  daily_units: Omit<
    WeatherUnits,
    "interval" | "apparent_temperature" | "wind_speed_10m" | "relative_humidity_2m"
  >;
  daily: DailyWeather;
}
