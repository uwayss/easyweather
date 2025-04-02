This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

## Privacy Statement

This app respects your privacy. Here's what you need to know:

- **Location Data:** We use your location (obtained either via your IP address for an initial estimate or directly from your device's GPS if you grant permission) solely to fetch relevant weather forecasts from the Open-Meteo API and display location names via the Nominatim API. Your precise location is processed to get weather data but is not stored long-term on any server controlled by us after the forecast is retrieved.
- **Local Storage:** Your last searched/selected location and app settings (like theme and units) are stored _only_ on your device using MMKV storage. This data is not transmitted elsewhere.
- **No Personal Information:** We do not collect, store, or share any other personally identifiable information (like name, email, contacts).
- **Third-Party Services:** The app uses third-party services for weather (Open-Meteo), location search (Nominatim/OpenStreetMap), and IP-based geolocation (ip-api.com, ipify.org). Please refer to their respective privacy policies for how they handle data.
- **Analytics:** No user analytics are currently collected.

This app is open-source. You can review the code yourself at [https://github.com/uwayss/weather-v2].
