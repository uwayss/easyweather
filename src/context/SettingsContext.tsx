/* eslint-disable import/no-named-as-default-member */
// FILE: src/context/SettingsContext.tsx
import i18next from "i18next";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import { MMKV } from "react-native-mmkv";

import {
  DEFAULT_LANGUAGE,
  DEFAULT_SETTINGS,
  SUPPORTED_LANGUAGES,
} from "../constants/settings";
import {
  MMKV_SETTINGS_INSTANCE_ID,
  STORAGE_KEY_APP_SETTINGS,
} from "../constants/storage";

export type ThemePreference = "system" | "light" | "dark";

export interface AppSettings {
  theme: ThemePreference;
  useImperialUnits: boolean;
  language: string;
}

interface SettingsContextProps {
  settings: AppSettings;
  updateSetting: <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => void;
  activeTheme: "light" | "dark";
}

const storage = new MMKV({ id: MMKV_SETTINGS_INSTANCE_ID });

const getInitialLanguage = () => {
  const storedSettings = storage.getString(STORAGE_KEY_APP_SETTINGS);
  if (storedSettings) {
    try {
      const parsed = JSON.parse(storedSettings);
      if (
        parsed.language &&
        SUPPORTED_LANGUAGES.some((lang) => lang.value === parsed.language)
      ) {
        return parsed.language;
      }
    } catch (e) {
      console.error("Failed to parse stored settings for language:", e);
    }
  }
  return DEFAULT_LANGUAGE;
};

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();

  const [settings, setSettings] = useState<AppSettings>(() => {
    const storedSettings = storage.getString(STORAGE_KEY_APP_SETTINGS);
    const initialLanguage = getInitialLanguage();
    let loadedSettings = { ...DEFAULT_SETTINGS, language: initialLanguage };

    if (storedSettings) {
      try {
        const parsed = JSON.parse(storedSettings);

        loadedSettings = {
          ...loadedSettings,
          ...parsed,
          language: initialLanguage,
        };
      } catch (e) {
        console.error("Failed to parse stored settings:", e);
        storage.delete(STORAGE_KEY_APP_SETTINGS);
      }
    }

    if (i18next.language !== loadedSettings.language) {
      console.log(
        `[SettingsContext] Initializing language to: ${loadedSettings.language}`
      );
      i18next.changeLanguage(loadedSettings.language);
    }

    return loadedSettings;
  });

  useEffect(() => {
    storage.set(STORAGE_KEY_APP_SETTINGS, JSON.stringify(settings));
    console.log("[SettingsContext] Settings saved:", settings);

    if (settings.language !== i18next.language) {
      console.log(
        `[SettingsContext] Language changed in settings, updating i18next to: ${settings.language}`
      );
      i18next.changeLanguage(settings.language);
    }
  }, [settings]);

  const updateSetting = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    setSettings((prevSettings) => {
      console.log(`[SettingsContext] Updating setting ${key} to ${value}`);
      return { ...prevSettings, [key]: value };
    });
  };

  const activeTheme = useMemo((): "light" | "dark" => {
    const { theme } = settings;
    if (theme === "system") {
      const determinedTheme = systemColorScheme ?? "light";
      console.log(
        `[SettingsContext] System theme selected. Detected: ${systemColorScheme}. Using: ${determinedTheme}`
      );
      return determinedTheme;
    } else {
      console.log(`[SettingsContext] Manual theme selected: ${theme}`);
      return theme;
    }
  }, [systemColorScheme, settings]);

  const value: SettingsContextProps = {
    settings,
    updateSetting,
    activeTheme,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
