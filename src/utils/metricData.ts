import { HourWeather } from "../types/weather";
import { DEFAULT_TEMP_COLOR_STOPS, getTemperatureGradientColor } from "./colorUtils";
import {
  convertTemperature,
  convertWindSpeed,
  formatTemperature,
  formatWindSpeed,
} from "./unitConversion";
export type MetricType = "temperature" | "precipitation" | "humidity" | "wind";

export interface GraphDataPoint {
  progress: number;
  color: string;
  value: string;
  time: string;
  label: string;
  highlight?: boolean;
}

// --- Refactored Metric Calculation Functions ---

// Temperature specific calculations for a single hour
const getTemperatureDataForHour = (
  item: HourWeather,
  useImperialUnits: boolean,
): GraphDataPoint => {
  const tempCelsius: number = item.temp;
  const temp = convertTemperature(tempCelsius, useImperialUnits);

  // Adjust min/max temp range based on unit system FOR DISPLAY/PROGRESS
  // Note: min/max passed to getTemperatureGradientColor might need different units
  const minTempDisplay = useImperialUnits ? 14 : -10;
  const maxTempDisplay = useImperialUnits ? 104 : 40;
  const tempProgress = Math.max(
    0,
    Math.min(1, (temp - minTempDisplay) / (maxTempDisplay - minTempDisplay)),
  );

  // Define min/max for color gradient (ensure these units match what getTemperatureGradientColor expects!)
  // For simplicity here, let's assume it always works with Celsius ranges for color.
  const minTempColor = -10; // Celsius
  const maxTempColor = 40; // Celsius
  const colorStops = DEFAULT_TEMP_COLOR_STOPS;
  const color = getTemperatureGradientColor(tempCelsius, minTempColor, maxTempColor, colorStops);
  const hourTime = new Date(item.time).getHours();
  const formattedHour =
    hourTime === 0
      ? "12 AM"
      : hourTime === 12
      ? "12 PM"
      : hourTime > 12
      ? `${hourTime - 12} PM`
      : `${hourTime} AM`;
  const itemHour = new Date(item.time).getHours();
  const currentHour = new Date().getHours();
  const highlight = itemHour === currentHour;
  return {
    progress: tempProgress,
    color,
    value: formatTemperature(temp, useImperialUnits),
    time: item.time,
    label: formattedHour,
    highlight,
  };
};

// Precipitation specific calculations for a single hour
const getPrecipitationDataForHour = (item: HourWeather): GraphDataPoint => {
  const rainProb = item.rainProb;
  let color = "#90be6d"; // Green
  if (rainProb > 30) color = "#f9c74f"; // Yellow
  if (rainProb > 60) color = "#f94144"; // Red
  const hourTime = new Date(item.time).getHours();
  const formattedHour =
    hourTime === 0
      ? "12 AM"
      : hourTime === 12
      ? "12 PM"
      : hourTime > 12
      ? `${hourTime - 12} PM`
      : `${hourTime} AM`;
  const itemHour = new Date(item.time).getHours();
  const currentHour = new Date().getHours();
  const highlight = itemHour === currentHour;
  return {
    progress: rainProb / 100,
    color,
    value: Math.round(rainProb) + "%", // Round probability for display
    time: item.time,
    label: formattedHour,
    highlight,
  };
};

// Humidity specific calculations for a single hour
const getHumidityDataForHour = (item: HourWeather): GraphDataPoint => {
  const humidity = item.humidity;
  let color = "#ffd166"; // Light Orange/Yellow
  if (humidity > 30) color = "#06d6a0"; // Teal
  if (humidity > 60) color = "#118ab2"; // Blue
  const hourTime = new Date(item.time).getHours();
  const formattedHour =
    hourTime === 0
      ? "12 AM"
      : hourTime === 12
      ? "12 PM"
      : hourTime > 12
      ? `${hourTime - 12} PM`
      : `${hourTime} AM`;
  const itemHour = new Date(item.time).getHours();
  const currentHour = new Date().getHours();
  const highlight = itemHour === currentHour;
  return {
    progress: humidity / 100,
    color,
    value: Math.round(humidity) + "%", // Round humidity for display
    time: item.time,
    label: formattedHour,
    highlight,
  };
};

// Wind speed specific calculations for a single hour
const getWindSpeedDataForHour = (item: HourWeather, useImperialUnits: boolean): GraphDataPoint => {
  const windSpeed = item.windSpeed || 0;
  // Convert wind speed based on user preference
  const convertedWindSpeed = convertWindSpeed(windSpeed, useImperialUnits);

  // Adjust color thresholds based on unit system
  let color = "#90be6d"; // Green
  if (useImperialUnits) {
    // Thresholds in mph
    if (convertedWindSpeed >= 3) color = "#f9c74f"; // Yellow
    if (convertedWindSpeed >= 12) color = "#f8961e"; // Orange
    if (convertedWindSpeed >= 25) color = "#f94144"; // Red
  } else {
    // Thresholds in km/h (assuming base unit is km/h)
    if (convertedWindSpeed >= 5) color = "#f9c74f"; // Yellow
    if (convertedWindSpeed >= 20) color = "#f8961e"; // Orange
    if (convertedWindSpeed >= 40) color = "#f94144"; // Red
  }

  // Adjust max wind speed for progress calculation based on unit system
  const maxWindSpeed = useImperialUnits ? 37 : 60; // Approx: 60 km/h ≈ 37 mph
  const progress = Math.min(1, Math.max(0, convertedWindSpeed / maxWindSpeed)); // Ensure progress is 0-1
  const hourTime = new Date(item.time).getHours();
  const formattedHour =
    hourTime === 0
      ? "12 AM"
      : hourTime === 12
      ? "12 PM"
      : hourTime > 12
      ? `${hourTime - 12} PM`
      : `${hourTime} AM`;
  const itemHour = new Date(item.time).getHours();
  const currentHour = new Date().getHours();
  const highlight = itemHour === currentHour;
  return {
    progress,
    color,
    value: formatWindSpeed(convertedWindSpeed, useImperialUnits),
    time: item.time,
    label: formattedHour,
    highlight,
  };
};

// --- Main Function ---

/**
 * Processes an array of forecast hours to extract metric-specific data points.
 * @param metricType The type of metric to calculate ("temperature", "precipitation", "humidity", "wind").
 * @param forecastHours An array of ForecastHour objects.
 * @param settings User settings, including unit preference.
 * @returns An array of GraphDataPoint objects corresponding to each forecast hour.
 */
export const getMetricDataForForecast = (
  metricType: MetricType,
  forecastHours: HourWeather[],
  useImperialUnits: boolean,
): GraphDataPoint[] => {
  // Map each hour to its corresponding metric data point
  const metricDataArray = forecastHours.map((hour): GraphDataPoint => {
    switch (metricType) {
      case "temperature":
        return getTemperatureDataForHour(hour, useImperialUnits);
      case "precipitation":
        return getPrecipitationDataForHour(hour);
      case "humidity":
        return getHumidityDataForHour(hour);
      case "wind":
        return getWindSpeedDataForHour(hour, useImperialUnits);
      default:
        // Handle unexpected metricType. Throwing an error is often better
        // than returning potentially misleading default data in an array context.
        // You could also return a default/error GraphDataPoint if preferred.
        console.error(`Unknown metricType encountered: ${metricType}`);
        // Return a default/error state or throw
        return {
          progress: 0,
          color: "#cccccc",
          value: "N/A",
          time: "",
          label: "",
          highlight: false,
        };
      // throw new Error(`Unsupported metricType: ${metricType}`);
    }
  });

  return metricDataArray;
};
