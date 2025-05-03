// FILE: src/screens/SettingsScreen/UnitsSection.tsx
import { View } from "react-native";
import React from "react";
import { useSettings } from "../../context/SettingsContext";
import { useTranslation } from "react-i18next";
import CustomSegmentedButtons from "../../components/CustomSegmentedButtons";
import { ListSection } from "./Common";
import Divider from "../../components/Common/Divider";

export default React.memo(function UnitsSection() {
  const { settings, updateSetting } = useSettings();
  const { t } = useTranslation();

  return (
    <View>
      <ListSection title={t("settings.units")}>
        <CustomSegmentedButtons
          value={settings.useImperialUnits ? "imperial" : "metric"}
          onValueChange={value => updateSetting("useImperialUnits", value === "imperial")}
          style={{ marginHorizontal: 16, marginBottom: 8 }}
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
      <Divider />
    </View>
  );
});
