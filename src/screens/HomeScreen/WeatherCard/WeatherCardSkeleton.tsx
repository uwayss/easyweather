// FILE: src/screens/HomeScreen/WeatherCard/WeatherCardSkeleton.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Card } from "react-native-paper";

const WeatherCardSkeleton = () => {
  const theme = useTheme();
  const placeholderBg = theme.colors.onSurface + "1A"; // Base placeholder color
  const surfaceBg = theme.colors.inverseSurface + "99"; // Mimic surface background with opacity

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surfaceVariant + "40" }]}>
      <View style={styles.cardContent}>
        {/* Main Info Skeleton Surface */}
        <View style={[styles.mainInfoSurface, { backgroundColor: surfaceBg }]}>
          <View
            style={[
              styles.placeholder,
              styles.locationPlaceholder,
              { backgroundColor: placeholderBg },
            ]}
          />
          <View
            style={[styles.placeholder, styles.tempPlaceholder, { backgroundColor: placeholderBg }]}
          />
          <View
            style={[
              styles.placeholder,
              styles.descriptionPlaceholder,
              { backgroundColor: placeholderBg },
            ]}
          />
          <View
            style={[
              styles.placeholder,
              styles.feelsLikePlaceholder,
              { backgroundColor: placeholderBg },
            ]}
          />
        </View>

        {/* Details Skeleton Surface */}
        <View style={[styles.detailsSurface, { backgroundColor: surfaceBg }]}>
          <View
            style={[
              styles.placeholder,
              styles.detailItemPlaceholder,
              { backgroundColor: placeholderBg },
            ]}
          />
          <View
            style={[
              styles.placeholder,
              styles.detailItemPlaceholder,
              { backgroundColor: placeholderBg },
            ]}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    height: 360,
    borderRadius: 16,
    overflow: "hidden",
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between", // Push details down
    alignItems: "center", // Center skeleton surfaces horizontally
  },
  placeholder: {
    borderRadius: 4,
  },
  // --- Skeleton Surface Styles (Mirroring actual components) ---
  mainInfoSurface: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "85%", // Match actual component
    alignItems: "center",
    marginTop: 20, // Approximate top margin
    gap: 12, // Match gap
  },
  detailsSurface: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: "85%", // Match actual component
    height: 55, // Approximate height of details row
    marginBottom: 10, // Approximate bottom margin
  },
  // --- Placeholder Element Styles ---
  locationPlaceholder: {
    width: "70%",
    height: 18, // Adjusted height
  },
  tempPlaceholder: {
    width: "45%",
    height: 60, // Adjusted height
  },
  descriptionPlaceholder: {
    width: "80%",
    height: 18,
  },
  feelsLikePlaceholder: {
    width: "55%",
    height: 16, // Adjusted height
  },
  detailItemPlaceholder: {
    // Simulate icon + text block
    width: "40%", // Takes roughly 40% of the details surface width
    height: 30, // Adjusted height
  },
});

export default WeatherCardSkeleton;
