// FILE: src/screens/DateScreen/DailySummaryCard.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Card, Divider, Icon, useTheme, MD3Theme } from "react-native-paper";
import { DayWeather } from "../../types/weather";
import { useWeatherDescriptions } from "../../utils/descriptions";
import { useSettings } from "../../context/SettingsContext";
import { useTranslation } from "react-i18next";
import { convertTemperature, convertWindSpeed, formatWindSpeed } from "../../utils/unitConversion";
import { formatTimeStringToHour } from "../../utils/timeUtils";
import FastImage from "react-native-fast-image"; // Use FastImage

interface DetailItemProps {
  icon: string;
  label: string;
  value: string;
  unit?: string; // Optional unit
  color?: string;
}

// DetailItem remains largely the same internally, but we might adjust styles
const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value, unit, color }) => {
  const theme = useTheme();
  const styles = detailItemStyles(theme);
  return (
    <View style={styles.detailItem}>
      <Icon source={icon} size={20} color={color || theme.colors.onSurfaceVariant} />
      <View style={styles.detailTextsContainer}>
        <Text style={styles.detailValue} variant="bodyMedium">
          {value}
          {unit && <Text style={styles.detailUnit}>{unit}</Text>}
        </Text>
        <Text style={styles.detailLabel} variant="labelSmall" numberOfLines={1}>
          {label}
        </Text>
      </View>
    </View>
  );
};

export default function DailySummaryCard({ dayData }: { dayData: DayWeather | undefined }) {
  const { settings } = useSettings();
  const theme = useTheme();
  const styles = summaryCardStyles(theme);
  const { t } = useTranslation();
  const translatedWeatherDescriptions = useWeatherDescriptions();

  if (!dayData) return null; // Render nothing if no data

  const weatherInfo = translatedWeatherDescriptions[dayData.weatherCode]?.day;

  // Format temperatures without the unit symbol initially
  const formattedHigh = Math.round(
    convertTemperature(dayData.maxTemp, settings.useImperialUnits),
  ).toString();
  const formattedLow = Math.round(
    convertTemperature(dayData.minTemp, settings.useImperialUnits),
  ).toString();
  const tempUnit = settings.useImperialUnits ? "°F" : "°C";

  // Format wind speed and split value/unit
  const rawWindSpeed = convertWindSpeed(dayData.windSpeed, settings.useImperialUnits);
  const formattedWind = formatWindSpeed(rawWindSpeed, settings.useImperialUnits);
  const [windValue, windUnit] = formattedWind.split(" ");

  const formattedSunrise = formatTimeStringToHour(dayData.sunrise);
  const formattedSunset = formatTimeStringToHour(dayData.sunset);

  return (
    <Card mode="contained" style={styles.card}>
      <Card.Content style={styles.cardContent}>
        {/* Top Section: Icon, Temps, Description */}
        <View style={styles.topSection}>
          {weatherInfo?.image && (
            <FastImage
              // source={weatherInfo.image}
              source={weatherInfo.image}
              style={styles.weatherIcon}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
          <View style={styles.topTextContainer}>
            <View style={styles.tempsContainer}>
              <Text variant="displayMedium" style={styles.highTemp}>
                {formattedHigh}
              </Text>
              <Text variant="headlineMedium" style={styles.lowTemp}>
                /{formattedLow}
                {tempUnit}
              </Text>
            </View>
            <Text variant="titleMedium" style={styles.description} numberOfLines={1}>
              {weatherInfo?.description || ""}
            </Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Details Section: 2x2 Grid */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailsRow}>
            <DetailItem
              icon="weather-pouring" // Changed icon
              label={t("weather.max_precipitation")}
              value={`${Math.round(dayData.rainProb)}`}
              unit="%"
              color="#64B5F6" // Adjusted color
            />
            <DetailItem
              icon="weather-windy"
              label={t("weather.max_wind")}
              value={windValue}
              unit={windUnit}
              color="#81D4FA"
            />
          </View>
          <View style={styles.detailsRow}>
            <DetailItem
              icon="weather-sunset-up" // Changed icon
              color="#FFB74D" // Adjusted color
              label={t("weather.sunrise")}
              value={formattedSunrise || "--:--"}
            />
            <DetailItem
              icon="weather-sunset-down" // Changed icon
              label={t("weather.sunset")}
              value={formattedSunset || "--:--"}
              color="#BA68C8" // Adjusted color
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

// --- Styles ---

const summaryCardStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {
      // Removed margin bottom, handled by ScrollView gap in Details.tsx
    },
    cardContent: {
      paddingHorizontal: 16,
      paddingVertical: 12, // Reduced vertical padding
      gap: 12, // Reduced gap
    },
    topSection: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12, // Reduced gap
    },
    weatherIcon: {
      width: 64, // Slightly smaller icon
      height: 64,
    },
    topTextContainer: {
      flex: 1,
      alignItems: "flex-start", // Align text to the left
    },
    tempsContainer: {
      flexDirection: "row",
      alignItems: "baseline", // Align base of text
      gap: 4, // Reduced gap
    },
    highTemp: {
      fontWeight: "700", // Make high temp bolder
      // displayMedium is already large
    },
    lowTemp: {
      color: theme.colors.onSurfaceVariant, // Use theme color
      // headlineMedium is appropriate size
    },
    description: {
      fontWeight: "500",
      color: theme.colors.onSurface, // Ensure contrast
      marginTop: 2, // Small space above description
    },
    divider: {
      // Keep divider as is, margin handled by gap
    },
    detailsContainer: {
      gap: 10, // Space between the two rows of details
    },
    detailsRow: {
      flexDirection: "row",
      justifyContent: "space-around", // Distribute items evenly
      alignItems: "center", // Align items vertically
    },
  });

const detailItemStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    detailItem: {
      flexDirection: "row", // Icon and text side-by-side
      alignItems: "center",
      gap: 8, // Space between icon and text block
      flex: 1, // Allow items to take space in the row
      // justifyContent: 'center', // Center content within the item's space if needed
    },
    detailTextsContainer: {
      alignItems: "flex-start", // Align text left
    },
    detailValue: {
      fontWeight: "600",
      color: theme.colors.onSurface,
    },
    detailUnit: {
      fontSize: 10, // Smaller font size for the unit
      color: theme.colors.onSurfaceVariant,
      marginLeft: 2, // Space before unit
    },
    detailLabel: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 10, // Smaller label
      marginTop: 1,
    },
  });
