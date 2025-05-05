// FILE: src/screens/Home.tsx
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useColorScheme } from "nativewind";
import React from "react";
import { RefreshControl, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootStackParamList } from "../../App";
import HourlyConditions from "../components/HourlyConditions";
import { useLocationContext } from "../context/LocationContext";
import { useWeather } from "../context/WeatherContext";
import { useHomeRefresh } from "../hooks/useHomeRefresh";
import ForecastList from "./HomeScreen/NextDays/ForecastList";
import SearchRow from "./HomeScreen/SearchRow";
import WeatherCard from "./HomeScreen/WeatherCard";

export type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: HomeProps) {
  const { colorScheme } = useColorScheme();
  const { loading: weatherLoading, } = useWeather();
  const { loading: locationLoading } = useLocationContext();
  const { refreshing, onRefresh } = useHomeRefresh();
  const isLoading = locationLoading || weatherLoading;

  const refreshControlColors = colorScheme === "dark" ? ["#83c5be"] : ["#006d77"];
  const refreshControlTintColor = colorScheme === "dark" ? "#83c5be" : "#006d77";

  return (
    <SafeAreaView className="flex-1 bg-light-background dark:bg-dark-background">
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
        <SearchRow navigation={navigation} />
        <WeatherCard />
        <HourlyConditions />
        <ForecastList />
      </ScrollView>
    </SafeAreaView>
  );
}