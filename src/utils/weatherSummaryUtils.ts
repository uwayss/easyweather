// FILE: src/utils/weatherSummaryUtils.ts
import { t } from "i18next";
import { DayWeather } from "../types/weather";
import { convertTemperature } from "./unitConversion";

const TEMP_SIMILAR_THRESHOLD_C = 2;
const TEMP_SIMILAR_THRESHOLD_F = 4;

function getAverageTemp(
  day: DayWeather | undefined,
  useImperial: boolean
): number | undefined {
  if (!day) return undefined;
  const max = convertTemperature(day.maxTemp, useImperial);
  const min = convertTemperature(day.minTemp, useImperial);
  return (max + min) / 2;
}

export function generateWeatherSummaryLabel(
  today: DayWeather | undefined,
  tomorrow: DayWeather | undefined,
  yesterday: DayWeather | undefined,
  useImperial: boolean
): string | null {
  if (!today) return null;

  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const isEarlyDay = currentHour < 18; // Before 6 PM

  let referenceDay: DayWeather | undefined;
  let comparisonDay: DayWeather | undefined;
  let baseSentenceKey: string;
  let comparisonTargetKey: string;

  if (isEarlyDay) {
    // Focus on "Today vs Yesterday"
    if (!yesterday) return t("summary.no_comparison_data");
    referenceDay = today;
    comparisonDay = yesterday;
    baseSentenceKey = "summary.today_will_be";
    comparisonTargetKey = "summary.yesterday";
  } else {
    // Focus on "Tomorrow vs Today"
    if (!tomorrow) return t("summary.no_comparison_data"); // Or a message about tomorrow if today is also undefined
    referenceDay = tomorrow;
    comparisonDay = today;
    baseSentenceKey = "summary.tomorrow_will_be";
    comparisonTargetKey = "summary.today";
  }

  const avgRefTemp = getAverageTemp(referenceDay, useImperial);
  const avgCompTemp = getAverageTemp(comparisonDay, useImperial);

  if (avgRefTemp === undefined || avgCompTemp === undefined) {
    return t("summary.no_comparison_data");
  }

  const tempDiff = avgRefTemp - avgCompTemp;
  const similarThreshold = useImperial
    ? TEMP_SIMILAR_THRESHOLD_F
    : TEMP_SIMILAR_THRESHOLD_C;

  let trendKey: string;
  if (Math.abs(tempDiff) <= similarThreshold) {
    trendKey = "summary.similar_to";
  } else if (tempDiff > 0) {
    trendKey = "summary.warmer_than";
  } else {
    trendKey = "summary.colder_than";
  }

  // Example: "Today will be warmer than yesterday."
  // Using i18n's interpolation or just simple string concatenation
  return `${t(baseSentenceKey)} ${t(trendKey)} ${t(comparisonTargetKey)}.`;
}
