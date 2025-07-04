import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { fetchAirQuality } from "../api/airQuality";
import { fetchWeather } from "../api/weather";
import { CurrentAirQualityData } from "../types/airQuality";
import { DayWeather, Weather } from "../types/weather";
import { ProcessedWeatherData } from "../utils/weatherUtils";
import { useLocationContext } from "./LocationContext";

interface WeatherContextProps {
  weather: Weather | null;
  currentAirQuality: CurrentAirQualityData | null;
  yesterdaySummary: DayWeather | undefined;
  todaySummary: DayWeather | undefined;
  tomorrowSummary: DayWeather | undefined;
  loading: boolean;
  error: string | null;
  fetchWeatherDataAndAQI: (
    latitude: number,
    longitude: number
  ) => Promise<void>;
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
    useState<CurrentAirQualityData | null>(null);
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
        const [weatherData, airQualityData] = await Promise.all([
          fetchWeather(latitude, longitude),
          fetchAirQuality(latitude, longitude).catch((aqiError) => {
            console.error(
              "AQI Fetch Error (will attempt to show weather):",
              aqiError
            );
            return null;
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

        setCurrentAirQuality(airQualityData);
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : "An unknown error occurred fetching data";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    []
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
