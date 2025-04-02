import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchWeather } from "../api/weather";
import { useLocationContext } from "./LocationContext";
import { Weather } from "../types/weather";

interface WeatherContextProps {
  weather: Weather | null;
  loading: boolean;
  error: string | null;
  fetchWeatherData: (latitude: number, longitude: number) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { location, error: locationError } = useLocationContext();
  console.log(
    `[WeatherProvider] Rendering. Location from Context: ${
      location ? `${location.displayName} (${location.latitude}, ${location.longitude})` : "null"
    }`,
  );

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`[WeatherContext] Fetching weather data for lat: ${latitude}, lon: ${longitude}`);
      const data = await fetchWeather(latitude, longitude);
      console.log("[WeatherContext] Setting the weather state with the fetched weather");
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      console.error("Error fetching weather:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      console.log(
        `[WeatherContext] useEffect triggered by location change: ${location.displayName} (${location.latitude}, ${location.longitude})`,
      );
      fetchWeatherData(location.latitude, location.longitude);
    } else {
      console.log(
        "[WeatherContext] useEffect triggered but location is null. Waiting for location...",
      );
    }
  }, [location]);

  const value: WeatherContextProps = {
    weather,
    loading,
    error: locationError || error,
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
