// FILE: app/details.tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import HourlyConditions from "@/src/components/HourlyConditions";
import Icon from "@/src/components/Icon";
import DailySummaryCard from "@/src/screens/DateScreen/DailySummaryCard";
import { DayWeather, HourWeather } from "@/src/types/weather";
import { formatForecastDate } from "@/src/utils/timeUtils";

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

  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();

  const formattedTitle = formatForecastDate(dayData?.date);

  const headerBg =
    colorScheme === "dark" ? "bg-dark-surface" : "bg-light-surface";
  const headerText =
    colorScheme === "dark" ? "text-dark-onSurface" : "text-light-onSurface";

  if (!dayData) {
    return (
      <View
        // edges={["top", "left", "right", "bottom"]}
        className="flex-1 bg-light-background dark:bg-dark-background items-center justify-center"
      >
        <Text className="text-light-onSurface dark:text-dark-onSurface">
          Error: Weather data not found.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 p-2 bg-light-primary dark:bg-dark-primary rounded"
        >
          <Text className="text-white dark:text-black">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      // edges={["top", "left", "right", "bottom"]}
      className="flex-1 bg-light-background dark:bg-dark-background"
    >
      <View className={`flex-row items-center h-14 px-2 shadow-sm ${headerBg}`}>
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-full"
        >
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text
          className={`text-xl font-medium ml-4 ${headerText}`}
          numberOfLines={1}
        >
          {formattedTitle || t("weather.hourly_forecast")}
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, gap: 20 }}
      >
        <DailySummaryCard dayData={dayData} />
        {hourlyData && hourlyData.length > 0 && (
          <HourlyConditions selectedHoursData={hourlyData} />
        )}
      </ScrollView>
    </View>
  );
}
