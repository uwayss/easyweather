import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { DayWeather } from "../../types/weather";
import { useWeather } from "../../context/WeatherContext";
import ForecastItem from "./ForecastItem";

export default function ForecastList() {
  const { weather } = useWeather();
  const forecast = weather?.daily;

  if (!forecast) return null;

  const renderItem = ({ item, index }: { item: DayWeather; index: number }) => (
    <ForecastItem item={item} index={index} />
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
        showsHorizontalScrollIndicator={false} // Good practice to hide if not essential
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    flexGrow: 0,
    paddingLeft: 0,
    paddingRight: 8,
  },
});
