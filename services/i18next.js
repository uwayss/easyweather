/* eslint-disable import/no-named-as-default-member */
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import ar from "../locales/ar.json";
import en from "../locales/en.json";
import tr from "../locales/tr.json";
import { DEFAULT_LANGUAGE } from "../src/constants/settings";

const languageResources = {
  en: { translation: en },
  ar: { translation: ar },
  tr: { translation: tr },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  resources: languageResources,
});

export default i18next;
