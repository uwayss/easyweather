import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { List, Divider, useTheme, Switch } from "react-native-paper";
// import { useSettings } from '../context/SettingsContext'; // <-- Future: Import settings context

const SettingsScreen = () => {
  const theme = useTheme();
  const styles = stylesheet(theme.colors.background);
  // const { settings, updateSetting } = useSettings(); // <-- Future: Use settings context

  // Example state for toggles (replace with context later)
  const [isDarkThemeManual, setIsDarkThemeManual] = React.useState(false);
  const [isImperial, setIsImperial] = React.useState(false);

  const handleThemeChange = () => {
    // TODO: Implement theme change logic using context
    setIsDarkThemeManual(!isDarkThemeManual);
    console.log("Theme toggle pressed (not functional yet)");
  };

  const handleUnitsChange = () => {
    // TODO: Implement unit change logic using context
    setIsImperial(!isImperial);
    console.log("Units toggle pressed (not functional yet)");
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <List.Section title="Appearance">
          <List.Item
            title="Dark Theme"
            description="Use dark interface (Not functional yet)"
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch
                value={isDarkThemeManual}
                onValueChange={handleThemeChange} // Call handler
              />
            )}
            // onPress={handleThemeChange} // Optional: Allow tapping the whole item
          />
        </List.Section>
        <Divider />
        <List.Section title="Units">
          <List.Item
            title="Use Imperial Units (°F, mph)"
            description="Display temperature in Fahrenheit and wind speed in mph (Not functional yet)"
            left={props => <List.Icon {...props} icon="ruler" />}
            right={() => (
              <Switch
                value={isImperial}
                onValueChange={handleUnitsChange} // Call handler
              />
            )}
            // onPress={handleUnitsChange} // Optional: Allow tapping the whole item
          />
        </List.Section>
        <Divider />
        {/* Add more sections/items here later */}
        {/* Example: About Section */}
        {/* <List.Section title="About">
             <List.Item title="App Version" description="0.0.1" />
             <List.Item title="Data Source" description="Open-Meteo" />
         </List.Section>
         <Divider /> */}
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
      paddingVertical: 8, // Less vertical padding usually needed for lists
    },
  });

export default SettingsScreen;
