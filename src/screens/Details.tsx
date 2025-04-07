import React, { useEffect } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { formatForecastDate } from "../utils/timeUtils";
import { useTheme, Title, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import DailySummaryCard from "./DateScreen/DailySummaryCard";
import HourlyForecastCard from "./DateScreen/HourlyForecastCard";
import { DayWeather, HourWeather } from "../types/weather";
import { BottomSheetScrollView, useBottomSheet } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";

type DetailsProps = {
  selectedDay?: DayWeather;
  selectedDateHourly?: HourWeather[];
};

export default function Details({ selectedDay, selectedDateHourly }: DetailsProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  const formattedTitle = formatForecastDate(selectedDay?.date);
  const { close } = useBottomSheet();

  // Add back button handler
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      // Close the sheet instead of exiting the app
      close();
      return true; // Prevent default behavior (app exit)
    });

    // Clean up the event listener when component unmounts
    return () => backHandler.remove();
  }, [close]);

  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor: theme.colors.background }]}>
      <View style={styles.titleContainer}>
        <IconButton icon={"arrow-up"} onPress={() => close()} />
        <Title style={styles.appBarTitle}>{formattedTitle || t("weather.hourly_forecast")}</Title>
      </View>
      <BottomSheetScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <DailySummaryCard dayData={selectedDay} />
        {selectedDateHourly && <HourlyForecastCard inSheet hourlyData={selectedDateHourly} />}
      </BottomSheetScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
  },
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 8,
    gap: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  appBarTitle: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "70%",
  },
});
