import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme as useColorSchemeNW } from "nativewind";
import React, { useEffect, useMemo } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MobileAds, {
  BannerAd,
  BannerAdSize,
  MaxAdContentRating,
  TestIds,
} from "react-native-google-mobile-ads";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "../global.css";

import "../services/i18next";
import { BANNER_AD_UNIT_ID } from "../src/constants/config";
import {
  LocationProvider,
  useLocationContext,
} from "../src/context/LocationContext";
import { SettingsProvider, useSettings } from "../src/context/SettingsContext";
import { useWeather, WeatherProvider } from "../src/context/WeatherContext";

MobileAds().setRequestConfiguration({
  maxAdContentRating: MaxAdContentRating.G,
  tagForChildDirectedTreatment: true,
  tagForUnderAgeOfConsent: true,
});

// Determine Ad Unit ID
const adUnitId = __DEV__ ? TestIds.BANNER : BANNER_AD_UNIT_ID;

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

  const [adLoadAttempt, setAdLoadAttempt] = React.useState(0);
  const [adLoaded, setAdLoaded] = React.useState(false);

  const themeToApply = useMemo(() => {
    return settings.theme === "system"
      ? systemColorScheme ?? "light"
      : settings.theme;
  }, [settings.theme, systemColorScheme]);

  useEffect(() => {
    if (currentNativeWindTheme !== themeToApply) {
      console.log(
        `[Theme] Applying theme via NativeWind: ${themeToApply}. (System: ${systemColorScheme}, Setting: ${settings.theme})`
      );
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

  const handleAdFailedToLoad = (error: any) => {
    console.error("Banner Ad failed to load: ", error);

    setTimeout(() => {
      console.log("Retrying ad load...");
      setAdLoadAttempt((prev) => prev + 1);
    }, 30000);
  };

  const handleAdLoaded = () => {
    setAdLoaded(true);
    console.log("Banner Ad loaded successfully");
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="details" />
      </Stack>
      <View style={{ height: !adLoaded ? 0 : undefined, alignSelf: "center" }}>
        <BannerAd
          key={`banner-${adLoadAttempt}`}
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          onAdLoaded={handleAdLoaded}
          onAdFailedToLoad={handleAdFailedToLoad}
          requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        />
      </View>
      <StatusBar />
    </SafeAreaView>
  );
};

// Component grouping non-UI providers
const AppWithProviders = () => {
  return (
    <LocationProvider>
      <WeatherProvider>
        <ThemedAppWithProviders />
      </WeatherProvider>
    </LocationProvider>
  );
};

// Root component with UI wrappers and SettingsProvider
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
