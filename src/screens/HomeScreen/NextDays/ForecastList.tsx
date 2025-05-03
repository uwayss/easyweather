// FILE: src/screens/HomeScreen/NextDays/ForecastList.tsx
import React from "react"; // Removed useEffect
import { FlatList } from "react-native";
import { DayWeather } from "../../../types/weather";
import { useWeather } from "../../../context/WeatherContext";
import ForecastItem from "./ForecastItem";
import Card from "../../../components/Common/Card";
import EmptyForecastList from "./EmptyForecastList";

export default function ForecastList() {
  console.log("LOG_MARKER: Rendering ForecastList"); // Log component render start
  const { weather } = useWeather();

  return (
    <Card borderType="hidden">
      <FlatList
        data={weather?.daily}
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
        ListEmptyComponent={EmptyForecastList}
      />
    </Card>
  );
}
