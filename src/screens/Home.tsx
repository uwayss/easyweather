import { LocationResult } from "../api/location";
import Wrapper from "../components/index.components";
import { useLocation } from "../hooks/useLocation";
import { useWeather } from "../hooks/useWeather";
import { LocationSearch } from "../components/LocationSearch";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";
import { convertToForecastDays } from "../utils/weatherUtils";
import React from "react";

export default function Home() {
  const { location, updateLocation, loading: locationLoading } = useLocation();
  const {
    weather,
    loading: weatherLoading,
    error,
  } = useWeather(location?.latitude ?? 0, location?.longitude ?? 0);

  const handleLocationSelect = (selectedLocation: LocationResult) => {
    updateLocation({
      latitude: parseFloat(selectedLocation.lat),
      longitude: parseFloat(selectedLocation.lon),
      displayName: selectedLocation.display_name,
    });
  };

  if (locationLoading || weatherLoading) return <Wrapper msg="Loading..." />;

  if (error) return <Wrapper msg={"Error: " + error} />;
  if (!weather) return <Wrapper msg="No weather data available" />;

  return (
    <Wrapper>
      <LocationSearch onLocationSelect={handleLocationSelect} />
      <WeatherCard current={weather.current} name={location?.displayName || "Unknown location"} />
      <ForecastList forecast={convertToForecastDays(weather.daily)} />
    </Wrapper>
  );
}
