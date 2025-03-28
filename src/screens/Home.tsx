import React from "react";
import Wrapper from "../components/index.components";
import { LocationSearch } from "../components/HomeScreen/LocationSearch";
import WeatherCard from "../components/HomeScreen/WeatherCard";
import ForecastList from "../components/HomeScreen/ForecastList";

export default function Home() {
  return (
    <Wrapper>
      <LocationSearch />
      <WeatherCard />
      <ForecastList />
    </Wrapper>
  );
}
