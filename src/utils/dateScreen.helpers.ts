/**
 * Formats a date string for display in the forecast
 * @param dateString The date string in YYYY-MM-DD format
 * @returns Formatted date string (e.g., "Tomorrow" or "Monday, January 1")
 */
export const formatForecastDate = (dateString: string): string => {
  const forecastDate = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (forecastDate.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }

  return forecastDate.toLocaleDateString("en-UK", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

/**
 * Filters hourly weather data for a specific date
 * @param hourlyData The hourly weather data object
 * @param date The date string to filter by (YYYY-MM-DD)
 * @returns Filtered hourly data for the specified date
 */
export const filterHourlyDataForDate = (hourlyData: any, date: string) => {
  return hourlyData.time
    .map((time: string, index: number) => ({
      time,
      temperature: hourlyData.temperature_2m[index],
      humidity: hourlyData.relative_humidity_2m[index],
      precipitationProbability: hourlyData.precipitation_probability[index],
      weatherCode: hourlyData.weather_code[index],
      isDay: hourlyData.is_day[index] === 1,
      windSpeed: hourlyData.wind_speed_10m ? hourlyData.wind_speed_10m[index] : 0,
    }))
    .filter((hourData: any) => hourData.time.startsWith(date));
};
