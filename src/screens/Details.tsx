// FILE: src/screens/Details.tsx
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useColorScheme } from "nativewind";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View, Text, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { formatForecastDate } from "../utils/timeUtils";
import DailySummaryCard from "./DateScreen/DailySummaryCard";
import { RootStackParamList } from "../../App";
import HourlyConditions from "../components/HourlyConditions";
import Icon from "../components/Icon";

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, "DayDetails">;

export default function DayDetailsScreen({ route, navigation }: DetailsScreenProps) {
  const { dayData, hourlyData } = route.params;
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();

  const formattedTitle = formatForecastDate(dayData?.date);

  const headerBg = colorScheme === "dark" ? "bg-dark-surface" : "bg-light-surface";
  const headerText = colorScheme === "dark" ? "text-dark-onSurface" : "text-light-onSurface";
  const iconColor = colorScheme === "dark" ? "#e1e1e1" : "#1f1f1f";

  return (
    <SafeAreaView
      edges={["top", "left", "right", "bottom"]}
      className="flex-1 bg-light-background dark:bg-dark-background"
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={
          colorScheme === "dark" ? darkThemeColors.surface : lightThemeColors.surface
        }
      />
      <View className={`flex-row items-center h-14 px-2 shadow-sm ${headerBg}`}>
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full">
          <Icon name="arrow-left" size={24} color={iconColor} />
        </TouchableOpacity>
        <Text className={`text-xl font-medium ml-4 ${headerText}`} numberOfLines={1}>
          {formattedTitle || t("weather.hourly_forecast")}
        </Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16, gap: 20 }}>
        <DailySummaryCard dayData={dayData} />
        {hourlyData && <HourlyConditions selectedHoursData={hourlyData} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const lightThemeColors = { surface: "#ffffff" };
const darkThemeColors = { surface: "#1e1e1e" };
