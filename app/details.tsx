// FILE: app/details.tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import HourlyConditions from "@/src/components/HourlyConditions";
import DailySummaryCard from "@/src/screens/DateScreen/DailySummaryCard";
import { DayWeather, HourWeather } from "@/src/types/weather";
import { formatForecastDate } from "@/src/utils/timeUtils";
import ScreenHeader from "@/src/components/ScreenHeader";

export default function DayDetailsScreen() {
  const router = useRouter();
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
    return (
      <View className="flex-1 bg-light-background dark:bg-dark-background items-center justify-center">
        <Text className="text-light-onSurface dark:text-dark-onSurface">
          {t("weather.hourly_data_error")}
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 p-2 bg-light-primary dark:bg-dark-primary rounded"
        >
          <Text className="text-white dark:text-black">
            {t("common.go_back")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-light-background dark:bg-dark-background"
      contentContainerClassName="pt-10 px-4 gap-5"
    >
      <ScreenHeader title={formattedTitle || t("weather.hourly_forecast")} />
      <DailySummaryCard dayData={dayData} />
      {hourlyData && hourlyData.length > 0 && (
        <HourlyConditions selectedHoursData={hourlyData} />
      )}
    </ScrollView>
  );
}
