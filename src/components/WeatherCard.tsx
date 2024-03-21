import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Image } from "@chakra-ui/react";

const WeatherCard: React.FC = () => {
  const [weather, setWeather] = useState({ temperature: "", description: "", iconUrl: "" });

  useEffect(() => {
    const fetchWeather = async () => {
      const dummyData = {
        temperature: "18°C",
        description: "Partly Cloudy",
        iconUrl: "https://example.com/weather-icon.png",
      };
      setWeather(dummyData);
    };

    fetchWeather();
  }, []);

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Heading size="md" mb={2}>
        Current Weather
      </Heading>
      {weather.iconUrl && <Image src={weather.iconUrl} alt="Weather icon" boxSize="50px" />}
      <Text fontSize="2xl" mb={2}>
        {weather.temperature}
      </Text>
      <Text fontSize="lg">{weather.description}</Text>
    </Box>
  );
};

export default WeatherCard;
