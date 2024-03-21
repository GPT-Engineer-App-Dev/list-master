import React, { useState, useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

interface WeatherData {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
  };
}

const WeatherCard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        const apiKey = "YOUR_WEATHERAPI_KEY_HERE";
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

        const response = await fetch(apiUrl);
        const data: WeatherData = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
      setIsLoading(false);
    };

    fetchWeatherData();
  }, []);

  if (isLoading) {
    return <Text>Loading weather data...</Text>;
  }

  if (!weatherData) {
    return <Text>Failed to fetch weather data.</Text>;
  }

  return (
    <Box>
      <Heading size="md" mb={4}>
        Current Weather
      </Heading>
      <Text>Location: {weatherData.location.name}</Text>
      <Text>Temperature: {weatherData.current.temp_c}°C</Text>
      <Text>Condition: {weatherData.current.condition.text}</Text>
    </Box>
  );
};

export default WeatherCard;
