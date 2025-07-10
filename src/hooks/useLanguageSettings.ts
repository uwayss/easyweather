import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSettings } from "../context/SettingsContext";
import { SUPPORTED_LANGUAGES } from "../constants/settings";

export const useLanguageSettings = () => {
  const { settings, updateSetting } = useSettings();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLanguageChange = useCallback(
    (lang: string) => {
      updateSetting("language", lang);
      setModalVisible(false);
    },
    [updateSetting]
  );

  const currentLanguageLabel =
    SUPPORTED_LANGUAGES.find((lang) => lang.value === settings.language)
      ?.label || settings.language;

  return {
    t,
    settings,
    modalVisible,
    setModalVisible,
    handleLanguageChange,
    currentLanguageLabel,
  };
};
