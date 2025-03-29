import React from "react";
import { ScrollView, StyleSheet } from "react-native"; // Added View
import { SafeAreaView } from "react-native-safe-area-context";
import { List, Divider, useTheme, Switch, SegmentedButtons, Text } from "react-native-paper"; // Added SegmentedButtons, Text
import { useSettings, ThemePreference } from "../context/SettingsContext"; // Import ThemePreference type

const SettingsScreen = () => {
  const theme = useTheme();
  const styles = stylesheet(theme.colors.background);
  const { settings, updateSetting } = useSettings();

  const handleThemeChange = (value: string) => {
    // Type assertion might be needed if 'value' isn't inferred correctly
    updateSetting("theme", value as ThemePreference);
  };

  const handleUnitsChange = () => {
    updateSetting("useImperialUnits", !settings.useImperialUnits);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
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
          {/* Keeping Switch for units for now, could also be SegmentedButtons */}
          <List.Item
            title="Use Imperial Units (°F, mph)"
            description="Display units (Not functional yet)"
            left={props => <List.Icon {...props} icon="ruler" />}
            right={() => (
              <Switch value={settings.useImperialUnits} onValueChange={handleUnitsChange} />
            )}
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
