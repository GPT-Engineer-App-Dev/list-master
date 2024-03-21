import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(() => {
    const storedTime = localStorage.getItem("stopwatchTime");
    return storedTime ? parseInt(storedTime, 10) : 0;
  });
  const [isRunning, setIsRunning] = useState(() => {
    const storedIsRunning = localStorage.getItem("stopwatchIsRunning");
    return storedIsRunning ? JSON.parse(storedIsRunning) : false;
  });

  useEffect(() => {
    localStorage.setItem("stopwatchTime", time.toString());
    localStorage.setItem("stopwatchIsRunning", JSON.stringify(isRunning));
  }, [time, isRunning]);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        Stopwatch
      </Heading>
      <Text fontSize="4xl" mb={4}>
        {formatTime(time)}
      </Text>
      <Flex>
        {!isRunning ? (
          <Button onClick={startStopwatch} colorScheme="green" mr={2}>
            Start
          </Button>
        ) : (
          <Button onClick={stopStopwatch} colorScheme="yellow" mr={2}>
            Stop
          </Button>
        )}
        <Button onClick={resetStopwatch} colorScheme="red">
          Reset
        </Button>
      </Flex>
    </Box>
  );
};

export default Stopwatch;
