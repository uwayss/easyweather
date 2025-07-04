import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme as useColorSchemeNW } from "nativewind";
import React, { useEffect, useMemo } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import "../services/i18next";
import {
  LocationProvider,
  useLocationContext,
} from "../src/context/LocationContext";
import { SettingsProvider, useSettings } from "../src/context/SettingsContext";
import { ToastProvider, useToast } from "../src/context/ToastContext";
import { useWeather, WeatherProvider } from "../src/context/WeatherContext";

const ThemedAppWithProviders = () => {
  const { settings, isLoading: isSettingsLoading } = useSettings();
  const { error: weatherError, clearError: clearWeatherError } = useWeather();
  const { error: locationError, clearError: clearLocationError } =
    useLocationContext();
  const { showToast } = useToast();

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

  useEffect(() => {
    const errorMessage = locationError || weatherError;
    if (errorMessage) {
      showToast({ message: errorMessage, type: "error" });
      if (locationError) clearLocationError();
      if (weatherError) clearWeatherError();
    }
  }, [
    weatherError,
    locationError,
    showToast,
    clearLocationError,
    clearWeatherError,
  ]);

  if (isSettingsLoading) {
    return null;
  }

  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="details" />
        <Stack.Screen name="locations" />
      </Stack>
      <StatusBar />
    </SafeAreaView>
  );
};

const AppWithProviders = () => {
  return (
    <LocationProvider>
      <WeatherProvider>
        <ThemedAppWithProviders />
      </WeatherProvider>
    </LocationProvider>
  );
};

export default function AppRoot() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SettingsProvider>
          <ToastProvider>
            <AppWithProviders />
          </ToastProvider>
        </SettingsProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
