// app.config.js
import fs from "node:fs";

export default ({ config }) => {
  const versionCodeFilePath = "versionCode.txt";
  let versionCode;

  try {
    const versionCodeString = fs
      .readFileSync(versionCodeFilePath, "utf8")
      .trim();
    versionCode = parseInt(versionCodeString, 10);
    if (isNaN(versionCode)) {
      console.warn(
        `Warning: Invalid versionCode in ${versionCodeFilePath}. Using default of 1.`
      );
      versionCode = 1;
    }
  } catch (error) {
    console.warn(
      `Warning: Could not read ${versionCodeFilePath}. Using default versionCode of 1.`
    );
    console.error(error);
    versionCode = 1;
  }

  const appConfig = {
    expo: {
      name: "EasyWeather",
      slug: "easyweather",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/icon.png",
      scheme: "easyweather",
      userInterfaceStyle: "automatic",
      newArchEnabled: true,
      ios: {
        supportsTablet: true,
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/icon_fg.png",
          backgroundImage: "./assets/icon_bg.png",
        },
        edgeToEdgeEnabled: true,
        googleServicesFile: "./google-services.json",
        package: "com.uwayss.easyweather",
        versionCode: versionCode,
        compileSdkVersion: 35,
        targetSdkVersion: 35,
        networkSecurityConfig: {
          "domain-config": [
            {
              cleartextTrafficPermitted: true,
              domain: "ip-api.com",
            },
          ],
        },
      },
      web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/icon.png",
      },
      plugins: [
        "expo-router",
        [
          "expo-splash-screen",
          {
            image: "./assets/icon_fg.png",
            imageWidth: 200,
            resizeMode: "contain",
            backgroundColor: "#ffffff",
          },
        ],
        "@react-native-firebase/app",
      ],
      experiments: {
        typedRoutes: true,
      },
    },
  };

  return appConfig;
};
