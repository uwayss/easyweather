// FILE: src/constants/colors.ts
// Temperature Gradient Color Stops (Celsius)
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
