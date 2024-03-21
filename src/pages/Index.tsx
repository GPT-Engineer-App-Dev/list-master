import React from "react";
import RandomQuote from "../components/RandomQuote";
import WeatherCard from "../components/WeatherCard";

const Index: React.FC = () => {
  return (
    <div>
      <RandomQuote />
      <WeatherCard />
    </div>
  );
};

export default Index;
