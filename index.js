// FILE: index.js
import React, { useRef, useEffect, useState } from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { name as appName } from "./app.json";
import { PaperProvider, Snackbar } from "react-native-paper";
import { darkTheme, lightTheme } from "./src/theme";
import { WeatherProvider, useWeather } from "./src/context/WeatherContext";
import { LocationProvider, useLocationContext } from "./src/context/LocationContext";
import { SettingsProvider, useSettings } from "./src/context/SettingsContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import "./services/i18next";
import { getApp } from "@react-native-firebase/app";
import { getAnalytics } from "@react-native-firebase/analytics";
import { BANNER_AD_UNIT_ID } from "./src/constants/config";
import { SNACKBAR_DURATION_LONG } from "./src/constants/ui";
import MobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";

MobileAds().setRequestConfiguration({
  maxAdContentRating: MaxAdContentRating.G,
  tagForChildDirectedTreatment: true,
  tagForUnderAgeOfConsent: true,
});
const adUnitId = __DEV__ ? TestIds.BANNER : BANNER_AD_UNIT_ID;

const ThemedAppWithProviders = () => {
  const { activeTheme } = useSettings();
  const themeToApply = activeTheme === "dark" ? darkTheme : lightTheme;
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef(null);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [adLoadAttempt, setAdLoadAttempt] = useState(0);
  const { error: weatherError, clearError: clearWeatherError } = useWeather();
  const { error: locationError, clearError: clearLocationError } = useLocationContext();

  useEffect(() => {
    const errorMessage = locationError || weatherError;
    if (errorMessage) {
      setSnackbarMessage(errorMessage);
      setSnackbarVisible(true);
    }
  }, [weatherError, locationError]);

  const onDismissSnackbar = () => {
    setSnackbarVisible(false);
    if (locationError) clearLocationError();
    if (weatherError) clearWeatherError();
  };

  const handleAdFailedToLoad = () => {
    setTimeout(() => {
      console.log("Retrying ad load...");
      setAdLoadAttempt(prev => prev + 1);
    }, 30000);
  };

  const handleAdLoaded = () => {
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
    <PaperProvider theme={themeToApply}>
      <NavigationContainer ref={navigationRef} onReady={onReady} onStateChange={onStateChange}>
        <App />
        {/* Always render BannerAd, use key to trigger reloads */}
        <BannerAd
          key={adLoadAttempt}
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          onAdLoaded={handleAdLoaded}
          onAdFailedToLoad={handleAdFailedToLoad}
        />
        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackbar}
          action={{
            label: "Dismiss",
            onPress: onDismissSnackbar,
          }}
          duration={SNACKBAR_DURATION_LONG}
        >
          {snackbarMessage || ""}
        </Snackbar>
      </NavigationContainer>
    </PaperProvider>
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SettingsProvider>
        <AppWithProviders />
      </SettingsProvider>
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(appName, () => AppRoot);
