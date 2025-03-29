// FILE: src/context/SettingsContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { MMKV } from "react-native-mmkv";
import { useColorScheme } from "react-native";

// --- New Settings Shape ---
export type ThemePreference = "system" | "light" | "dark";

export interface AppSettings {
  theme: ThemePreference; // Single setting for theme
  useImperialUnits: boolean;
}

interface SettingsContextProps {
  settings: AppSettings;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  activeTheme: "light" | "dark"; // The actual theme to apply
}

const storage = new MMKV({ id: "app-settings-v2" }); // Use new ID if migrating old storage
const SETTINGS_KEY = "userAppSettings";

// --- Default Settings ---
const defaultSettings: AppSettings = {
  theme: "system", // Default to following system
  useImperialUnits: false,
};

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();

  const [settings, setSettings] = useState<AppSettings>(() => {
    const storedSettings = storage.getString(SETTINGS_KEY);
    if (storedSettings) {
      try {
        const parsed = JSON.parse(storedSettings);
        // Validate loaded settings against defaults/expected types if necessary
        return { ...defaultSettings, ...parsed };
      } catch (e) {
        console.error("Failed to parse stored settings:", e);
        storage.delete(SETTINGS_KEY);
      }
    }
    return defaultSettings;
  });

  // --- Update Setting and Save ---
  // Keep the useEffect for saving to avoid blocking UI
  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prevSettings => ({ ...prevSettings, [key]: value }));
  };

  useEffect(() => {
    storage.set(SETTINGS_KEY, JSON.stringify(settings));
    console.log("Settings saved:", settings);
  }, [settings]);

  // --- Determine Actual Theme ---
  const activeTheme = React.useMemo((): "light" | "dark" => {
    if (settings.theme === "system") {
      return systemColorScheme ?? "light"; // Default to light if system is null
    }
    return settings.theme; // 'light' or 'dark'
  }, [settings.theme, systemColorScheme]);

  const value: SettingsContextProps = {
    settings,
    updateSetting,
    activeTheme, // Pass the calculated theme
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
