// FILE: src/screens/HomeScreen/WeatherCard/WeatherCardSkeleton.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Card } from "react-native-paper";

const WeatherCardSkeleton = () => {
  const theme = useTheme();
  // Use a slightly more opaque version of surfaceVariant for placeholders
  const placeholderBg = theme.colors.onSurface + "1A"; // Example: surfaceVariant with alpha

  return (
    // Apply a faint background to the card itself to contain the skeleton visually
    <Card style={[styles.card, { backgroundColor: theme.colors.surfaceVariant + "40" }]}>
      <View style={styles.cardContent}>
        {/* Main Info Skeleton */}
        {/* Removed the extra background container for main info */}
        <View style={styles.mainInfo}>
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

        {/* Details Skeleton */}
        {/* Use a slightly different background for the details container */}
        <View
          style={[styles.detailsContainer, { backgroundColor: theme.colors.surfaceVariant + "60" }]}
        >
          <View
            style={[
              styles.placeholder,
              styles.detailItemPlaceholder,
              { backgroundColor: placeholderBg },
            ]}
          />
          {/* Separator is now just space */}
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
    height: 360, // Keep matching original card height
    borderRadius: 16,
    overflow: "hidden",
    // backgroundColor is now set dynamically
  },
  cardContent: {
    flex: 1,
    padding: 16,
    // Adjusted justification to push details down
    justifyContent: "space-between",
    paddingBottom: 24, // Add padding at the bottom
  },
  placeholder: {
    borderRadius: 4,
  },
  mainInfo: {
    alignItems: "center",
    // Removed padding and margin, rely on cardContent padding
    marginTop: 20, // Add some top margin
    gap: 12, // Add gap between main info elements
  },
  locationPlaceholder: {
    width: "70%", // Slightly wider
    height: 24,
    // Removed margin bottom
  },
  tempPlaceholder: {
    width: "45%", // Slightly wider
    height: 52, // Taller
    // Removed margin bottom
  },
  descriptionPlaceholder: {
    width: "80%", // Wider
    height: 18, // Slightly shorter
    // Removed margin bottom
  },
  feelsLikePlaceholder: {
    width: "55%", // Slightly wider
    height: 18, // Slightly shorter
  },
  detailsContainer: {
    flexDirection: "row",
    // Changed justify content
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 16, // Only vertical padding
    paddingHorizontal: 8, // Less horizontal padding
    borderRadius: 12,
    // Removed fixed height, let content determine it
    // Align self to bottom? - No, handled by cardContent justify
    width: "95%", // Make slightly less wide than card
    alignSelf: "center", // Center it
  },
  // Removed separator style
  detailItemPlaceholder: {
    // Adjust width to account for space-around
    width: "40%",
    height: 35, // Slightly taller
  },
});

export default WeatherCardSkeleton;
