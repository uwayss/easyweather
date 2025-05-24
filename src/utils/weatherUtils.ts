import {
  CurrentWeather,
  DayWeather,
  HourWeather,
  Weather,
  WeatherResponseAPI,
} from "../types/weather";

export interface ProcessedWeatherData extends Weather {
  yesterdaySummary?: DayWeather;
  todaySummary?: DayWeather;
  tomorrowSummary?: DayWeather;
}

export function processWeatherData(
  data: WeatherResponseAPI
): ProcessedWeatherData {
  const current: CurrentWeather = {
    temperature: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    feltTemp: data.current.apparent_temperature,
    isDay: data.current.is_day ? true : false,
    weatherCode: data.current.weather_code,
    windSpeed: data.current.wind_speed_10m,
    uvIndex: data.current.uv_index ?? 0,
  };

  const hourly: HourWeather[] = data.hourly.time.map((time, index) => ({
    time,
    temp: data.hourly.temperature_2m[index],
    humidity: data.hourly.relative_humidity_2m[index],
    rainProb: data.hourly.precipitation_probability[index],
    apparentTemp: data.hourly.apparent_temperature
      ? data.hourly.apparent_temperature[index]
      : data.hourly.temperature_2m[index],
    weatherCode: data.hourly.weather_code[index],
    isDay: data.hourly.is_day[index] === 1,
    windSpeed: data.hourly.wind_speed_10m
      ? data.hourly.wind_speed_10m[index]
      : 0,
  }));

  // The API with past_days=1 will return yesterday at index 0, today at 1, etc.
  const allDailyData: DayWeather[] = data.daily.time.map((date, index) => ({
    date,
    maxTemp: data.daily.temperature_2m_max[index],
    minTemp: data.daily.temperature_2m_min[index],
    weatherCode: data.daily.weather_code[index],
    rainProb: data.daily.precipitation_probability_max[index],
    sunrise: data.daily.sunrise[index],
    sunset: data.daily.sunset[index],
    uvIndexMax: data.daily.uv_index_max ? data.daily.uv_index_max[index] : -1,
    windSpeed: data.daily.wind_speed_10m_max[index],
  }));

  let yesterdaySummary: DayWeather | undefined = undefined;
  let todaySummary: DayWeather | undefined = undefined;
  let tomorrowSummary: DayWeather | undefined = undefined;
  let displayDailyForecast: DayWeather[] = [];

  if (allDailyData.length > 0) {
    // Check if the first entry's date is indeed before the current day's start
    // This assumes data.current.time is reliable for "now"
    const now = new Date(data.current.time); // Use current weather time as reference
    const firstDailyEntryDate = new Date(allDailyData[0].date);

    const isFirstEntryYesterday =
      firstDailyEntryDate.setHours(0, 0, 0, 0) < now.setHours(0, 0, 0, 0);

    if (isFirstEntryYesterday) {
      yesterdaySummary = allDailyData[0];
      if (allDailyData.length > 1) todaySummary = allDailyData[1];
      if (allDailyData.length > 2) tomorrowSummary = allDailyData[2];
      displayDailyForecast = allDailyData.slice(1); // For UI forecast list (today onwards)
    } else {
      // API might not have returned past_days or data is structured differently than expected
      // Fallback: today is the first, no yesterday data from this fetch
      if (allDailyData.length > 0) todaySummary = allDailyData[0];
      if (allDailyData.length > 1) tomorrowSummary = allDailyData[1];
      displayDailyForecast = allDailyData; // Show all data from API if past_days didn't work
    }
  }

  return {
    current,
    hourly,
    daily: displayDailyForecast, // This is for the forecast list (today onwards)
    timezone: data.timezone,
    latitude: data.latitude,
    longitude: data.longitude,
    yesterdaySummary,
    todaySummary,
    tomorrowSummary,
  };
}

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
