import { View, StyleSheet } from "react-native";
import React from "react";
import { Divider, List, Text, SegmentedButtons } from "react-native-paper";
import { useSettings } from "../../context/SettingsContext";

export default function UnitsSection() {
  const { settings, updateSetting } = useSettings();

  return (
    <View>
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
    </View>
  );
}

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
