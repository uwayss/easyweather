module.exports = {
  root: true,
  extends: "@react-native",
  plugins: ["prettier"],
  ignorePatterns: ["android/"],
  rules: {
    "prettier/prettier": "warn",
    "linebreak-style": ["error", "unix"],
    bracketSameLine: "off",
  },
};
