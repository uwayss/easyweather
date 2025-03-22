import React, { useEffect } from "react";
import Wrapper from "../components/index.components";
import { LocationSearch } from "../components/LocationSearch";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";
import { useWeather } from "../context/WeatherContext";
import { useLocation } from "../hooks/useLocation";

export default function Home() {
  const { location } = useLocation();
  const { fetchWeatherData } = useWeather();

  useEffect(() => {
    if (location) {
      console.warn("location changed");
      fetchWeatherData(location.latitude, location.longitude); // Fetch weather when location changes
    }
  }, [location]);

  return (
    <Wrapper>
      <LocationSearch />
      <WeatherCard />
      <ForecastList />
    </Wrapper>
  );
}
