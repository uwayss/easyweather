// FILE: tailwind.config.js
/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */

const { THEME_COLORS_LIGHT, THEME_COLORS_DARK } = require("./src/constants/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./App.tsx", "./index.js"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: THEME_COLORS_LIGHT,
        dark: THEME_COLORS_DARK,
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
