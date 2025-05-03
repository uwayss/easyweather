// FILE: index.js
import { getAnalytics } from "@react-native-firebase/analytics";
import { getApp } from "@react-native-firebase/app";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import React, { useEffect, useRef } from "react";
import { AppRegistry } from "react-native";
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

MobileAds().setRequestConfiguration({
  maxAdContentRating: MaxAdContentRating.G,
  tagForChildDirectedTreatment: true,
  tagForUnderAgeOfConsent: true,
});
const adUnitId = __DEV__ ? TestIds.BANNER : BANNER_AD_UNIT_ID;

const ThemedAppWithProviders = () => {
  const { activeTheme } = useSettings();
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef(null);
  const { setColorScheme } = useColorScheme();

  // Removed Snackbar state
  const [adLoadAttempt, setAdLoadAttempt] = React.useState(0); // Use React.useState
  const [adLoaded, setAdLoaded] = React.useState(false);
  const { error: weatherError, clearError: clearWeatherError } = useWeather();
  const { error: locationError, clearError: clearLocationError } = useLocationContext();

  useEffect(() => {
    setColorScheme(activeTheme);
  }, [activeTheme, setColorScheme]);

  // Show Toast on error
  useEffect(() => {
    const errorMessage = locationError || weatherError;
    if (errorMessage) {
      Toast.show({
        type: "error", // 'success', 'error', 'info'
        text1: "Error", // Optional title
        text2: errorMessage,
        position: "bottom",
        visibilityTime: 4000, // Duration in ms
        autoHide: true,
        onHide: () => {
          // Clear error state when toast hides
          if (locationError) clearLocationError();
          if (weatherError) clearWeatherError();
        },
      });
    }
  }, [weatherError, locationError, clearWeatherError, clearLocationError]); // Added clear functions to deps

  const handleAdFailedToLoad = () => {
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
      }
    } catch (error) {
      console.error("[Analytics] Firebase not configured?", error);
    }
  };

  const onStateChange = async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName && currentRouteName) {
      try {
        const app = getApp();
        await getAnalytics(app).logScreenView({
          screen_name: currentRouteName,
          screen_class: currentRouteName,
        });
      } catch (error) {
        console.error("[Analytics] Error logging screen view:", error);
      }
    }
    routeNameRef.current = currentRouteName || null;
  };
  return (
    <>
      <NavigationContainer ref={navigationRef} onReady={onReady} onStateChange={onStateChange}>
        <App />
        <BannerAd
          key={adLoadAttempt}
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          onAdLoaded={handleAdLoaded}
          onAdFailedToLoad={handleAdFailedToLoad}
          style={{ opacity: adLoaded ? 1 : 0 }}
        />
      </NavigationContainer>
    </>
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

function AppRoot() {
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

AppRegistry.registerComponent(appName, () => AppRoot);
