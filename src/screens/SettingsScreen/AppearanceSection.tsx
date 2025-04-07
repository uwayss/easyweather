import { View, StyleSheet } from "react-native";
import React from "react";
import { Divider, SegmentedButtons } from "react-native-paper";
import { ThemePreference, useSettings } from "../../context/SettingsContext";
import { ListSection } from "./Common";
import { useTranslation } from "react-i18next";

export default React.memo(function AppearanceSection() {
  const { settings, updateSetting } = useSettings();
  const { t } = useTranslation();
  const handleThemeChange = (value: string) => {
    updateSetting("theme", value as ThemePreference);
  };
  return (
    <View>
      <ListSection title={t("theme.system").split(" ")[0]}>
        <SegmentedButtons
          value={settings.theme}
          onValueChange={handleThemeChange}
          style={styles.segmentedButtonContainer}
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
