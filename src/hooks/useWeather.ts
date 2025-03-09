import { useState, useEffect } from "react";
import { fetchWeather } from "../api/weather";
import { WeatherResponse } from "../types/weather";

export function useWeather(latitude: number, longitude: number) {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadWeather = async () => {
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

    loadWeather();
  }, [latitude, longitude]);

  return { weather, loading, error };
}
