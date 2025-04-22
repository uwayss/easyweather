// FILE: src/screens/ChartTestScreen.tsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Appbar, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import LineChart from "../components/Graph/LineChart"; // Adjust import path
import { GraphDataPoint } from "../utils/metricData"; // Adjust import path
import { NativeStackScreenProps } from "@react-navigation/native-stack"; // Import navigation types
import { RootStackParamList } from "../../App"; // Import stack params list

// --- Mock Data (Copy from Step 1 above) ---
const mockDataIncreasing: GraphDataPoint[] = Array.from({ length: 12 }, (_, i) => ({
  progress: i / 11,
  color: "#006d77",
  value: `${i * 5}°`,
  time: `2024-01-01T${String(i).padStart(2, "0")}:00:00`,
  label: `${i % 12 || 12}${i < 12 ? "AM" : "PM"}`,
}));
const mockDataDecreasingColored: GraphDataPoint[] = Array.from({ length: 8 }, (_, i) => ({
  progress: 1 - i / 7,
  color: ["#ff5722", "#ffc107", "#8bc34a", "#03a9f4"][i % 4],
  value: `${20 - i * 2}%`,
  time: `2024-01-01T${String(i + 12).padStart(2, "0")}:00:00`,
  label: `${(i + 12) % 12 || 12}${i + 12 < 12 ? "AM" : "PM"}`,
}));
const mockDataFewPoints: GraphDataPoint[] = [
  { progress: 0.2, color: "#ff5722", value: "10", time: "t1", label: "1AM" },
  { progress: 0.8, color: "#03a9f4", value: "80", time: "t2", label: "2AM" },
  { progress: 0.5, color: "#8bc34a", value: "50", time: "t3", label: "3AM" },
];
const mockDataEmpty: GraphDataPoint[] = [];
const mockDataSingle: GraphDataPoint[] = [
  { progress: 0.5, color: "#8bc34a", value: "50", time: "t1", label: "1AM" },
];
// --- End Mock Data ---

// Define props if you need navigation context, otherwise simple React.FC
type ChartTestScreenProps = NativeStackScreenProps<RootStackParamList, "ChartTest">; // Use a temporary name

export default function ChartTestScreen({ navigation }: ChartTestScreenProps) {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Line Chart Test" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title} variant="headlineSmall">
          Line Chart Tests
        </Text>

        {/* Test Case 1: Basic Increasing Data */}
        <Text style={styles.label}>Basic Increasing</Text>
        <LineChart
          data={mockDataIncreasing}
          height={200}
          width={350} // Adjust width as needed
        />

        {/* Test Case 2: Decreasing Data with Colors & No Gradient */}
        <Text style={styles.label}>Decreasing, Colored Points, No Gradient</Text>
        <LineChart
          data={mockDataDecreasingColored}
          height={200}
          width={350}
          showGradient={false}
          lineColor={theme.colors.secondary} // Example theme color
        />

        {/* Test Case 3: Few Points, Custom Styling */}
        <Text style={styles.label}>Few Points, Thick Line, No Points</Text>
        <LineChart
          data={mockDataFewPoints}
          height={150}
          width={250}
          lineWidth={4}
          showPoints={false}
          lineColor="#ff00ff" // Magenta
          gradientColor="#ff00ff"
        />

        {/* Test Case 4: Empty Data */}
        <Text style={styles.label}>Empty Data</Text>
        <LineChart data={mockDataEmpty} height={100} width={300} />

        {/* Test Case 5: Single Point */}
        <Text style={styles.label}>Single Point Data</Text>
        <LineChart data={mockDataSingle} height={100} width={300} />

        {/* Add more test cases with different props as needed */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
    alignItems: "center", // Center charts horizontally
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    marginTop: 24,
    marginBottom: 8,
    fontWeight: "bold",
    alignSelf: "flex-start", // Align labels to the left
    marginLeft: 10, // Indent labels slightly
  },
});
