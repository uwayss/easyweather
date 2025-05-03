// FILE: src/screens/HomeScreen/NextDays/ForecastList.tsx
import React from "react"; // Removed useEffect import
import { FlatList, ScrollView } from "react-native";

import EmptyForecastList from "./EmptyForecastList";
import ForecastItem from "./ForecastItem";
import Card from "../../../components/Common/Card";
import { useWeather } from "../../../context/WeatherContext";
import { DayWeather } from "../../../types/weather";

export default function ForecastList() {
  const { weather } = useWeather();
  const dailyWeather = weather?.daily;
  return (
    <Card borderType="hidden">
      {dailyWeather ? (
        <FlatList
          data={dailyWeather}
          renderItem={({ item, index }: { item: DayWeather; index: number }) => (
            <ForecastItem item={item} index={index} />
          )}
          keyExtractor={item => item.date}
          horizontal
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
          contentContainerStyle={{
            paddingVertical: 8,
            paddingLeft: 0,
            paddingRight: 8,
          }}
          removeClippedSubviews={true}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 8,
            paddingLeft: 0,
            paddingRight: 8,
          }}
        >
          <EmptyForecastList />
        </ScrollView>
      )}
    </Card>
  );
}
