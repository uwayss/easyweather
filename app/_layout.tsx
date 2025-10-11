// FILE: app/_layout.tsx
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import "../services/i18next";
import { LocationProvider } from "../src/context/LocationContext";
import { SettingsProvider, useSettings } from "../src/context/SettingsContext";
import { ToastProvider } from "../src/context/ToastContext";
import { WeatherProvider } from "../src/context/WeatherContext";
import { useAppTheme } from "../src/hooks/useAppTheme";
import { useGlobalErrors } from "../src/hooks/useGlobalErrors";
import { View } from "react-native";

const ThemedAppWithProviders = () => {
  const { settings, isLoading: isSettingsLoading } = useSettings();

  useAppTheme(settings);
  useGlobalErrors();

  if (isSettingsLoading) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="details" />
        <Stack.Screen name="locations" />
      </Stack>
    </View>
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
