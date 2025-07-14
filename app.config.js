// FILE: app.config.js
require("dotenv").config();

module.exports = {
  expo: {
    name: "EasyWeather",
    slug: "easyweather",
    version: "1.0.0",
    orientation: "default",
    icon: "./assets/icon.png",
    scheme: "easyweather",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    runtimeVersion: {
      policy: "appVersion",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon/foreground.png",
        backgroundImage: "./assets/adaptive-icon/background.png",
      },
      edgeToEdgeEnabled: true,
      package: "com.uwayss.easyweather",
      versionCode: 39,
      keystorePath: process.env.KEYSTORE_PATH,
      keystorePassword: process.env.KEYSTORE_PASSWORD,
      keyAlias: process.env.KEY_ALIAS,
      keyPassword: process.env.KEY_PASSWORD,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/favicon.ico",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/splash.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#0C1C2E",
        },
      ],
      [
        "expo-build-properties",
        {
          android: {
            usesCleartextTraffic: true,
            compileSdkVersion: 35,
            targetSdkVersion: 35,
            enableProguardInReleaseBuilds: true,
            enableShrinkResourcesInReleaseBuilds: true,
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
