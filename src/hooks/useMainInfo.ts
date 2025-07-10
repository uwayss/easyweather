import { useColorScheme } from "nativewind";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { THEME_COLORS_DARK, THEME_COLORS_LIGHT } from "../constants/colors";
import { useLocationContext } from "../context/LocationContext";
import { useSettings } from "../context/SettingsContext";
import { CurrentWeather } from "../types/weather";
import { convertTemperature, formatTemperature } from "../utils/unitConversion";

export const useMainInfo = (current: CurrentWeather | undefined) => {
  const { settings, translatedWeatherDescriptions } = useSettings();
  const { t } = useTranslation();
  const {
    location,
    loading: locationLoading,
    addSavedLocation,
    removeSavedLocation,
    isLocationSaved,
  } = useLocationContext();
  const { colorScheme } = useColorScheme();

  const name = useMemo(
    () =>
      location
        ? location.displayName
        : locationLoading
        ? t("weather.loading_location")
        : t("weather.unknown_location"),
    [location, locationLoading, t]
  );

  const description = useMemo(() => {
    if (!current) return null;
    const timeOfDay = current.isDay ? "day" : "night";
    return translatedWeatherDescriptions[current.weatherCode]?.[timeOfDay]
      .description;
  }, [current, translatedWeatherDescriptions]);

  const isCurrentLocSaved = isLocationSaved(location);
  const canBeSaved = useMemo(
    () =>
      location &&
      location.displayName !== t("weather.current_location") &&
      location.displayName !== t("weather.loading_location") &&
      location.displayName !== t("weather.unknown_location"),
    [location, t]
  );

  const handleToggleSaveLocation = () => {
    if (!location || !canBeSaved) return;
    if (isCurrentLocSaved) {
      const locationId = `${location.latitude}_${location.longitude}`;
      removeSavedLocation(locationId);
    } else {
      addSavedLocation(location);
    }
  };

  const formattedTemperatureDisplay = useMemo(
    () =>
      formatTemperature(
        convertTemperature(current?.temperature, settings.useImperialUnits),
        settings.useImperialUnits
      ),
    [current?.temperature, settings.useImperialUnits]
  );

  const formattedFeltTempDisplay = useMemo(
    () =>
      formatTemperature(
        convertTemperature(current?.feltTemp, settings.useImperialUnits),
        settings.useImperialUnits
      ).replace(/°[CF]$/, ""),
    [current?.feltTemp, settings.useImperialUnits]
  );

  const starIconColor = useMemo(() => {
    const theme =
      colorScheme === "dark" ? THEME_COLORS_DARK : THEME_COLORS_LIGHT;
    return isCurrentLocSaved ? theme.primary : theme.onSurface;
  }, [isCurrentLocSaved, colorScheme]);

  return {
    t,
    name,
    description,
    isCurrentLocSaved,
    canBeSaved,
    handleToggleSaveLocation,
    formattedTemperatureDisplay,
    formattedFeltTempDisplay,
    starIconColor,
  };
};
