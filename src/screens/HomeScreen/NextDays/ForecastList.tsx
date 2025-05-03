// FILE: src/screens/HomeScreen/NextDays/ForecastList.tsx
import React from "react"; // Removed useEffect import
import { FlatList, ScrollView } from "react-native";
import { DayWeather } from "../../../types/weather";
import { useWeather } from "../../../context/WeatherContext";
import ForecastItem from "./ForecastItem";
import Card from "../../../components/Common/Card";
import EmptyForecastList from "./EmptyForecastList";

export default function ForecastList() {
  const { weather, loading: isLoading } = useWeather();
  return (
    <Card borderType="hidden">
      {!isLoading ? (
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
