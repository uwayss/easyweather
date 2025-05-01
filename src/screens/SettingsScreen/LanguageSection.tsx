// FILE: src/screens/SettingsScreen/LanguageSection.tsx
import React, { useCallback, memo } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSettings } from "../../context/SettingsContext";
import { ListSection } from "./Common";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import { SUPPORTED_LANGUAGES } from "../../constants/settings"; // Import languages constant

function LanguageSection() {
  const { updateSetting } = useSettings();
  const { t } = useTranslation();
  const theme = useTheme();

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
        style={{ backgroundColor: theme.colors.surface }}
        className="mx-4 rounded-xl overflow-hidden"
      >
        <Picker
          selectedValue={i18next.language}
          onValueChange={handleLanguageChange}
          dropdownIconColor={theme.colors.onSurface}
          style={{ color: theme.colors.onSurface }}
        >
          {SUPPORTED_LANGUAGES.map(lang => (
            <Picker.Item
              key={lang.value}
              label={lang.label}
              value={lang.value}
              color={theme.colors.onSurface}
            />
          ))}
        </Picker>
      </View>
    </ListSection>
  );
}

export default memo(LanguageSection);
