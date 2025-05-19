// FILE: services/i18next.js
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { MMKV } from "react-native-mmkv";

import ar from "../locales/ar.json";
import en from "../locales/en.json";
import tr from "../locales/tr.json";
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from "../src/constants/settings";
import {
  MMKV_SETTINGS_INSTANCE_ID,
  STORAGE_KEY_APP_SETTINGS,
} from "../src/constants/storage";

const storage = new MMKV({ id: MMKV_SETTINGS_INSTANCE_ID });

let savedLanguage = DEFAULT_LANGUAGE;
try {
  const storedSettings = storage.getString(STORAGE_KEY_APP_SETTINGS);
  if (storedSettings) {
    const settings = JSON.parse(storedSettings);

    if (
      settings.language &&
      SUPPORTED_LANGUAGES.some((lang) => lang.value === settings.language)
    ) {
      savedLanguage = settings.language;
    }
  }
} catch (error) {
  console.error("Failed to load language setting:", error);
  storage.delete(STORAGE_KEY_APP_SETTINGS);
}

const languageResources = {
  en: { translation: en },
  ar: { translation: ar },
  tr: { translation: tr },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: savedLanguage,
  fallbackLng: DEFAULT_LANGUAGE,
  resources: languageResources,
});

export default i18next;
