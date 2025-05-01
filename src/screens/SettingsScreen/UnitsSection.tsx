// FILE: src/screens/SettingsScreen/UnitsSection.tsx
import { View } from "react-native";
import React from "react";
// Removed List, SegmentedButtons imports from paper
import { useSettings } from "../../context/SettingsContext";
import { useTranslation } from "react-i18next";
import CustomSegmentedButtons from "../../components/CustomSegmentedButtons"; // Import custom component
import { ListSection } from "./Common"; // Import ListSection

export default React.memo(function UnitsSection() {
  const { settings, updateSetting } = useSettings();
  const { t } = useTranslation();

  return (
    <View>
      {/* Wrap with ListSection for consistent title styling */}
      <ListSection title={t("settings.units")}>
        {/* Use CustomSegmentedButtons */}
        <CustomSegmentedButtons
          value={settings.useImperialUnits ? "imperial" : "metric"}
          onValueChange={value => updateSetting("useImperialUnits", value === "imperial")}
          style={{ marginHorizontal: 16, marginBottom: 8 }} // Apply margin here
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
      </ListSection>
      {/* Keep Divider temporarily */}
      <View className="h-px my-2 bg-light-outline dark:bg-dark-outline" />
    </View>
  );
});
