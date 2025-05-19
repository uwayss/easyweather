// FILE: src/screens/SettingsScreen/LanguageSection.tsx
import { Picker } from "@react-native-picker/picker";
import i18next from "i18next";
import { useColorScheme } from "nativewind";
import React, { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import Card from "../../components/Common/Card";
import Divider from "../../components/Common/Divider";
import { SUPPORTED_LANGUAGES } from "../../constants/settings";
import { useSettings } from "../../context/SettingsContext";
import { ListSection } from "./Common";

function LanguageSection() {
  const { updateSetting } = useSettings();
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();

  const pickerTextColor = colorScheme === "dark" ? "#e1e1e1" : "#1f1f1f";
  const pickerDropdownIconColor = pickerTextColor;

  const handleLanguageChange = useCallback(
    (lang: string) => {
      // eslint-disable-next-line import/no-named-as-default-member
      i18next.changeLanguage(lang);
      updateSetting("language", lang);
    },
    [updateSetting]
  );

  return (
    <ListSection title={t("settings.language")}>
      <Card className="mx-4">
        <Picker
          selectedValue={i18next.language}
          onValueChange={handleLanguageChange}
          dropdownIconColor={pickerDropdownIconColor}
          style={{ color: pickerTextColor }}
          itemStyle={{ color: pickerTextColor }}
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <Picker.Item
              key={lang.value}
              label={lang.label}
              value={lang.value}
              color={pickerTextColor}
            />
          ))}
        </Picker>
      </Card>
      <Divider />
    </ListSection>
  );
}

export default memo(LanguageSection);
