// FILE: src/screens/HomeScreen/ForecastItemSkeleton.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Card } from "react-native-paper";

const ForecastItemSkeleton = () => {
  const theme = useTheme();
  const skeletonBackgroundColor = theme.colors.surfaceVariant;

  return (
    <Card style={styles.card} mode="contained">
      <View style={styles.cardContent}>
        <View
          style={[
            styles.placeholder,
            styles.dayNamePlaceholder,
            { backgroundColor: skeletonBackgroundColor },
          ]}
        />
        <View
          style={[
            styles.placeholder,
            styles.iconPlaceholder,
            { backgroundColor: skeletonBackgroundColor },
          ]}
        />
        <View
          style={[
            styles.placeholder,
            styles.descriptionPlaceholder,
            { backgroundColor: skeletonBackgroundColor },
          ]}
        />
        <View
          style={[
            styles.placeholder,
            styles.tempPlaceholder,
            { backgroundColor: skeletonBackgroundColor },
          ]}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 130,
    marginRight: 8,
    height: 180,
    backgroundColor: "rgba(0,0,0,0.05)", // Apply slight overlay to card itself
    borderRadius: 12, // Match original Card style if needed
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
    flex: 1,
    gap: 6,
  },
  placeholder: {
    // Common placeholder style
    borderRadius: 4,
  },
  dayNamePlaceholder: { width: "60%", height: 20 },
  iconPlaceholder: { width: 65, height: 65, borderRadius: 32.5, marginVertical: 10 },
  descriptionPlaceholder: { width: "80%", height: 16 },
  tempPlaceholder: { width: "50%", height: 20 },
});

export default ForecastItemSkeleton;
