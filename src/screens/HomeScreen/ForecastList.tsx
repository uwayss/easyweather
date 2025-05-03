// FILE: src/screens/HomeScreen/ForecastList.tsx
import React from "react";
import { FlatList } from "react-native";
import { DayWeather } from "../../types/weather";
import { useWeather } from "../../context/WeatherContext";
import ForecastItem from "./ForecastItem";
import Card from "../../components/Common/Card";

export default function ForecastList() {
  const { weather } = useWeather();
  const forecast = weather?.daily;
  // const forecast = null;

  // Render empty view or message if not loading but no forecast data
  // if (!forecast || forecast.length === 0) {
  //   // Optionally render a message or null
  //   return null;
  //   // return <View style={styles.container}><Text>No forecast data.</Text></View>;
  // }

  // Render the actual forecast list
  const renderItem = ({ item, index }: { item: DayWeather; index: number }) => (
    <ForecastItem item={item} index={index} />
  );
  function EmptyComponent() {
    const emptyList: DayWeather[] = Array.from({ length: 4 }, () => ({
      empty: true,
      date: "",
      maxTemp: 0,
      minTemp: 0,
      weatherCode: 0,
      rainProb: 0,
      windSpeed: 0,
      sunset: "",
      sunrise: "",
    }));

    return (
      <>
        {emptyList.map(function (item: DayWeather, index: number) {
          return <ForecastItem item={item} index={index} key={index} />;
        })}
      </>
    );
  }
  return (
    <Card borderType="hidden">
      <FlatList
        data={forecast}
        renderItem={renderItem}
        keyExtractor={item => item.date}
        horizontal
        initialNumToRender={7}
        maxToRenderPerBatch={7} // Match initialNumToRender
        windowSize={7} // Optimize window size
        contentContainerStyle={{
          paddingVertical: 8,
          paddingLeft: 0, // Ensure it starts from the edge if needed
          paddingRight: 8, // Space at the end
        }}
        removeClippedSubviews={true} // Enable for performance on lists
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={EmptyComponent}
      />
    </Card>
  );
}
