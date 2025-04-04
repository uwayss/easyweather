export function formatTimeStringToHour(dateString: string | undefined): string | undefined {
  if (!dateString) return undefined;
  const date = new Date(dateString);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(
    2,
    "0",
  )}`;
}

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
