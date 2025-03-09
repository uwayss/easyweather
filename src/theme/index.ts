import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#006d77",
    secondary: "#83c5be",
    tertiary: "#edf6f9",
    background: "#fafafa",
    surface: "rgba(255, 255, 255, 0.85)",
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#83c5be",
    secondary: "#006d77",
    tertiary: "#1a1a1a",
    background: "#121212",
    surface: "rgba(18, 18, 18, 0.85)",
  },
};
