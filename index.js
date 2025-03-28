/**
 * @format
 */
import React from "react";
import { AppRegistry, useColorScheme } from "react-native";
import App from "./App";
import { NavigationContainer } from "@react-navigation/native";
import { name as appName } from "./app.json";
import { PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "./src/theme";
import { WeatherProvider } from "./src/context/WeatherContext";
import { LocationProvider } from "./src/context/LocationContext";

function Main() {
  const colorScheme = useColorScheme();
  return (
    <PaperProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
      <NavigationContainer>
        <LocationProvider>
          <WeatherProvider>
            <App />
          </WeatherProvider>
        </LocationProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
