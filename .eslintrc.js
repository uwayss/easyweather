module.exports = {
  root: true,
  extends: "@react-native",
  plugins: ["prettier"],
  ignorePatterns: ["android/"],
  rules: {
    "prettier/prettier": "error",
    "linebreak-style": ["error", "unix"],
    bracketSameLine: "off",
  },
};
