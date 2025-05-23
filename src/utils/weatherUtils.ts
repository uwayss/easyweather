import {
  CurrentWeather,
  DayWeather,
  HourWeather,
  Weather,
  WeatherResponseAPI,
} from "../types/weather";

export function processWeatherData(data: WeatherResponseAPI): Weather {
  const current: CurrentWeather = {
    temperature: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    feltTemp: data.current.apparent_temperature,
    isDay: data.current.is_day ? true : false,
    weatherCode: data.current.weather_code,
    windSpeed: data.current.wind_speed_10m,
  };

  const hourly: HourWeather[] = data.hourly.time.map((time, index) => ({
    time,
    temp: data.hourly.temperature_2m[index],
    humidity: data.hourly.relative_humidity_2m[index],
    rainProb: data.hourly.precipitation_probability[index],
    apparentTemp: data.hourly.apparent_temperature
      ? data.hourly.apparent_temperature[index]
      : data.hourly.temperature_2m[index], // Fallback if not available
    weatherCode: data.hourly.weather_code[index],
    isDay: data.hourly.is_day[index] === 1,
    windSpeed: data.hourly.wind_speed_10m
      ? data.hourly.wind_speed_10m[index]
      : 0, // Fallback if not available
  }));
  const daily: DayWeather[] = data.daily.time.map((date, index) => ({
    date,
    maxTemp: data.daily.temperature_2m_max[index],
    minTemp: data.daily.temperature_2m_min[index],
    weatherCode: data.daily.weather_code[index],
    rainProb: data.daily.precipitation_probability_max[index],
    sunrise: data.daily.sunrise[index],
    sunset: data.daily.sunset[index],
    uvIndexMax: data.daily.uv_index_max ? data.daily.uv_index_max[index] : -1, // Use -1 or similar to denote missing UV data
    windSpeed: data.daily.wind_speed_10m_max[index],
  }));

  return {
    current,
    hourly,
    daily,
    timezone: data.timezone,
    latitude: data.latitude,
    longitude: data.longitude,
  };
}

/**
 * Filters hourly weather data for a specific date
 * @param hourlyData The hourly weather data object
 * @param date The date string to filter by (YYYY-MM-DD)
 * @returns Filtered hourly data for the specified date
 */
export const filterHourlyDataForDate = (
  hourlyData: HourWeather[] | undefined,
  date: string
): HourWeather[] | undefined => {
  if (!hourlyData) return undefined;
  return hourlyData.filter((hourData: HourWeather) =>
    hourData.time.startsWith(date)
  );
};

export function filterHourlyWeatherForNext24HoursIncludingNow(
  hourlyData?: HourWeather[]
): HourWeather[] | undefined {
  if (!hourlyData) return undefined;

  const now = new Date();

  const startOfCurrentHour = new Date(now);
  startOfCurrentHour.setMinutes(0, 0, 0);

  const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const filteredData = hourlyData.filter((hourData: HourWeather) => {
    const hourTime = new Date(hourData.time);

    return hourTime >= startOfCurrentHour && hourTime < twentyFourHoursLater;
  });

  return filteredData.slice(0, 24);
}
