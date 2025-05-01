import { View, StyleSheet } from "react-native";
import React from "react";
import { Divider, List, SegmentedButtons } from "react-native-paper";
import { useSettings } from "../../context/SettingsContext";
import { useTranslation } from "react-i18next";

export default React.memo(function UnitsSection() {
  const { settings, updateSetting } = useSettings();
  const { t } = useTranslation();

  return (
    <View>
      <List.Section title={t("settings.units")}>
        <SegmentedButtons
          value={settings.useImperialUnits ? "imperial" : "metric"}
          onValueChange={value => updateSetting("useImperialUnits", value === "imperial")}
          style={styles.segmentedButtonContainer}
          buttons={[
            {
              value: "metric",
              label: t("units.metric"),
              icon: "temperature-celsius",
            },
            {
              value: "imperial",
              label: t("units.imperial"),
              icon: "temperature-fahrenheit",
            },
          ]}
        />
      </List.Section>
      <Divider className="my-2" />
    </View>
  );
});

const styles = StyleSheet.create({
  segmentedButtonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
});
