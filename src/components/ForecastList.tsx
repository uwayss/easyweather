import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Card } from "react-native-paper";
import Animated, { SlideInLeft } from "react-native-reanimated";
import weatherDescriptions from "../utils/descriptions";
import { Image } from "react-native";
import { ForecastDay } from "../types/weather";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

export default function ForecastList({ forecast }: { forecast: ForecastDay[] }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (!forecast) return null;

  const handleForecastPress = (date: string) => {
    // TODO: implement the details screen
    navigation.push("DayDetails", { date });
  };

  const renderItem = ({ item, index }: { item: ForecastDay; index: number }) => {
    const weather = weatherDescriptions[item.weatherCode]?.day;
    const date = new Date(item.date);

    let dayName;
    if (index === 0) {
      dayName = "Today";
    } else if (index === 1) {
      dayName = "Tomorrow";
    } else {
      dayName = date.toLocaleDateString("en-UK", { weekday: "long" });
    }

    return (
      <Animated.View
        entering={SlideInLeft.springify()
          .damping(15)
          .mass(0.9)
          .delay(index * 80)
          .duration(300)}
      >
        <TouchableOpacity onPress={() => handleForecastPress(item.date)}>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Text variant="titleMedium" numberOfLines={1} style={styles.dayName}>
                {dayName}
              </Text>
              <Image source={weather.image} style={styles.weatherIcon} resizeMode="contain" />
              <Text variant="bodyMedium" style={styles.description} numberOfLines={1}>
                {weather.description}
              </Text>
              <View style={styles.temperatures}>
                <Text style={styles.maxTemp}>{Math.round(item.maxTemp)}°</Text>
                <Text style={styles.minTemp}>{Math.round(item.minTemp)}°</Text>
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View>
      <FlatList
        data={forecast}
        renderItem={renderItem}
        keyExtractor={item => item.date}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
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
  card: {
    width: 130,
    marginRight: 8,
    height: 180,
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 6,
  },
  weatherIcon: {
    width: 65,
    height: 65,
  },
  dayName: {
    width: "100%",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
  },
  description: {
    textAlign: "center",
    color: "#666",
    fontSize: 12,
  },
  temperatures: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  maxTemp: {
    fontSize: 18,
    fontWeight: "bold",
  },
  minTemp: {
    fontSize: 16,
    color: "#666",
  },
});
