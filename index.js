/**
 * @format
 */
import React from "react";
import { AppRegistry, useColorScheme } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "./src/theme";
import { WeatherProvider } from "./src/context/WeatherContext";

function Main() {
  const colorScheme = useColorScheme();
  return (
    <PaperProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
