// FILE: tailwind.config.js
/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./App.tsx", "./index.js"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
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
        },
        dark: {
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
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
