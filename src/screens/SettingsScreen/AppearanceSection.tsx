import { View, StyleSheet } from "react-native";
import React from "react";
import { Divider, SegmentedButtons } from "react-native-paper";
import { ThemePreference, useSettings } from "../../context/SettingsContext";
import { ListSection } from "./Common";

export default React.memo(function AppearanceSection() {
  const { settings, updateSetting } = useSettings();
  const handleThemeChange = (value: string) => {
    updateSetting("theme", value as ThemePreference);
  };
  return (
    <View>
      <ListSection title="Theme">
        <SegmentedButtons
          value={settings.theme}
          onValueChange={handleThemeChange}
          style={styles.segmentedButtonContainer}
          buttons={[
            {
              value: "system",
              label: "System",
              icon: "theme-light-dark",
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
      </ListSection>
      <Divider style={styles.divider} />
    </View>
  );
});
const styles = StyleSheet.create({
  label: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    fontSize: 14,
  },
  segmentedButtonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
});
