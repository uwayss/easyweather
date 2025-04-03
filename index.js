import React from "react";
import { AppRegistry } from "react-native"; // Renamed import
import App from "./App";
import { NavigationContainer } from "@react-navigation/native";
import { name as appName } from "./app.json";
import { PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "./src/theme";
import { WeatherProvider } from "./src/context/WeatherContext";
import { LocationProvider } from "./src/context/LocationContext";
import { SettingsProvider, useSettings } from "./src/context/SettingsContext"; // Import SettingsProvider and useSettings
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Component to bridge SettingsContext and PaperProvider
const AppThemeProvider = () => {
  const { activeTheme } = useSettings();

  // Choose the theme object based on the active theme
  const themeToApply = activeTheme === "dark" ? darkTheme : lightTheme;

  console.log(`Applying theme: ${activeTheme}`); // Debug log

  return (
    <PaperProvider theme={themeToApply}>
      <NavigationContainer>
        <LocationProvider>
          <WeatherProvider>
            <App />
          </WeatherProvider>
        </LocationProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

function AppRoot() {
  // Wrap everything in SettingsProvider
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SettingsProvider>
        <AppThemeProvider />
      </SettingsProvider>
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(appName, () => AppRoot);
