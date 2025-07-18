// FILE: src/utils/metricData.ts
import {
  HUMIDITY_COLOR_HIGH,
  HUMIDITY_COLOR_LOW,
  HUMIDITY_COLOR_MEDIUM,
  PRECIPITATION_COLOR_HIGH,
  PRECIPITATION_COLOR_LOW,
  PRECIPITATION_COLOR_MEDIUM,
  TEMP_COLOR_STOPS_CELSIUS,
  WIND_COLOR_HIGH,
  WIND_COLOR_LOW,
  WIND_COLOR_MEDIUM,
  WIND_COLOR_SEVERE,
} from "../constants/colors";
import { HourWeather } from "../types/weather";
import { getTemperatureGradientColor } from "./colorUtils";
import {
  convertTemperature,
  convertWindSpeed,
  formatTemperature,
  formatWindSpeed,
} from "./unitConversion";

export type MetricType =
  | "temperature"
  | "precipitation"
  | "humidity"
  | "wind"
  | "apparentTemperature";

export interface GraphDataPoint {
  progress: number;
  color: string;
  value: string;
  time: string;
  label: string;
}

/**
 * Formats a date string into a 24-hour "HH:00" label.
 * @param time - The ISO date string for the hour.
 * @returns A formatted string, e.g., "09:00" or "15:00".
 */
const formatHourLabel = (time: string): string => {
  const hour = new Date(time).getHours();
  const paddedHour = String(hour).padStart(2, "0");
  return `${paddedHour}:00`;
};

// --- Refactored Metric Calculation Functions ---

// Actual Temperature specific calculations for a single hour
const getTemperatureDataForHour = (
  item: HourWeather,
  useImperialUnits: boolean
): GraphDataPoint => {
  const tempCelsius: number = item.temp;
  const temp = convertTemperature(tempCelsius, useImperialUnits);

  const minTempDisplay = useImperialUnits ? 14 : -10;
  const maxTempDisplay = useImperialUnits ? 104 : 40;
  const tempProgress = Math.max(
    0,
    Math.min(1, (temp - minTempDisplay) / (maxTempDisplay - minTempDisplay))
  );

  const minTempColor = TEMP_COLOR_STOPS_CELSIUS[0][0];
  const maxTempColor =
    TEMP_COLOR_STOPS_CELSIUS[TEMP_COLOR_STOPS_CELSIUS.length - 1][0];
  const color = getTemperatureGradientColor(
    tempCelsius,
    minTempColor,
    maxTempColor
  );

  return {
    progress: tempProgress,
    color,
    value: formatTemperature(temp, useImperialUnits),
    time: item.time,
    label: formatHourLabel(item.time),
  };
};

// Apparent Temperature specific calculations for a single hour
const getApparentTemperatureDataForHour = (
  item: HourWeather,
  useImperialUnits: boolean
): GraphDataPoint => {
  const tempCelsius: number = item.apparentTemp;
  const temp = convertTemperature(tempCelsius, useImperialUnits);

  const minTempDisplay = useImperialUnits ? 14 : -10;
  const maxTempDisplay = useImperialUnits ? 104 : 40;
  const tempProgress = Math.max(
    0,
    Math.min(1, (temp - minTempDisplay) / (maxTempDisplay - minTempDisplay))
  );

  const minTempColor = TEMP_COLOR_STOPS_CELSIUS[0][0];
  const maxTempColor =
    TEMP_COLOR_STOPS_CELSIUS[TEMP_COLOR_STOPS_CELSIUS.length - 1][0];
  const color = getTemperatureGradientColor(
    tempCelsius,
    minTempColor,
    maxTempColor
  );

  return {
    progress: tempProgress,
    color,
    value: formatTemperature(temp, useImperialUnits),
    time: item.time,
    label: formatHourLabel(item.time),
  };
};

// Precipitation specific calculations for a single hour
const getPrecipitationDataForHour = (item: HourWeather): GraphDataPoint => {
  const rainProb = item.rainProb;
  let color = PRECIPITATION_COLOR_LOW;
  if (rainProb > 30) color = PRECIPITATION_COLOR_MEDIUM;
  if (rainProb > 60) color = PRECIPITATION_COLOR_HIGH;

  return {
    progress: rainProb / 100,
    color,
    value: Math.round(rainProb) + "%",
    time: item.time,
    label: formatHourLabel(item.time),
  };
};

// Humidity specific calculations for a single hour
const getHumidityDataForHour = (item: HourWeather): GraphDataPoint => {
  const humidity = item.humidity;
  let color = HUMIDITY_COLOR_LOW;
  if (humidity > 30) color = HUMIDITY_COLOR_MEDIUM;
  if (humidity > 60) color = HUMIDITY_COLOR_HIGH;

  return {
    progress: humidity / 100,
    color,
    value: Math.round(humidity) + "%",
    time: item.time,
    label: formatHourLabel(item.time),
  };
};

// Wind speed specific calculations for a single hour
const getWindSpeedDataForHour = (
  item: HourWeather,
  useImperialUnits: boolean
): GraphDataPoint => {
  const windSpeed = item.windSpeed || 0;
  const convertedWindSpeed = convertWindSpeed(windSpeed, useImperialUnits);

  const WIND_THRESHOLDS_MPH = { yellow: 3, orange: 12, red: 25 };
  const WIND_THRESHOLDS_KMH = { yellow: 5, orange: 20, red: 40 };
  const MAX_WIND_SPEED_MPH = 37;
  const MAX_WIND_SPEED_KMH = 60;

  let color = WIND_COLOR_LOW;
  const thresholds = useImperialUnits
    ? WIND_THRESHOLDS_MPH
    : WIND_THRESHOLDS_KMH;

  if (convertedWindSpeed >= thresholds.red) color = WIND_COLOR_SEVERE;
  else if (convertedWindSpeed >= thresholds.orange) color = WIND_COLOR_HIGH;
  else if (convertedWindSpeed >= thresholds.yellow) color = WIND_COLOR_MEDIUM;

  const maxWindSpeed = useImperialUnits
    ? MAX_WIND_SPEED_MPH
    : MAX_WIND_SPEED_KMH;
  const progress = Math.min(1, Math.max(0, convertedWindSpeed / maxWindSpeed));

  return {
    progress,
    color,
    value: formatWindSpeed(convertedWindSpeed, useImperialUnits),
    time: item.time,
    label: formatHourLabel(item.time),
  };
};

// --- Main Function ---

export const getMetricDataForForecast = (
  metricType: MetricType,
  forecastHours: HourWeather[] | undefined,
  useImperialUnits: boolean
): GraphDataPoint[] | undefined => {
  const metricDataArray = forecastHours?.map((hour): GraphDataPoint => {
    switch (metricType) {
      case "temperature":
        return getTemperatureDataForHour(hour, useImperialUnits);
      case "apparentTemperature":
        return getApparentTemperatureDataForHour(hour, useImperialUnits);
      case "precipitation":
        return getPrecipitationDataForHour(hour);
      case "humidity":
        return getHumidityDataForHour(hour);
      case "wind":
        return getWindSpeedDataForHour(hour, useImperialUnits);
      default:
        console.error(`Unknown metricType encountered: ${metricType}`);
        return {
          progress: 0,
          color: "#cccccc",
          value: "N/A",
          time: hour.time,
          label: "??",
        };
    }
  });

  return metricDataArray;
};
