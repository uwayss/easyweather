# EasyWeather

EasyWeather is a mobile weather application built with React Native and Expo. It provides current weather information, hourly and daily forecasts, and air quality data. Users can search for locations and save their favorite ones.

## Features

- Current weather conditions (temperature, humidity, wind speed, etc.)
- Hourly and daily weather forecasts
- Air quality index (AQI) display
- Location search functionality
- Ability to save and manage favorite locations
- Dynamic backgrounds based on weather conditions
- Customizable units (metric/imperial)
- Multi-language support (English, Arabic, Turkish)

## Technologies Used

- React Native
- Expo
- TypeScript
- Tailwind CSS
- i18next for internationalization
- Expo Router for navigation
- Open-Meteo API for weather data
- Geolocation API for location services

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js) or Yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/easyweather.git
   cd easyweather
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

- To start the development server:
  ```bash
  npx expo start
  ```
  This will provide options to open the app in an Android emulator, iOS simulator, or the Expo Go app.

- To run directly on an Android emulator/device:
  ```bash
  npm run android
  ```

- To run directly on an iOS simulator/device (macOS only):
  ```bash
  npm run ios
  ```

## Project Structure

- **/app**: Contains the screen components and navigation setup using Expo Router.
- **/src**: Core application logic, including API services, components, contexts, hooks, utility functions, and type definitions.
- **/assets**: Static assets like images, fonts, and background images.
- **/locales**: JSON files for internationalization (i18n) support.
- **/services**: Contains API service configurations (e.g., i18next setup).
- **/scripts**: Utility scripts for development and build processes.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

Please ensure your code adheres to the existing coding style and includes tests where applicable.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
