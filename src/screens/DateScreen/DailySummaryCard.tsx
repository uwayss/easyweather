// src/screens/DateScreen/DailySummaryCard.tsx
import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Card, Divider, Icon, useTheme, MD3Theme } from "react-native-paper";
import { DayWeather } from "../../types/weather";
import weatherDescriptions from "../../utils/descriptions";
import { useSettings } from "../../context/SettingsContext";
import {
  convertTemperature,
  formatTemperature,
  convertWindSpeed,
  formatWindSpeed,
} from "../../utils/unitConversion";
import { formatTimeStringToHour } from "../../utils/timeUtils";

interface DetailItemProps {
  icon: string;
  label: string;
  value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => {
  const theme = useTheme();
  const styles = detailItemStyles(theme);
  return (
    <View style={styles.detailItem}>
      <Icon source={icon} size={24} color={theme.colors.onSurfaceVariant} />
      <Text style={styles.detailValue} variant="bodyLarge">
        {value}
      </Text>
      <Text style={styles.detailLabel} variant="labelSmall">
        {label}
      </Text>
    </View>
  );
};

export default function DailySummaryCard({ dayData }: { dayData: DayWeather }) {
  const { settings } = useSettings();
  const theme = useTheme();
  const styles = summaryCardStyles(theme);

  const weatherInfo = weatherDescriptions[dayData.weatherCode]?.day; // Assuming day for daily summary

  const formattedHigh = formatTemperature(
    convertTemperature(dayData.maxTemp, settings.useImperialUnits),
    settings.useImperialUnits,
  ).replace(/°[CF]$/, "°"); // Remove C/F suffix

  const formattedLow = formatTemperature(
    convertTemperature(dayData.minTemp, settings.useImperialUnits),
    settings.useImperialUnits,
  ).replace(/°[CF]$/, "°"); // Remove C/F suffix

  const formattedWind = formatWindSpeed(
    convertWindSpeed(dayData.windSpeed, settings.useImperialUnits),
    settings.useImperialUnits,
  );

  const formattedSunrise = formatTimeStringToHour(dayData.sunrise);
  const formattedSunset = formatTimeStringToHour(dayData.sunset);

  return (
    <Card style={styles.card} mode="contained">
      <Card.Content style={styles.cardContent}>
        {/* Top Section: Icon, Description, Temps */}
        <View style={styles.topSection}>
          <Image source={weatherInfo.image} style={styles.weatherIcon} resizeMode="contain" />
          <View style={styles.topTextContainer}>
            <Text variant="headlineSmall" style={styles.description}>
              {weatherInfo.description}
            </Text>
            <View style={styles.tempsContainer}>
              <Text variant="displaySmall" style={styles.highTemp}>
                {formattedHigh}
              </Text>
              <Text variant="headlineMedium" style={styles.lowTemp}>
                {formattedLow}
              </Text>
            </View>
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Bottom Section: Grid of Details */}
        <View style={styles.detailsGrid}>
          <DetailItem
            icon="weather-rainy"
            label="Max Precip."
            value={`${Math.round(dayData.rainProb)}%`}
          />
          <DetailItem icon="weather-windy" label="Max Wind" value={formattedWind} />
          <DetailItem
            icon="weather-sunset-up"
            label="Sunrise"
            value={formattedSunrise || "--:--"}
          />
          <DetailItem
            icon="weather-sunset-down"
            label="Sunset"
            value={formattedSunset || "--:--"}
          />
        </View>
      </Card.Content>
    </Card>
  );
}

// Styles for the Summary Card
const summaryCardStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {
      // backgroundColor: theme.colors.surfaceVariant, // Slightly different background
    },
    cardContent: {
      padding: 16,
      gap: 16, // Space between sections
    },
    topSection: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    weatherIcon: {
      width: 80,
      height: 80,
    },
    topTextContainer: {
      flex: 1,
      alignItems: "flex-start", // Align text to the start
    },
    description: {
      fontWeight: "500",
      marginBottom: 4,
    },
    tempsContainer: {
      flexDirection: "row",
      alignItems: "baseline", // Align temps nicely
      gap: 8,
    },
    highTemp: {
      fontWeight: "bold",
    },
    lowTemp: {
      color: theme.colors.onSurfaceVariant, // Muted color for low temp
    },
    divider: {
      marginVertical: 8, // Add some space around the divider
    },
    detailsGrid: {
      flexDirection: "row",
      justifyContent: "space-around", // Distribute items evenly
      alignItems: "flex-start", // Align items to top
    },
  });

// Styles for the DetailItem sub-component
const detailItemStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    detailItem: {
      alignItems: "center",
      gap: 4, // Space between icon, value, label
      flex: 1, // Allow items to take equal space
      paddingHorizontal: 4, // Prevent text collision
    },
    detailValue: {
      fontWeight: "600", // Make value slightly bolder
    },
    detailLabel: {
      color: theme.colors.onSurfaceVariant, // Muted color for label
      fontSize: 11, // Smaller label
      textAlign: "center",
    },
  });
