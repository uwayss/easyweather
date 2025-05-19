// FILE: tailwind.config.js
/** @type {import('tailwindcss').Config} */

import { THEME_COLORS_DARK, THEME_COLORS_LIGHT } from "./src/constants/colors";
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
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
