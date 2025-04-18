import React, { createContext, useState, useContext, ReactNode, useEffect, useMemo } from "react";
import { MMKV } from "react-native-mmkv";
import { useColorScheme } from "react-native";
import i18next from "i18next";

export type ThemePreference = "system" | "light" | "dark";

export interface AppSettings {
  theme: ThemePreference;
  useImperialUnits: boolean;
  language: string;
}

interface SettingsContextProps {
  settings: AppSettings;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  activeTheme: "light" | "dark";
}

const storage = new MMKV({ id: "app-settings-v2" });
const SETTINGS_KEY = "userAppSettings";
const getInitialLanguage = () => {
  const storedSettings = storage.getString(SETTINGS_KEY);
  if (storedSettings) {
    try {
      const parsed = JSON.parse(storedSettings);
      return parsed.language || "en";
    } catch (e) {
      console.error("Failed to parse stored settings for language:", e);
    }
  }
  return "en";
};
const defaultSettings: AppSettings = {
  theme: "system",
  useImperialUnits: false,
  language: getInitialLanguage(),
};

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();

  const [settings, setSettings] = useState<AppSettings>(() => {
    const storedSettings = storage.getString(SETTINGS_KEY);
    if (storedSettings) {
      try {
        const parsed = JSON.parse(storedSettings);

        const loadedSettings = { ...defaultSettings, ...parsed };
        if (i18next.language !== loadedSettings.language) {
          console.log(
            `[SettingsContext] Initializing language from storage to: ${loadedSettings.language}`,
          );
          i18next.changeLanguage(loadedSettings.language);
        }
        return loadedSettings;
      } catch (e) {
        console.error("Failed to parse stored settings:", e);
        storage.delete(SETTINGS_KEY);
      }
    }
    if (i18next.language !== defaultSettings.language) {
      console.log(
        `[SettingsContext] Initializing language to default: ${defaultSettings.language}`,
      );
      i18next.changeLanguage(defaultSettings.language);
    }
    return defaultSettings;
  });

  useEffect(() => {
    storage.set(SETTINGS_KEY, JSON.stringify(settings));
    console.log("[SettingsContext] Settings saved:", settings);

    if (settings.language !== i18next.language) {
      console.log(
        `[SettingsContext] Language changed in settings, updating i18next to: ${settings.language}`,
      );
      i18next.changeLanguage(settings.language);
    }
  }, [settings]);
  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prevSettings => {
      console.log(`[SettingsContext] Updating setting ${key} to ${value}`);
      return { ...prevSettings, [key]: value };
    });
  };

  const activeTheme = useMemo((): "light" | "dark" => {
    const { theme } = settings;
    if (theme === "system") {
      const determinedTheme = systemColorScheme ?? "light";
      console.log(
        `[SettingsContext] System theme selected. Detected: ${systemColorScheme}. Using: ${determinedTheme}`,
      );
      return determinedTheme;
    } else {
      console.log(`[SettingsContext] Manual theme selected: ${theme}`);
      return theme;
    }
  }, [settings.theme, systemColorScheme]);

  const value: SettingsContextProps = {
    settings,
    updateSetting,
    activeTheme,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
