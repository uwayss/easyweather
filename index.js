/**
 * @format
 */

import { AppRegistry, useColorScheme } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "./src/theme";

function Main() {
  const colorScheme = useColorScheme();
  return (
    <PaperProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
