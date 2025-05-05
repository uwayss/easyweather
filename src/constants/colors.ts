// FILE: src/constants/colors.ts
// Temperature Gradient Color Stops (Celsius)
export const THEME_COLORS_LIGHT = {
  primary: "#006d77",
  secondary: "#83c5be",
  tertiary: "#edf6f9",
  background: "#fafafa",
  surface: "#ffffff",
  surfaceVariant: "#eeeeee",
  onSurface: "#1f1f1f",
  onSurfaceVariant: "#666666",
  outline: "#cccccc",
  error: "#B00020",
  onSurfaceDisabled: "rgba(0, 0, 0, 0.38)",
  elevation: {
    level1: "#ffffff",
    level2: "#f8f8f8",
    level3: "#f1f1f1",
    level4: "#ebebeb",
    level5: "#e4e4e4",
  },
}
export const THEME_COLORS_DARK = {
  primary: "#83c5be",
  secondary: "#006d77",
  tertiary: "#1a1a1a",
  background: "#121212",
  surface: "#1e1e1e",
  surfaceVariant: "#303030",
  onSurface: "#e1e1e1",
  onSurfaceVariant: "#aaaaaa",
  outline: "#555555",
  error: "#CF6679",
  onSurfaceDisabled: "rgba(255, 255, 255, 0.38)",
  elevation: {
    level1: "#1e1e1e",
    level2: "#232323",
    level3: "#272727",
    level4: "#292929",
    level5: "#2d2d2d",
  },
}
export const TEMP_COLOR_STOPS_CELSIUS: [number, string][] = [
  [-30, "#e0f7fa"],
  [-25, "#b0f4e5"],
  [-20, "#81d4fa"],
  [-15, "#4fc3f7"],
  [-10, "#29b6f6"],
  [-5, "#03a9f4"],
  [0, "#fffde7"],
  [5, "#fff59d"],
  [10, "#ffecb3"],
  [15, "#ffe082"],
  [20, "#ffd54f"],
  [25, "#ffab91"],
  [30, "#ff8a65"],
  [35, "#ff7043"],
  [40, "#ff5722"],
];

// Metric Colors
export const PRECIPITATION_COLOR_LOW = "#90be6d"; // Green
export const PRECIPITATION_COLOR_MEDIUM = "#f9c74f"; // Yellow
export const PRECIPITATION_COLOR_HIGH = "#f94144"; // Red

export const HUMIDITY_COLOR_LOW = "#ffd166"; // Light Orange/Yellow
export const HUMIDITY_COLOR_MEDIUM = "#06d6a0"; // Teal
export const HUMIDITY_COLOR_HIGH = "#118ab2"; // Blue

export const WIND_COLOR_LOW = "#90be6d"; // Green
export const WIND_COLOR_MEDIUM = "#f9c74f"; // Yellow
export const WIND_COLOR_HIGH = "#f8961e"; // Orange
export const WIND_COLOR_SEVERE = "#f94144"; // Red
