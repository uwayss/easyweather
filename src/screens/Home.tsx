import React from "react";
import Wrapper from "../components/index.components";
import { LocationSearch } from "../components/LocationSearch";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";

export default function Home() {
  return (
    <Wrapper>
      <LocationSearch />
      <WeatherCard />
      <ForecastList />
    </Wrapper>
  );
}
