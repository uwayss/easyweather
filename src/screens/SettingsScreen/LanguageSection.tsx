// FILE: src/screens/SettingsScreen/LanguageSection.tsx
import React, { useCallback, memo } from "react";
import { View } from "react-native";
import { useSettings } from "../../context/SettingsContext";
import { ListSection } from "./Common";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import { SUPPORTED_LANGUAGES } from "../../constants/settings";
import { useColorScheme } from "nativewind";

function LanguageSection() {
  const { updateSetting } = useSettings();
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();

  const pickerTextColor = colorScheme === "dark" ? "#e1e1e1" : "#1f1f1f";
  const pickerDropdownIconColor = pickerTextColor;
  const pickerBackgroundColor = colorScheme === "dark" ? "#1e1e1e" : "#ffffff";

  const handleLanguageChange = useCallback(
    (lang: string) => {
      i18next.changeLanguage(lang);
      updateSetting("language", lang);
    },
    [updateSetting],
  );

  return (
    <ListSection title={t("settings.language")}>
      <View
        style={{ backgroundColor: pickerBackgroundColor }}
        className="mx-4 rounded-xl overflow-hidden border border-light-outline dark:border-dark-outline"
      >
        <Picker
          selectedValue={i18next.language}
          onValueChange={handleLanguageChange}
          dropdownIconColor={pickerDropdownIconColor}
          style={{ color: pickerTextColor, height: 50 }}
          itemStyle={{ color: pickerTextColor }}
        >
          {SUPPORTED_LANGUAGES.map(lang => (
            <Picker.Item
              key={lang.value}
              label={lang.label}
              value={lang.value}
              color={pickerTextColor}
            />
          ))}
        </Picker>
      </View>
    </ListSection>
  );
}

export default memo(LanguageSection);
