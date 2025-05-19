// FILE: src/screens/SettingsScreen/AppearanceSection.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import Divider from "../../components/Common/Divider";
import CustomSegmentedButtons from "../../components/CustomSegmentedButtons";
import { ThemePreference, useSettings } from "../../context/SettingsContext";
import { ListSection } from "./Common";

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
          style={{ marginHorizontal: 16, marginBottom: 8 }}
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
      <Divider />
    </View>
  );
});
