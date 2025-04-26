// FILE: src/screens/HomeScreen/ForecastList.tsx
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { DayWeather } from "../../types/weather";
import { useWeather } from "../../context/WeatherContext";
import ForecastItem from "./ForecastItem";

export default function ForecastList() {
  // Destructure isLoading
  const { weather } = useWeather();
  const forecast = weather?.daily;

  // Render empty view or message if not loading but no forecast data
  if (!forecast || forecast.length === 0) {
    // Optionally render a message or null
    return null;
    // return <View style={styles.container}><Text>No forecast data.</Text></View>;
  }

  // Render the actual forecast list
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
        maxToRenderPerBatch={7} // Match initialNumToRender
        windowSize={7} // Optimize window size
        contentContainerStyle={styles.container}
        removeClippedSubviews={true} // Enable for performance on lists
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    // No flexGrow needed for horizontal FlatList container
    paddingLeft: 0, // Ensure it starts from the edge if needed
    paddingRight: 8, // Space at the end
  },
  skeletonContainer: {
    flexDirection: "row", // Necessary for horizontal ScrollView
    paddingVertical: 8,
    paddingLeft: 0,
    paddingRight: 8,
  },
});
