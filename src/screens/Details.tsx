// FILE: src/screens/Details.tsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { formatForecastDate } from "../utils/timeUtils";
import { useTheme, Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import DailySummaryCard from "./DateScreen/DailySummaryCard";
import HourlyForecastCard from "./DateScreen/HourlyForecastCard";

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
    <SafeAreaView style={[styles.safeContainer, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={formattedTitle || t("weather.hourly_forecast")} />
      </Appbar.Header>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <DailySummaryCard dayData={dayData} />
        {hourlyData && <HourlyForecastCard hourlyData={hourlyData} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 20,
  },
});
