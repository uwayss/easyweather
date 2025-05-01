// FILE: tailwind.config.js
/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./App.tsx", "./index.js"], // Added App.tsx and index.js
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Light Theme Colors (matching your lightTheme)
        light: {
          primary: "#006d77",
          secondary: "#83c5be",
          tertiary: "#edf6f9",
          background: "#fafafa",
          surface: "#ffffff", // Adjusted for clarity vs background
          surfaceVariant: "#eeeeee", // Approximated
          onSurface: "#1f1f1f", // Approximated text color
          onSurfaceVariant: "#666666", // Approximated secondary text color
          outline: "#cccccc", // Approximated border color
          error: "#B00020", // Default Material error
          onSurfaceDisabled: "rgba(0, 0, 0, 0.38)", // From Paper light theme
          elevation: {
            // Added for consistency
            level1: "#ffffff",
            level2: "#f8f8f8",
            level3: "#f1f1f1",
            level4: "#ebebeb",
            level5: "#e4e4e4",
          },
        },
        // Dark Theme Colors (matching your darkTheme)
        dark: {
          primary: "#83c5be",
          secondary: "#006d77",
          tertiary: "#1a1a1a",
          background: "#121212",
          surface: "#1e1e1e", // Adjusted for clarity vs background
          surfaceVariant: "#303030", // Approximated
          onSurface: "#e1e1e1", // Approximated text color
          onSurfaceVariant: "#aaaaaa", // Approximated secondary text color
          outline: "#555555", // Approximated border color
          error: "#CF6679", // Default Material error
          onSurfaceDisabled: "rgba(255, 255, 255, 0.38)", // From Paper dark theme
          elevation: {
            // Added for consistency
            level1: "#1e1e1e",
            level2: "#232323",
            level3: "#272727",
            level4: "#292929",
            level5: "#2d2d2d",
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
