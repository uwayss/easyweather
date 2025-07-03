/* eslint-disable import/no-named-as-default-member */
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
import {
  baseWeatherDescriptions,
  WeatherDescriptionsType,
} from "../utils/descriptions";
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
  translatedWeatherDescriptions: WeatherDescriptionsType;
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
      i18next.changeLanguage(loadedSettings.language);
    }

    return loadedSettings;
  });

  const [translatedWeatherDescriptions, setTranslatedWeatherDescriptions] =
    useState<WeatherDescriptionsType>(baseWeatherDescriptions);

  useEffect(() => {
    const newDescriptions: WeatherDescriptionsType = {};
    for (const codeStr in baseWeatherDescriptions) {
      const code = Number(codeStr);
      const baseDesc = baseWeatherDescriptions[code];
      if (baseDesc) {
        newDescriptions[code] = {
          day: {
            ...baseDesc.day,
            description: i18next.t(baseDesc.day.translationKey),
          },
          night: {
            ...baseDesc.night,
            description: i18next.t(baseDesc.night.translationKey),
          },
        };
      }
    }
    setTranslatedWeatherDescriptions(newDescriptions);
  }, [settings.language]);

  useEffect(() => {
    storage.set(STORAGE_KEY_APP_SETTINGS, JSON.stringify(settings));

    if (settings.language !== i18next.language) {
      i18next.changeLanguage(settings.language);
    }
  }, [settings]);

  const updateSetting = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    setSettings((prevSettings) => ({ ...prevSettings, [key]: value }));
  };

  const activeTheme = useMemo((): "light" | "dark" => {
    const { theme } = settings;
    return theme === "system" ? systemColorScheme ?? "light" : theme;
  }, [systemColorScheme, settings]);

  const value: SettingsContextProps = {
    settings,
    updateSetting,
    activeTheme,
    translatedWeatherDescriptions,
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
