import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

const PomodoroTimer: React.FC = () => {
  const [duration] = useState(25 * 60);
  const [remainingTime, setRemainingTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: number;
    if (isRunning && remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, remainingTime]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setRemainingTime(duration);
    setIsRunning(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        Pomodoro Timer
      </Heading>
      <Text fontSize="4xl" mb={4}>
        {formatTime(remainingTime)}
      </Text>
      <Flex>
        {!isRunning ? (
          <Button onClick={startTimer} colorScheme="green" mr={2}>
            Start
          </Button>
        ) : (
          <Button onClick={pauseTimer} colorScheme="yellow" mr={2}>
            Pause
          </Button>
        )}
        <Button onClick={resetTimer} colorScheme="red">
          Reset
        </Button>
      </Flex>
    </Box>
  );
};

export default PomodoroTimer;
