export interface WeatherResponseAPI {
  latitude: number;
  longitude: number;
  timezone: string;
  current_units: WeatherUnitsAPI;
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: 0 | 1;
    weather_code: number;
    wind_speed_10m: number;
    uv_index?: number;
  };
  hourly_units: WeatherUnitsAPI;
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    apparent_temperature?: number[];
    precipitation_probability: number[];
    weather_code: number[];
    is_day: number[];
    wind_speed_10m?: number[];
  };
  daily_units: Omit<
    WeatherUnitsAPI,
    | "interval"
    | "apparent_temperature"
    | "wind_speed_10m"
    | "relative_humidity_2m"
  >;
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    uv_index_max?: number[];
    precipitation_probability_max: number[];
    sunset: string[];
    sunrise: string[];
    wind_speed_10m_max: number[];
  };
}

export interface WeatherUnitsAPI {
  time: string;
  interval?: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  apparent_temperature?: string;
  is_day: string;
  weather_code: string;
  wind_speed_10m: string;
  precipitation_probability?: string;
  uv_index?: string;
}

export interface HourWeather {
  time: string;
  temp: number;
  apparentTemp: number;
  humidity: number;
  rainProb: number;
  weatherCode: number;
  isDay: boolean;
  windSpeed: number;
}
export interface DayWeather {
  date: string;
  maxTemp: number;
  minTemp: number;
  uvIndexMax: number;
  weatherCode: number;
  rainProb: number;
  windSpeed: number;
  sunset: string;
  sunrise: string;
  empty?: boolean;
}
export interface CurrentWeather {
  temperature: number;
  humidity: number;
  feltTemp: number;
  isDay: boolean;
  weatherCode: number;
  windSpeed: number;
  uvIndex: number;
}
export interface Weather {
  current: CurrentWeather;
  hourly: HourWeather[];
  daily: DayWeather[];
  timezone: string;
  latitude: number;
  longitude: number;
}
