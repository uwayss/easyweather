import { LinearGradient } from "react-native-linear-gradient";
import { useEffect } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import Animated, {
  FadeInDown,
  withRepeat,
  withSequence,
  withTiming,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { CurrentWeather } from "../types/weather";
import weatherDescriptions from "../utils/descriptions";
import backgroundMappings from "../utils/backgroundMappings";

interface LocationDisplayProps {
  displayName: string;
}
interface MainInfoProps {
  name: string;
  current: CurrentWeather;
}
interface DetailsProps {
  current: CurrentWeather;
}
export function LocationDisplay({ displayName }: LocationDisplayProps) {
  return (
    <Surface style={styles.locationContainer} mode="flat">
      <Text style={styles.locationName} numberOfLines={1} ellipsizeMode="tail" variant="bodyLarge">
        {displayName}
      </Text>
    </Surface>
  );
}
export function ConditionalBackground({
  children,
  current,
}: {
  children: React.ReactNode;
  current: CurrentWeather;
}) {
  const timeOfDay = current.is_day ? "day" : "night";
  const background =
    backgroundMappings[current.weather_code]?.[timeOfDay] || backgroundMappings.default[timeOfDay];
  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      {children}
    </ImageBackground>
  );
}
export function GradientTint() {
  const gradientOpacity = useSharedValue(0.3);

  useEffect(() => {
    gradientOpacity.value = withRepeat(
      withSequence(withTiming(0.4, { duration: 2000 }), withTiming(0.3, { duration: 2000 })),
      -1,
      true,
    );
  }, [gradientOpacity]);

  const gradientStyle = useAnimatedStyle(() => ({
    opacity: gradientOpacity.value,
  }));
  return (
    <Animated.View style={[{ position: "absolute", width: "100%", height: "100%" }, gradientStyle]}>
      <LinearGradient
        colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0)"]}
        // start={[0, 0]}
        // end={[1, 1]}
        // style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
}

export function MainInfo({ name, current }: MainInfoProps) {
  const timeOfDay = current.is_day ? "day" : "night";
  const weatherDescription =
    weatherDescriptions[current.weather_code]?.[timeOfDay].description ||
    weatherDescriptions[0][timeOfDay].description;
  return (
    <Animated.View entering={FadeInDown.duration(800)} style={styles.mainInfoContainer}>
      <Surface style={styles.mainInfo} elevation={5}>
        <LocationDisplay displayName={name} />
        <Animated.Text
          entering={FadeInDown.duration(600)}
          style={[styles.temperature, { fontSize: 48 }]}
        >
          {Math.round(current.temperature_2m)}°C
        </Animated.Text>
        <Text variant="headlineSmall" style={styles.description}>
          {weatherDescription}
        </Text>
        <Text variant="titleMedium" style={styles.feelsLike}>
          Feels like {Math.round(current.apparent_temperature)}°
        </Text>
      </Surface>
    </Animated.View>
  );
}

export function Details({ current }: DetailsProps) {
  return (
    <Animated.View entering={FadeInDown.springify().damping(15).mass(0.9).duration(600).delay(150)}>
      <Surface style={styles.detailsContainer} elevation={5}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{current.relative_humidity_2m}%</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Wind Speed</Text>
          <Text style={styles.detailValue}>{current.wind_speed_10m} km/h</Text>
        </View>
      </Surface>
    </Animated.View>
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
    color: "white",
    fontWeight: "bold",
  },
  description: {
    color: "white",
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: 3,
    flexWrap: "wrap",
  },
  feelsLike: {
    color: "white",
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
    color: "white",
    opacity: 0.8,
    fontSize: 14,
    marginBottom: 4,
  },
  detailValue: {
    color: "white",
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
