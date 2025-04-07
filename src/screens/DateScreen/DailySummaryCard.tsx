import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Card, Divider, Icon, useTheme, MD3Theme } from "react-native-paper";
import { DayWeather } from "../../types/weather";
import { useWeatherDescriptions } from "../../utils/descriptions";
import { useSettings } from "../../context/SettingsContext";
import { useTranslation } from "react-i18next";
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
  color?: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value, color }) => {
  const theme = useTheme();
  const styles = detailItemStyles(theme);
  return (
    <View style={styles.detailItem}>
      <Icon source={icon} size={24} color={color ? color : undefined} />
      <View style={styles.detailTextsContainer}>
        <Text style={styles.detailValue} variant="bodyLarge">
          {value}
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

  if (!dayData) return <View></View>;
  const weatherInfo = translatedWeatherDescriptions[dayData.weatherCode]?.day;

  const formattedHigh = formatTemperature(
    convertTemperature(dayData.maxTemp, settings.useImperialUnits),
    settings.useImperialUnits,
  ).replace(/°[CF]$/, "°");

  const formattedLow = formatTemperature(
    convertTemperature(dayData.minTemp, settings.useImperialUnits),
    settings.useImperialUnits,
  ).replace(/°[CF]$/, "°");

  const formattedWind = formatWindSpeed(
    convertWindSpeed(dayData.windSpeed, settings.useImperialUnits),
    settings.useImperialUnits,
  );

  const formattedSunrise = formatTimeStringToHour(dayData.sunrise);
  const formattedSunset = formatTimeStringToHour(dayData.sunset);

  return (
    <Card mode="contained">
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

        <Divider />

        {/* Bottom Section: Grid of Details */}
        <View style={styles.detailsGrid}>
          <DetailItem
            icon="weather-rainy"
            label={t("weather.max_precipitation")}
            value={`${Math.round(dayData.rainProb)}%`}
            color="#2196F3"
          />
          <DetailItem
            icon="weather-windy"
            label={t("weather.max_wind")}
            value={formattedWind}
            color="#81D4FA"
          />
          <DetailItem
            icon="white-balance-sunny"
            color="#FFA726"
            label={t("weather.sunrise")}
            value={formattedSunrise || "--:--"}
          />
          <DetailItem
            icon="weather-night"
            label={t("weather.sunset")}
            value={formattedSunset || "--:--"}
            color="#7E57C2"
          />
        </View>
      </Card.Content>
    </Card>
  );
}

const summaryCardStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    cardContent: {
      gap: 16,
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
      alignItems: "flex-start",
    },
    description: {
      fontWeight: "500",
      marginBottom: 4,
    },
    tempsContainer: {
      flexDirection: "row",
      alignItems: "baseline",
      gap: 8,
    },
    highTemp: {
      fontWeight: "bold",
    },
    lowTemp: {
      color: theme.colors.onSurfaceVariant,
    },
    detailsGrid: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
  });

const detailItemStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    detailItem: {
      alignItems: "center",
      gap: 4,
      flex: 1,
    },
    detailValue: {
      fontWeight: "600",
    },
    detailLabel: {
      color: theme.colors.onSurfaceVariant,
      textAlign: "center",
      fontSize: 9,
      width: "100%",
    },
    detailTextsContainer: {
      alignItems: "center",
      flex: 1,
    },
  });
