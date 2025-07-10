import { useColorScheme as useColorSchemeNW } from "nativewind";
import { useEffect, useMemo } from "react";
import { useColorScheme } from "react-native";
import { AppSettings } from "../context/SettingsContext";

export const useAppTheme = (settings: AppSettings) => {
  const systemColorScheme = useColorScheme();
  const {
    setColorScheme: setNativeWindTheme,
    colorScheme: currentNativeWindTheme,
  } = useColorSchemeNW();

  const themeToApply = useMemo(() => {
    return settings.theme === "system"
      ? systemColorScheme ?? "light"
      : settings.theme;
  }, [settings.theme, systemColorScheme]);

  useEffect(() => {
    if (currentNativeWindTheme !== themeToApply) {
      setNativeWindTheme(themeToApply);
    }
  }, [
    themeToApply,
    setNativeWindTheme,
    currentNativeWindTheme,
    settings.theme,
    systemColorScheme,
  ]);
};
