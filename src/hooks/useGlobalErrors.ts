import { useEffect } from "react";
import { useLocationContext } from "../context/LocationContext";
import { useToast } from "../context/ToastContext";
import { useWeather } from "../context/WeatherContext";

export const useGlobalErrors = () => {
  const { error: weatherError, clearError: clearWeatherError } = useWeather();
  const { error: locationError, clearError: clearLocationError } =
    useLocationContext();
  const { showToast } = useToast();

  useEffect(() => {
    const errorMessage = locationError || weatherError;
    if (errorMessage) {
      showToast({ message: errorMessage, type: "error" });
      if (locationError) clearLocationError();
      if (weatherError) clearWeatherError();
    }
  }, [
    weatherError,
    locationError,
    showToast,
    clearLocationError,
    clearWeatherError,
  ]);
};
