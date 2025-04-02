import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { DayWeather } from "../../types/weather";
import { useWeather } from "../../context/WeatherContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import ForecastItem from "./ForecastItem";

export default function ForecastList() {
  const { weather } = useWeather();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const forecast = weather?.daily;

  if (!forecast) return null;

  const handleForecastPress = (date: string) => {
    navigation.push("DayDetails", { date });
  };

  const renderItem = ({ item, index }: { item: DayWeather; index: number }) => (
    <ForecastItem item={item} index={index} onPress={handleForecastPress} />
  );

  return (
    <View>
      <FlatList
        data={forecast}
        renderItem={renderItem}
        keyExtractor={item => item.date}
        horizontal
        initialNumToRender={7}
        showsHorizontalScrollIndicator={false}
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
