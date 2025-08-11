// FILE: app/details.tsx
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";

import HourlyConditions from "@/src/components/HourlyConditions";
import ScreenHeader from "@/src/components/ScreenHeader";
import DailySummaryCard from "@/src/screens/DateScreen/DailySummaryCard";
import { DataError } from "@/src/screens/DateScreen/DataError";
import { DayWeather, HourWeather } from "@/src/types/weather";
import { formatForecastDate } from "@/src/utils/timeUtils";

export default function DayDetailsScreen() {
  const params = useLocalSearchParams<{
    dayData?: string;
    hourlyData?: string;
  }>();

  const dayData: DayWeather | undefined = params.dayData
    ? (JSON.parse(params.dayData) as DayWeather)
    : undefined;
  const hourlyData: HourWeather[] | undefined = params.hourlyData
    ? (JSON.parse(params.hourlyData) as HourWeather[])
    : undefined;

  const { t } = useTranslation();

  const formattedTitle = formatForecastDate(dayData?.date);

  if (!dayData) {
    return <DataError />;
  }

  return (
    <ScrollView
      className="flex-1 bg-light-background dark:bg-dark-background"
      contentContainerClassName="pt-10 px-4 pb-4 gap-5"
    >
      <ScreenHeader title={formattedTitle || t("weather.hourly_forecast")} />
      <DailySummaryCard dayData={dayData} />
      {hourlyData && hourlyData.length > 0 && (
        <HourlyConditions selectedHoursData={hourlyData} />
      )}
    </ScrollView>
  );
}
