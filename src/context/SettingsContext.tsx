import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { MMKV } from "react-native-mmkv";
import { useColorScheme } from "react-native";

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

const defaultSettings: AppSettings = {
  theme: "system",
  useImperialUnits: false,
  language: "en",
};

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();

  const [settings, setSettings] = useState<AppSettings>(() => {
    const storedSettings = storage.getString(SETTINGS_KEY);
    if (storedSettings) {
      try {
        const parsed = JSON.parse(storedSettings);

        return { ...defaultSettings, ...parsed };
      } catch (e) {
        console.error("Failed to parse stored settings:", e);
        storage.delete(SETTINGS_KEY);
      }
    }
    return defaultSettings;
  });

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prevSettings => ({ ...prevSettings, [key]: value }));
  };

  useEffect(() => {
    storage.set(SETTINGS_KEY, JSON.stringify(settings));
    console.log("Settings saved:", settings);
  }, [settings]);

  const activeTheme = React.useMemo((): "light" | "dark" => {
    if (settings.theme === "system") {
      return systemColorScheme ?? "light";
    }
    return settings.theme;
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
