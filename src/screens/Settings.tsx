import React from "react";
import { ScrollView, StyleSheet } from "react-native"; // Added View
import { SafeAreaView } from "react-native-safe-area-context";
import { List, Divider, useTheme, SegmentedButtons, Text } from "react-native-paper"; // Added SegmentedButtons, Text
import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import { useSettings, ThemePreference } from "../context/SettingsContext"; // Import ThemePreference type

const SettingsScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = stylesheet(theme.colors.background);
  const { settings, updateSetting } = useSettings();

  const handleThemeChange = (value: string) => {
    // Type assertion might be needed if 'value' isn't inferred correctly
    updateSetting("theme", value as ThemePreference);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* --- Theme Selection --- */}
        <List.Section title="Appearance">
          <Text style={styles.label}>Theme</Text>
          <SegmentedButtons
            value={settings.theme}
            onValueChange={handleThemeChange}
            style={styles.segmentedButtonContainer}
            buttons={[
              {
                value: "system",
                label: "System",
                icon: "theme-light-dark", // Or 'brightness-auto'
              },
              {
                value: "light",
                label: "Light",
                icon: "white-balance-sunny",
              },
              {
                value: "dark",
                label: "Dark",
                icon: "weather-night",
              },
            ]}
          />
        </List.Section>

        <Divider style={styles.divider} />

        {/* --- Units Selection --- */}
        <List.Section title="Units">
          <Text style={styles.label}>Temperature & Wind Speed</Text>
          <SegmentedButtons
            value={settings.useImperialUnits ? "imperial" : "metric"}
            onValueChange={value => updateSetting("useImperialUnits", value === "imperial")}
            style={styles.segmentedButtonContainer}
            buttons={[
              {
                value: "metric",
                label: "Metric",
                icon: "temperature-celsius",
              },
              {
                value: "imperial",
                label: "Imperial",
                icon: "temperature-fahrenheit",
              },
            ]}
          />
        </List.Section>
        <Divider style={styles.divider} />
      </ScrollView>
    </SafeAreaView>
  );
};

const stylesheet = (themeBg: string) =>
  StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: themeBg,
    },
    container: {
      flex: 1,
    },
    contentContainer: {
      paddingVertical: 8,
      paddingHorizontal: 0, // Use padding on sections/items instead
    },
    // Added styles for theme selector
    label: {
      paddingHorizontal: 16, // Match List.Section title padding
      paddingBottom: 8,
      fontSize: 14, // Slightly smaller label
      // color: theme.colors.onSurfaceVariant, // Use a secondary text color
    },
    segmentedButtonContainer: {
      paddingHorizontal: 16, // Add padding to the button group
      paddingBottom: 8,
    },
    divider: {
      marginVertical: 8, // Add space around dividers
    },
  });

export default SettingsScreen;
