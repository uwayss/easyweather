import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { DayWeather, HourWeather } from "../../types/weather";
import { useWeather } from "../../context/WeatherContext";
import ForecastItem from "./ForecastItem";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

export default function ForecastList({
  bottomSheetRef,
  setSelectedDayData,
  setSelectedHourlyData,
}: {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  setSelectedDayData: React.Dispatch<React.SetStateAction<DayWeather | undefined>>;
  setSelectedHourlyData: React.Dispatch<React.SetStateAction<HourWeather[] | undefined>>;
}) {
  const { weather } = useWeather();
  const forecast = weather?.daily;

  if (!forecast) return null;

  const renderItem = ({ item, index }: { item: DayWeather; index: number }) => (
    <ForecastItem
      item={item}
      index={index}
      bottomSheetRef={bottomSheetRef}
      setSelectedDayData={setSelectedDayData}
      setSelectedHourlyData={setSelectedHourlyData}
    />
  );

  return (
    <View>
      <FlatList
        data={forecast}
        renderItem={renderItem}
        keyExtractor={item => item.date}
        horizontal
        initialNumToRender={7}
        contentContainerStyle={styles.container}
        removeClippedSubviews={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    gap: 8,
    flexGrow: 0,
  },
});
