/* eslint-disable import/no-named-as-default-member */
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";

import { DEFAULT_SETTINGS } from "../constants/settings";
import { STORAGE_KEY_APP_SETTINGS } from "../constants/storage";
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
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem(
          STORAGE_KEY_APP_SETTINGS
        );
        if (storedSettings) {
          const parsedSettings = JSON.parse(storedSettings);
          setSettings({ ...DEFAULT_SETTINGS, ...parsedSettings });
          if (
            parsedSettings.language &&
            parsedSettings.language !== i18next.language
          ) {
            i18next.changeLanguage(parsedSettings.language);
          }
        }
      } catch (error) {
        console.error("Failed to load settings from storage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

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

  const updateSetting = useCallback(
    async <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      if (key === "language" && value !== i18next.language) {
        i18next.changeLanguage(value as string);
      }
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY_APP_SETTINGS,
          JSON.stringify(newSettings)
        );
      } catch (error) {
        console.error("Failed to save setting to storage:", error);
      }
    },
    [settings]
  );

  const activeTheme = useMemo((): "light" | "dark" => {
    const { theme } = settings;
    return theme === "system" ? systemColorScheme ?? "light" : theme;
  }, [systemColorScheme, settings]);

  const value: SettingsContextProps = {
    settings,
    updateSetting,
    activeTheme,
    translatedWeatherDescriptions,
    isLoading,
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
