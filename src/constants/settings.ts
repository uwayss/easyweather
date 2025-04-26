// FILE: src/constants/settings.ts
import { AppSettings, ThemePreference } from "../context/SettingsContext";

export const DEFAULT_LANGUAGE = "en";
export const DEFAULT_THEME: ThemePreference = "system";
export const DEFAULT_USE_IMPERIAL_UNITS = false;

export const DEFAULT_SETTINGS: AppSettings = {
  theme: DEFAULT_THEME,
  useImperialUnits: DEFAULT_USE_IMPERIAL_UNITS,
  language: DEFAULT_LANGUAGE,
};

export const SUPPORTED_LANGUAGES = [
  { value: "en", label: "English" },
  { value: "ar", label: "العربية" },
  { value: "tr", label: "Türkçe" },
];
