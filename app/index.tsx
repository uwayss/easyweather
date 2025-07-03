import { useColorScheme } from "nativewind";
import React from "react";
import { RefreshControl, ScrollView, View } from "react-native";

import HourlyConditions from "@/src/components/HourlyConditions";
import { useLocationContext } from "@/src/context/LocationContext";
import { useWeather } from "@/src/context/WeatherContext";
import { useHomeRefresh } from "@/src/hooks/useHomeRefresh";
import AirQualityCard from "@/src/screens/HomeScreen/AirQualityCard";
import ForecastList from "@/src/screens/HomeScreen/NextDays/ForecastList";
import SearchRow from "@/src/screens/HomeScreen/SearchRow";
import WeatherCard from "@/src/screens/HomeScreen/WeatherCard";

export default function Home() {
  const { colorScheme } = useColorScheme();
  const { loading: weatherLoading } = useWeather();
  const { loading: locationLoading } = useLocationContext();
  const { refreshing, onRefresh } = useHomeRefresh();
  const isLoading = locationLoading || weatherLoading;

  const refreshControlColors =
    colorScheme === "dark" ? ["#83c5be"] : ["#006d77"];
  const refreshControlTintColor =
    colorScheme === "dark" ? "#83c5be" : "#006d77";

  return (
    <View className="flex-1 bg-light-background dark:bg-dark-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-4 gap-5"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={refreshControlColors}
            tintColor={refreshControlTintColor}
            enabled={!isLoading}
          />
        }
      >
        <SearchRow />
        <WeatherCard />
        <HourlyConditions />
        <ForecastList />
        <AirQualityCard />
      </ScrollView>
    </View>
  );
}
