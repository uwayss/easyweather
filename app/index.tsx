import { useColorScheme } from "nativewind";
import React, { useRef } from "react";
import { RefreshControl, ScrollView } from "react-native";

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
  const scrollViewRef = useRef<ScrollView>(null);
  const hasScrolledAfterLoad = useRef(false);

  if (isLoading) {
    hasScrolledAfterLoad.current = false;
  }

  const handleContentSizeChange = () => {
    if (!isLoading && !hasScrolledAfterLoad.current) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
      hasScrolledAfterLoad.current = true;
    }
  };

  const refreshControlColors =
    colorScheme === "dark" ? ["#83c5be"] : ["#006d77"];
  const refreshControlTintColor =
    colorScheme === "dark" ? "#83c5be" : "#006d77";

  return (
    <ScrollView
      ref={scrollViewRef}
      className="flex-1 bg-light-background dark:bg-dark-background"
      contentContainerClassName="pt-10 px-4 pb-4 gap-5"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="never"
      onContentSizeChange={handleContentSizeChange}
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
  );
}
