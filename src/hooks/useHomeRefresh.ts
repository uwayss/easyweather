import { useCallback, useState } from "react";

import { useLocationContext } from "../context/LocationContext";
import { useWeather } from "../context/WeatherContext";

export const useHomeRefresh = () => {
  const { location } = useLocationContext();
  const { fetchWeatherDataAndAQI } = useWeather();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    if (!location) {
      setRefreshing(false);
      return;
    }
    setRefreshing(true);
    try {
      await fetchWeatherDataAndAQI(location.latitude, location.longitude);
    } catch (e) {
      console.error("Refresh error:", e);
    } finally {
      setRefreshing(false);
    }
  }, [location, fetchWeatherDataAndAQI]);

  return { refreshing, onRefresh };
};
