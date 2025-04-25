// FILE: src/components/HourlyConditionsSkeleton.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Card, Divider } from "react-native-paper";

const HourlyConditionsSkeleton = () => {
  const theme = useTheme();
  const skeletonBackgroundColor = theme.colors.surfaceVariant;
  const skeletonItems = Array.from({ length: 5 }); // Show 5 placeholder items

  return (
    <Card style={styles.card} mode="contained">
      <View style={styles.cardContent}>
        {/* Header */}
        <View
          style={[
            styles.placeholder,
            styles.headerPlaceholder,
            { backgroundColor: skeletonBackgroundColor },
          ]}
        />
        {/* Selector */}
        <View style={styles.selectorRow}>
          <View
            style={[
              styles.placeholder,
              styles.selectorButton,
              { backgroundColor: skeletonBackgroundColor },
            ]}
          />
          <View
            style={[
              styles.placeholder,
              styles.selectorButton,
              { backgroundColor: skeletonBackgroundColor },
            ]}
          />
          <View
            style={[
              styles.placeholder,
              styles.selectorButton,
              { backgroundColor: skeletonBackgroundColor },
            ]}
          />
          <View
            style={[
              styles.placeholder,
              styles.selectorButton,
              { backgroundColor: skeletonBackgroundColor },
            ]}
          />
        </View>
        <Divider style={styles.divider} />
        {/* Chart Area */}
        <View style={styles.chartArea}>
          {skeletonItems.map((_, index) => (
            <View key={index} style={styles.itemContainer}>
              <View
                style={[
                  styles.placeholder,
                  styles.itemValue,
                  { backgroundColor: skeletonBackgroundColor },
                ]}
              />
              <View
                style={[
                  styles.placeholder,
                  styles.itemBar,
                  { backgroundColor: skeletonBackgroundColor },
                ]}
              />
              <View
                style={[
                  styles.placeholder,
                  styles.itemIcon,
                  { backgroundColor: skeletonBackgroundColor },
                ]}
              />
              <View
                style={[
                  styles.placeholder,
                  styles.itemLabel,
                  { backgroundColor: skeletonBackgroundColor },
                ]}
              />
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: "transparent", // Let inner views handle color
    overflow: "hidden", // Ensure rounded corners clip content
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "rgba(0,0,0,0.05)", // Slight overlay
  },
  placeholder: {
    // Common placeholder style
    borderRadius: 4,
  },
  headerPlaceholder: {
    width: "40%",
    height: 24,
    marginBottom: 16,
  },
  selectorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  selectorButton: {
    width: "22%",
    height: 30,
    borderRadius: 8, // Match original button style
  },
  divider: {
    marginBottom: 16,
    height: 1,
    backgroundColor: "rgba(128, 128, 128, 0.2)", // Faint divider
  },
  chartArea: {
    flexDirection: "row",
    height: 160,
    alignItems: "flex-end",
    paddingBottom: 10,
  },
  itemContainer: {
    width: 65,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 5,
    height: "100%",
    gap: 6,
  },
  itemValue: {
    height: 16,
    width: "60%",
    marginBottom: 4,
  },
  itemBar: {
    height: 60,
    width: 12,
    borderRadius: 6, // Match original style
  },
  itemIcon: {
    width: 26,
    height: 26,
    borderRadius: 13, // Make it circular
    marginTop: 4,
  },
  itemLabel: {
    height: 14,
    width: "80%",
    marginTop: 2,
  },
});

export default HourlyConditionsSkeleton;
