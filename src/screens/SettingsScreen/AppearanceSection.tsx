// FILE: src/screens/SettingsScreen/AppearanceSection.tsx
import { View } from "react-native";
import React from "react";
import { ThemePreference, useSettings } from "../../context/SettingsContext";
import { ListSection } from "./Common";
import { useTranslation } from "react-i18next";
import CustomSegmentedButtons from "../../components/CustomSegmentedButtons"; // Import custom component

export default React.memo(function AppearanceSection() {
  const { settings, updateSetting } = useSettings();
  const { t } = useTranslation();
  const handleThemeChange = (value: string) => {
    updateSetting("theme", value as ThemePreference);
  };
  return (
    <View>
      <ListSection title={t("theme.system").split(" ")[0]}>
        {/* Use CustomSegmentedButtons */}
        <CustomSegmentedButtons
          value={settings.theme}
          onValueChange={handleThemeChange}
          style={{ marginHorizontal: 16, marginBottom: 8 }} // Apply margin here
          buttons={[
            {
              value: "system",
              label: t("theme.system"),
              icon: "theme-light-dark",
            },
            {
              value: "light",
              label: t("theme.light"),
              icon: "white-balance-sunny",
            },
            {
              value: "dark",
              label: t("theme.dark"),
              icon: "weather-night",
            },
          ]}
        />
      </ListSection>
      {/* Keep Divider temporarily */}
      <View className="h-px my-2 bg-light-outline dark:bg-dark-outline" />
    </View>
  );
});
