// FILE: src/context/WeatherContext.tsx
import { getAnalytics } from "@react-native-firebase/analytics";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { fetchWeather } from "../api/weather";
import { DayWeather, Weather } from "../types/weather"; // Weather now might not include yesterday/today/tomorrow directly
import { ProcessedWeatherData } from "../utils/weatherUtils"; // Import the extended type
import { useLocationContext } from "./LocationContext";

interface WeatherContextProps {
  weather: Weather | null; // Standard weather data (current, hourly, daily forecast from today)
  yesterdaySummary: DayWeather | undefined;
  todaySummary: DayWeather | undefined;
  tomorrowSummary: DayWeather | undefined;
  loading: boolean;
  error: string | null;
  fetchWeatherData: (latitude: number, longitude: number) => Promise<void>;
  clearError: () => void;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined
);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weather, setWeather] = useState<Weather | null>(null);
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

  const fetchWeatherData = useCallback(
    async (latitude: number, longitude: number) => {
      setLoading(true);
      setError(null);
      try {
        const processedData: ProcessedWeatherData = await fetchWeather(
          latitude,
          longitude
        );

        // Set the main weather data (current, hourly, daily forecast from today)
        setWeather({
          current: processedData.current,
          hourly: processedData.hourly,
          daily: processedData.daily, // This is already sliced to be from today onwards
          timezone: processedData.timezone,
          latitude: processedData.latitude,
          longitude: processedData.longitude,
        });

        // Set specific day summaries
        setYesterdaySummary(processedData.yesterdaySummary);
        setTodaySummary(processedData.todaySummary);
        setTomorrowSummary(processedData.tomorrowSummary);

        getAnalytics().logEvent("fetch_weather_success", {
          location: location?.displayName || "Unknown",
        });
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : "An unknown error occurred fetching weather";
        setError(msg);
        getAnalytics().logEvent("fetch_weather_failed", {
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
      fetchWeatherData(location.latitude, location.longitude);
    }
  }, [location, fetchWeatherData]);

  const value: WeatherContextProps = {
    weather,
    yesterdaySummary,
    todaySummary,
    tomorrowSummary,
    loading,
    error: error,
    fetchWeatherData,
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
