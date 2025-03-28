import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Surface, Text } from "react-native-paper";
import { CurrentWeather } from "../../types/weather";
import weatherDescriptions from "../../utils/descriptions";
import backgroundMappings from "../../utils/backgroundMappings";
import React from "react";

interface MainInfoProps {
  name: string;
  current: CurrentWeather | undefined;
}
interface DetailsProps {
  current: CurrentWeather | undefined;
}

export function ConditionalBackground({
  children,
  current,
}: {
  children: React.ReactNode;
  current: CurrentWeather | undefined;
}) {
  const timeOfDay = current?.is_day ? "day" : "night";
  let background;
  if (current) {
    background = backgroundMappings[current.weather_code]?.[timeOfDay];
  }

  return (
    <FastImage
      source={background ? background : undefined}
      style={styles.background}
      resizeMode="cover"
    >
      {children}
    </FastImage>
  );
}

export function MainInfo({ name, current }: MainInfoProps) {
  const timeOfDay = current?.is_day ? "day" : "night";
  // let description = weatherDescriptions[0][timeOfDay].description;
  const description = current
    ? weatherDescriptions[current.weather_code]?.[timeOfDay].description
    : null;

  return (
    <View style={styles.mainInfoContainer}>
      <Surface style={styles.mainInfo} elevation={5}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationName} numberOfLines={1} ellipsizeMode="tail">
            {name}
          </Text>
        </View>
        <Text style={styles.temperature}>
          {current ? Math.round(current.temperature_2m) : ""}°C
        </Text>
        <Text variant="headlineSmall" style={styles.description}>
          {description ? description : ""}
        </Text>
        <Text variant="titleMedium" style={styles.feelsLike}>
          Feels like {current ? Math.round(current.apparent_temperature) : ""}°
        </Text>
      </Surface>
    </View>
  );
}

export function Details({ current }: DetailsProps) {
  return (
    <View>
      <Surface style={styles.detailsContainer} elevation={5}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{current?.relative_humidity_2m}%</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Wind Speed</Text>
          <Text style={styles.detailValue}>{current?.wind_speed_10m} km/h</Text>
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: 360,
  },
  mainInfoContainer: {
    flex: 1,
  },
  mainInfo: {
    borderRadius: 12,
    padding: 16,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    opacity: 0.85,
  },
  temperature: {
    fontWeight: "bold",
    fontSize: 48,
  },
  description: {
    width: "100%",
    flexWrap: "wrap",
    textTransform: "uppercase",
    marginTop: 4,
    letterSpacing: 3,
    textAlign: "center",
  },
  feelsLike: {
    opacity: 0.9,
    marginTop: 8,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 12,
    padding: 16,
    width: "100%",
    opacity: 0.85,
  },
  detailItem: {
    flex: 1,
    alignItems: "center",
  },
  separator: {
    width: 1,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.3)",
    marginHorizontal: 16,
  },
  detailLabel: {
    opacity: 0.8,
    fontSize: 14,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  locationContainer: {
    borderRadius: 12,
    padding: 12,
    alignSelf: "center",
    width: "100%",
    backgroundColor: "transparent",
  },
  locationName: {
    textAlign: "center",
    width: "100%",
  },
});
