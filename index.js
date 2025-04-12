import React, { useRef } from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { name as appName } from "./app.json";
import { PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "./src/theme";
import { WeatherProvider } from "./src/context/WeatherContext";
import { LocationProvider } from "./src/context/LocationContext";
import { SettingsProvider, useSettings } from "./src/context/SettingsContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import "./services/i18next";
import { firebase, getAnalytics } from "@react-native-firebase/analytics";

const AppThemeProvider = () => {
  const { activeTheme } = useSettings();
  const themeToApply = activeTheme === "dark" ? darkTheme : lightTheme;
  // --- Add Analytics Screen Tracking ---
  const navigationRef = useNavigationContainerRef(); // Use hook to get ref
  const routeNameRef = useRef(null); // Ref to store current route name

  const onReady = () => {
    routeNameRef.current = navigationRef.getCurrentRoute()?.name || null;
    firebase.initializeApp();
    console.log("[Analytics] Navigation Ready. Initial screen:", routeNameRef.current);
    if (routeNameRef.current) {
      getAnalytics().logScreenView({
        screen_name: routeNameRef.current,
        screen_class: routeNameRef.current, // Can use the same for basic tracking
      });
    }
  };

  const onStateChange = async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName && currentRouteName) {
      console.log("[Analytics] Logging screen view:", currentRouteName);
      await getAnalytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      });
    }
    // Save the current route name for next state change
    routeNameRef.current = currentRouteName || null;
  };
  // --- End Analytics Screen Tracking ---

  console.log(`Applying theme: ${activeTheme}`);
  const bannerID = "ca-app-pub-2933834243243547/5697502047";
  return (
    <PaperProvider theme={themeToApply}>
      <NavigationContainer ref={navigationRef} onReady={onReady} onStateChange={onStateChange}>
        <LocationProvider>
          <WeatherProvider>
            <App />
            <BannerAd unitId={bannerID} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
          </WeatherProvider>
        </LocationProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

function AppRoot() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SettingsProvider>
        <AppThemeProvider />
      </SettingsProvider>
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(appName, () => AppRoot);
