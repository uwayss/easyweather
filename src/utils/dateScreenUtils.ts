/**
 * Formats a date string for display in the forecast
 * @param dateString The date string in YYYY-MM-DD format
 * @returns Formatted date string (e.g., "Tomorrow" or "Monday, January 1")
 */
export const formatForecastDate = (dateString: string | undefined): string | undefined => {
  if (!dateString) return undefined;
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

// /**
//  * Filters hourly weather data for a specific date
//  * @param hourlyData The hourly weather data object
//  * @param date The date string to filter by (YYYY-MM-DD)
//  * @returns Filtered hourly data for the specified date
//  */
// export const filterHourlyDataForDate = (
//   hourlyData: HourWeather[] | undefined,
//   date: string,
// ): HourWeather[] | undefined | null => {
//   if (!hourlyData) return null;
//   return hourlyData.filter((hourData: HourWeather) => hourData.time.startsWith(date));
// };
