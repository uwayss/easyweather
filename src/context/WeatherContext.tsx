// FILE: src\context\WeatherContext.tsx
import { getAnalytics } from "@react-native-firebase/analytics";
import React, { createContext, useState, useContext, useEffect } from "react";

import { useLocationContext } from "./LocationContext";
import { fetchWeather } from "../api/weather";
import { Weather } from "../types/weather";

interface WeatherContextProps {
  weather: Weather | null;
  loading: boolean;
  error: string | null;
  fetchWeatherData: (latitude: number, longitude: number) => Promise<void>;
  clearError: () => void;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { location } = useLocationContext();

  const clearError = () => setError(null);

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(latitude, longitude);
      setWeather(data);
      getAnalytics().logEvent("fetch_weather_success", {
        location: location?.displayName || "Unknown",
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An unknown error occurred fetching weather";
      setError(msg);
      getAnalytics().logEvent("fetch_weather_failed", {
        location: location?.displayName || "Unknown",
        error: String(err),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchWeatherData(location.latitude, location.longitude);
    }
  }, [location]);

  const value: WeatherContextProps = {
    weather,
    loading,
    error: error,
    fetchWeatherData,
    clearError,
  };

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
