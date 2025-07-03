import React from "react";
import { FlatList } from "react-native";

import Card from "../../../components/Common/Card";
import { useWeather } from "../../../context/WeatherContext";
import { DayWeather } from "../../../types/weather";
import ForecastItem from "./ForecastItem";
import ForecastListSkeleton from "./ForecastListSkeleton";

export default function ForecastList() {
  const { weather, loading } = useWeather();
  const dailyWeather = weather?.daily;

  if (loading && !dailyWeather) {
    return <ForecastListSkeleton />;
  }

  return (
    <Card borderType="hidden">
      {dailyWeather ? (
        <FlatList
          data={dailyWeather}
          renderItem={({
            item,
            index,
          }: {
            item: DayWeather;
            index: number;
          }) => <ForecastItem item={item} index={index} />}
          keyExtractor={(item) => item.date}
          horizontal
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
          removeClippedSubviews={true}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <ForecastListSkeleton />
      )}
    </Card>
  );
}
