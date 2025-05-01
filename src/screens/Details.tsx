// FILE: src/screens/Details.tsx
import React from "react";
import { ScrollView } from "react-native";
import { formatForecastDate } from "../utils/timeUtils";
import { useTheme, Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import DailySummaryCard from "./DateScreen/DailySummaryCard";
import HourlyConditions from "../components/HourlyConditions";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useTranslation } from "react-i18next";

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, "DayDetails">;

export default function DayDetailsScreen({ route, navigation }: DetailsScreenProps) {
  const { dayData, hourlyData } = route.params;
  const theme = useTheme();
  const { t } = useTranslation();

  const formattedTitle = formatForecastDate(dayData?.date);

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background }} className="flex-1">
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={formattedTitle || t("weather.hourly_forecast")} />
      </Appbar.Header>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: 16,
          gap: 20,
        }}
      >
        <DailySummaryCard dayData={dayData} />
        {hourlyData && <HourlyConditions selectedDateHourly={hourlyData} />}
      </ScrollView>
    </SafeAreaView>
  );
}
