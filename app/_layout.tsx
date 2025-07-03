import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme as useColorSchemeNW } from "nativewind";
import React, { useEffect, useMemo } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "../global.css";
import "../services/i18next";
import {
  LocationProvider,
  useLocationContext,
} from "../src/context/LocationContext";
import { SettingsProvider, useSettings } from "../src/context/SettingsContext";
import { useWeather, WeatherProvider } from "../src/context/WeatherContext";

const ThemedAppWithProviders = () => {
  const { settings } = useSettings();
  const { error: weatherError, clearError: clearWeatherError } = useWeather();
  const { error: locationError, clearError: clearLocationError } =
    useLocationContext();

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
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
        position: "bottom",
        visibilityTime: 4000,
        autoHide: true,
        onHide: () => {
          if (locationError) clearLocationError();
          if (weatherError) clearWeatherError();
        },
      });
    }
  }, [weatherError, locationError, clearWeatherError, clearLocationError]);

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
          <AppWithProviders />
        </SettingsProvider>
        <Toast />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
