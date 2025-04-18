import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { MMKV } from "react-native-mmkv";
import en from "../locales/en.json";
import tr from "../locales/tr.json";
import ar from "../locales/ar.json";

const storage = new MMKV({ id: "app-settings-v2" });
const SETTINGS_KEY = "userAppSettings";

let savedLanguage = "en";
try {
  const storedSettings = storage.getString(SETTINGS_KEY);
  if (storedSettings) {
    const settings = JSON.parse(storedSettings);
    if (settings.language) {
      savedLanguage = settings.language;
    }
  }
} catch (error) {
  console.error("Failed to load language setting:", error);
}

const languageResources = {
  en: { translation: en },
  ar: { translation: ar },
  tr: { translation: tr },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: savedLanguage,
  fallbackLng: "en",
  resources: languageResources,
});

export default i18next;
