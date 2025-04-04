This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Weather App

A beautiful and intuitive weather application that provides accurate forecasts based on your location. Features include:

- Real-time weather conditions
- Hourly and daily forecasts
- Location-based weather data
- Customizable units and themes

## Installing

1. Clone this repository
2. Install dependencies: `npm install`
3. Run the app: `npx react-native run-android` or `npx react-native run-ios`

For development, ensure you have the React Native environment set up as per the [official documentation](https://reactnative.dev/docs/environment-setup).

## Modifying

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

# Troubleshooting

If you can't get it to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

## Privacy Statement

This app respects your privacy. Here's what you need to know:

- **Location Data:** We use your location (obtained either via your IP address for an initial estimate or directly from your device's GPS if you grant permission) solely to fetch relevant weather forecasts from the Open-Meteo API and display location names via the Nominatim API. Your precise location is processed to get weather data but is not stored long-term on any server controlled by us after the forecast is retrieved.
- **Local Storage:** Your last searched/selected location and app settings (like theme and units) are stored _only_ on your device using MMKV storage. This data is not transmitted elsewhere.
- **No Personal Information:** We do not collect, store, or share any other personally identifiable information (like name, email, contacts).
- **Third-Party Services:** The app uses third-party services for weather (Open-Meteo), location search (Nominatim/OpenStreetMap), and IP-based geolocation (ip-api.com, ipify.org). Please refer to their respective privacy policies for how they handle data.
- **Analytics:** No user analytics are currently collected.

This app is open-source. You can review the code yourself at [https://github.com/uwayss/weather-v2].
