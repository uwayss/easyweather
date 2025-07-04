/* eslint-disable import/no-named-as-default-member */
import i18next from "i18next";
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

  const isEarlyDay = currentHour < 18;

  let referenceDay: DayWeather | undefined;
  let comparisonDay: DayWeather | undefined;
  let baseSentenceKey: string;
  let comparisonTargetKey: string;

  if (isEarlyDay) {
    if (!yesterday) return i18next.t("summary.no_comparison_data");
    referenceDay = today;
    comparisonDay = yesterday;
    baseSentenceKey = "summary.today_will_be";
    comparisonTargetKey = "summary.yesterday";
  } else {
    if (!tomorrow) return i18next.t("summary.no_comparison_data");
    referenceDay = tomorrow;
    comparisonDay = today;
    baseSentenceKey = "summary.tomorrow_will_be";
    comparisonTargetKey = "summary.today";
  }

  const avgRefTemp = getAverageTemp(referenceDay, useImperial);
  const avgCompTemp = getAverageTemp(comparisonDay, useImperial);

  if (avgRefTemp === undefined || avgCompTemp === undefined) {
    return i18next.t("summary.no_comparison_data");
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

  if (i18next.language === "tr") {
    const trend = trendKey.split(".")[1];
    const comparisonTarget = comparisonTargetKey.split(".")[1];
    const combinedKey = `summary.${trend}_${comparisonTarget}`;
    return `${i18next.t(baseSentenceKey)} ${i18next.t(combinedKey)}.`;
  }

  return `${i18next.t(baseSentenceKey)} ${i18next.t(trendKey)} ${i18next.t(
    comparisonTargetKey
  )}.`;
}
