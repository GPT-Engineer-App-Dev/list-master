import React, { useState, useEffect } from "react";
import { Box, Button, Card, Flex, Heading, Text } from "@chakra-ui/react";

const PomodoroTimer: React.FC = () => {
  const [time, setTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card p={8} maxWidth="400px" width="100%">
      <Heading mb={8} textAlign="center">
        Pomodoro Timer
      </Heading>
      <Box mb={4} textAlign="center">
        <Text fontSize="6xl">{formatTime(time)}</Text>
      </Box>
      <Flex justify="center">
        {!isRunning ? (
          <Button onClick={() => setIsRunning(true)} colorScheme="green" px={8} mr={4}>
            Start
          </Button>
        ) : (
          <Button onClick={() => setIsRunning(false)} colorScheme="yellow" px={8} mr={4}>
            Pause
          </Button>
        )}
        <Button
          onClick={() => {
            setTime(1500);
            setIsRunning(false);
          }}
          colorScheme="red"
          px={8}
        >
          Reset
        </Button>
      </Flex>
    </Card>
  );
};

export default PomodoroTimer;
