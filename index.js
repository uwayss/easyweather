import React from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import { NavigationContainer } from "@react-navigation/native";
import { name as appName } from "./app.json";
import { PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "./src/theme";
import { WeatherProvider } from "./src/context/WeatherContext";
import { LocationProvider } from "./src/context/LocationContext";
import { SettingsProvider, useSettings } from "./src/context/SettingsContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
// import { TestIds } from "react-native-google-mobile-ads";
import "./services/i18next";

const AppThemeProvider = () => {
  const { activeTheme } = useSettings();

  const themeToApply = activeTheme === "dark" ? darkTheme : lightTheme;

  console.log(`Applying theme: ${activeTheme}`);
  const bannerID = "ca-app-pub-2933834243243547/5697502047";
  // const testID = TestIds.BANNER;
  return (
    <PaperProvider theme={themeToApply}>
      <NavigationContainer>
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
