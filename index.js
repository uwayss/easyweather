// FILE: index.js

import { getAnalytics } from "@react-native-firebase/analytics";
import { getApp } from "@react-native-firebase/app";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { useColorScheme as useColorSchemeNW } from "nativewind";
import React, { useEffect, useMemo, useRef } from "react";
import { AppRegistry, StatusBar, useColorScheme as useColorSchemeRN } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MobileAds, {
  BannerAd,
  BannerAdSize,
  MaxAdContentRating,
  TestIds,
} from "react-native-google-mobile-ads";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import App from "./App";
import { name as appName } from "./app.json";
import { BANNER_AD_UNIT_ID } from "./src/constants/config";
import { LocationProvider, useLocationContext } from "./src/context/LocationContext";
import { SettingsProvider, useSettings } from "./src/context/SettingsContext";
import { WeatherProvider, useWeather } from "./src/context/WeatherContext";
import "./services/i18next";

// Configure Mobile Ads
MobileAds().setRequestConfiguration({
  maxAdContentRating: MaxAdContentRating.G,
  tagForChildDirectedTreatment: true,
  tagForUnderAgeOfConsent: true,
});

// Determine Ad Unit ID
const adUnitId = __DEV__ ? TestIds.BANNER : BANNER_AD_UNIT_ID;

// Component that applies theme and includes providers needing settings/theme
const ThemedAppWithProviders = () => {
  const { settings } = useSettings();
  const { error: weatherError, clearError: clearWeatherError } = useWeather();
  const { error: locationError, clearError: clearLocationError } = useLocationContext();

  const systemColorScheme = useColorSchemeRN();
  const { setColorScheme: setNativeWindTheme, colorScheme: currentNativeWindTheme } =
    useColorSchemeNW();

  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef(null);
  const [adLoadAttempt, setAdLoadAttempt] = React.useState(0);
  const [adLoaded, setAdLoaded] = React.useState(false);

  const themeToApply = useMemo(() => {
    return settings.theme === "system" ? systemColorScheme ?? "light" : settings.theme;
  }, [settings.theme, systemColorScheme]);

  useEffect(() => {
    if (currentNativeWindTheme !== themeToApply) {
      console.log(
        `[Theme] Applying theme via NativeWind: ${themeToApply}. (System: ${systemColorScheme}, Setting: ${settings.theme})`,
      );
      setNativeWindTheme(themeToApply);
    }
  }, [themeToApply, setNativeWindTheme, currentNativeWindTheme]);

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

  const handleAdFailedToLoad = error => {
    console.error("Banner Ad failed to load: ", error);

    setTimeout(() => {
      console.log("Retrying ad load...");
      setAdLoadAttempt(prev => prev + 1);
    }, 30000);
  };

  const handleAdLoaded = () => {
    setAdLoaded(true);
    console.log("Banner Ad loaded successfully");
  };

  const onReady = () => {
    const currentRoute = navigationRef.getCurrentRoute();
    routeNameRef.current = currentRoute?.name || null;
    try {
      const app = getApp();
      if (routeNameRef.current) {
        getAnalytics(app).logScreenView({
          screen_name: routeNameRef.current,
          screen_class: routeNameRef.current,
        });
        console.log(`[Analytics] Logged initial screen view: ${routeNameRef.current}`);
      }
    } catch (error) {
      console.error("[Analytics] Firebase not configured or error logging initial screen:", error);
    }
  };

  const onStateChange = async () => {
    const previousRouteName = routeNameRef.current;
    const currentRoute = navigationRef.getCurrentRoute();
    const currentRouteName = currentRoute?.name;

    if (previousRouteName !== currentRouteName && currentRouteName) {
      console.log(`[Navigation] Navigated from ${previousRouteName} to ${currentRouteName}`);
      try {
        const app = getApp();
        await getAnalytics(app).logScreenView({
          screen_name: currentRouteName,
          screen_class: currentRouteName,
        });
        console.log(`[Analytics] Logged screen view: ${currentRouteName}`);
      } catch (error) {
        console.error("[Analytics] Error logging screen view:", error);
      }
    }

    routeNameRef.current = currentRouteName || null;
  };

  return (
    <NavigationContainer ref={navigationRef} onReady={onReady} onStateChange={onStateChange}>
      <App />
      <StatusBar
        barStyle={themeToApply === "dark" ? "light-content" : "dark-content"}
        className="bg-light-surface dark:bg-dark-surface"
      />
      {/* Render Banner Ad */}
      <BannerAd
        key={`banner-${adLoadAttempt}`}
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdLoaded={handleAdLoaded}
        onAdFailedToLoad={handleAdFailedToLoad}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        style={{ opacity: adLoaded ? 1 : 0, alignSelf: "center" }}
      />
    </NavigationContainer>
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
function AppRoot() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SettingsProvider>
          <AppWithProviders />
        </SettingsProvider>
        {/* Toast needs to be outside NavigationContainer typically, but after providers */}
        <Toast />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

// Register the main component
AppRegistry.registerComponent(appName, () => AppRoot);
