// FILE: src/context/WeatherContext.tsx
import { getAnalytics } from "@react-native-firebase/analytics";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { fetchAirQuality } from "../api/airQuality"; // Import new API call
import { fetchWeather } from "../api/weather";
import { CurrentAirQualityData } from "../types/airQuality"; // Import AQI type
import { DayWeather, Weather } from "../types/weather";
import { ProcessedWeatherData } from "../utils/weatherUtils";
import { useLocationContext } from "./LocationContext";

interface WeatherContextProps {
  weather: Weather | null;
  currentAirQuality: CurrentAirQualityData | null; // New state for AQI
  yesterdaySummary: DayWeather | undefined;
  todaySummary: DayWeather | undefined;
  tomorrowSummary: DayWeather | undefined;
  loading: boolean; // This will now represent combined loading for weather & AQI
  error: string | null; // This can be an error from either weather or AQI fetch
  fetchWeatherDataAndAQI: (
    latitude: number,
    longitude: number
  ) => Promise<void>; // Renamed
  clearError: () => void;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined
);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [currentAirQuality, setCurrentAirQuality] =
    useState<CurrentAirQualityData | null>(null); // New AQI state
  const [yesterdaySummary, setYesterdaySummary] = useState<
    DayWeather | undefined
  >(undefined);
  const [todaySummary, setTodaySummary] = useState<DayWeather | undefined>(
    undefined
  );
  const [tomorrowSummary, setTomorrowSummary] = useState<
    DayWeather | undefined
  >(undefined);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { location } = useLocationContext();

  const clearError = () => setError(null);

  const fetchWeatherDataAndAQI = useCallback(
    async (latitude: number, longitude: number) => {
      setLoading(true);
      setError(null);
      try {
        // Fetch weather and AQI data concurrently
        const [weatherData, airQualityData] = await Promise.all([
          fetchWeather(latitude, longitude),
          fetchAirQuality(latitude, longitude).catch((aqiError) => {
            // Catch AQI specific error to allow weather data to still load
            console.error(
              "AQI Fetch Error (will attempt to show weather):",
              aqiError
            );
            getAnalytics().logEvent("fetch_aqi_failed", {
              location: location?.displayName || "Unknown",
              error: String(aqiError),
            });
            return null; // Return null if AQI fetch fails
          }),
        ]);

        const processedWeatherData = weatherData as ProcessedWeatherData;

        setWeather({
          current: processedWeatherData.current,
          hourly: processedWeatherData.hourly,
          daily: processedWeatherData.daily,
          timezone: processedWeatherData.timezone,
          latitude: processedWeatherData.latitude,
          longitude: processedWeatherData.longitude,
        });
        setYesterdaySummary(processedWeatherData.yesterdaySummary);
        setTodaySummary(processedWeatherData.todaySummary);
        setTomorrowSummary(processedWeatherData.tomorrowSummary);

        setCurrentAirQuality(airQualityData); // Set AQI data (could be null if fetch failed)

        getAnalytics().logEvent("fetch_weather_aqi_success", {
          location: location?.displayName || "Unknown",
          aqi_loaded: !!airQualityData,
        });
      } catch (err) {
        // This catch block will primarily handle errors from fetchWeather
        // or if Promise.all itself fails (e.g., network issue before individual catches)
        const msg =
          err instanceof Error
            ? err.message
            : "An unknown error occurred fetching data";
        setError(msg);
        getAnalytics().logEvent("fetch_weather_aqi_failed", {
          location: location?.displayName || "Unknown",
          error: String(err),
        });
      } finally {
        setLoading(false);
      }
    },
    [location?.displayName]
  );

  useEffect(() => {
    if (location) {
      fetchWeatherDataAndAQI(location.latitude, location.longitude);
    }
  }, [location, fetchWeatherDataAndAQI]);

  const value: WeatherContextProps = {
    weather,
    currentAirQuality,
    yesterdaySummary,
    todaySummary,
    tomorrowSummary,
    loading,
    error: error,
    fetchWeatherDataAndAQI,
    clearError,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
