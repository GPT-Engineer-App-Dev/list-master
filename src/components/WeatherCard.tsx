import React, { useState, useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
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
        const apiKey = "YOUR_API_KEY_HERE";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

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
      <Text>Location: {weatherData.name}</Text>
      <Text>Temperature: {weatherData.main.temp}°C</Text>
      <Text>Condition: {weatherData.weather[0].description}</Text>
    </Box>
  );
};

export default WeatherCard;
