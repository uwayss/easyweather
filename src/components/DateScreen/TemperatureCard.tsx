import React from "react";
import { Text, Card, Divider } from "react-native-paper";
import { FlatList, View } from "react-native";
import { styles } from "./styles";
import { ForecastHour } from "../../types/weather";
import HourProgress from "./HourProgress";
import { useSettings } from "../../context/SettingsContext";
import { convertTemperature, formatTemperature } from "../../utils/unitConversion";
import { DEFAULT_TEMP_COLOR_STOPS, getTemperatureGradientColor } from "../../utils/colorUtils";

function Hour({
  item,
}: {
  item: {
    humidity: number;
    isDay: boolean;
    rainProb: number;
    temperature: number;
    time: string;
    weatherCode: number;
    windSpeed: number;
  };
}) {
  const { settings } = useSettings();
  const tempCelsius: number = item.temperature;
  const temp = convertTemperature(tempCelsius, settings.useImperialUnits);

  // Current hour comparison
  const currentHour = new Date().getHours();
  const itemHour = new Date(item.time).getHours();
  const isCurrentHour = currentHour === itemHour;

  // Adjust min/max temp range based on unit system
  const minTemp = settings.useImperialUnits ? 14 : -10;
  const maxTemp = settings.useImperialUnits ? 104 : 40;
  const tempProgress = Math.max(0, Math.min(1, (temp - minTemp) / (maxTemp - minTemp)));

  const getTemperatureColor = (temp: number) => {
    // Use default color stops from colorUtils
    const colorStops = DEFAULT_TEMP_COLOR_STOPS;

    // Get min/max temperature range based on unit system
    const minTemp = settings.useImperialUnits ? 14 : -10;
    const maxTemp = settings.useImperialUnits ? 104 : 40;

    // Use the gradient color utility to get a smooth color transition
    return getTemperatureGradientColor(temp, minTemp, maxTemp, colorStops);
  };

  return (
    <View style={isCurrentHour ? styles.currentHour : null}>
      <HourProgress
        time={item.time}
        color={getTemperatureColor(tempCelsius)}
        progress={tempProgress}
        value={formatTemperature(temp, settings.useImperialUnits)}
      />
    </View>
  );
}

export function TemperatureCard({ selectedDateHourly }: { selectedDateHourly: ForecastHour[] }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.precipitationTitle}>
          Hourly Temperature
        </Text>
        <Divider style={styles.divider} />
        <View style={styles.scrollContainer}>
          <FlatList
            horizontal
            data={selectedDateHourly}
            renderItem={({ item }) => <Hour item={item} />}
            initialNumToRender={7}
            windowSize={7}
            contentContainerStyle={styles.hourlyContainer}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
          />
        </View>
        <Text style={styles.scrollHint}>Swipe to see more hours →</Text>
      </Card.Content>
    </Card>
  );
}
