import React, { createContext, useState, useContext } from "react";
import { fetchWeather } from "../api/weather";
import { WeatherResponse } from "../types/weather";

interface WeatherContextProps {
  weather: WeatherResponse | null;
  loading: boolean;
  error: string | null;
  fetchWeatherData: (latitude: number, longitude: number) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeather(latitude, longitude);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      console.error("Error fetching weather:", err);
    } finally {
      setLoading(false);
    }
  };

  const value: WeatherContextProps = {
    weather,
    loading,
    error,
    fetchWeatherData,
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
