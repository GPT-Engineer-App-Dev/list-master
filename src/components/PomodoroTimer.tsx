import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

const PomodoroTimer: React.FC = () => {
  const [duration] = useState(25 * 60);
  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    const storedStartTime = localStorage.getItem("startTime");
    if (storedStartTime) {
      const startTime = parseInt(storedStartTime, 10);
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const remainingTime = Math.max(duration - elapsedTime, 0);
      setRemainingTime(remainingTime);
    }
  }, []);
  const [isRunning, setIsRunning] = useState(() => {
    const storedIsRunning = localStorage.getItem("isRunning");
    return storedIsRunning ? JSON.parse(storedIsRunning) : false;
  });

  useEffect(() => {
    localStorage.setItem("remainingTime", remainingTime.toString());
    localStorage.setItem("isRunning", JSON.stringify(isRunning));
  }, [remainingTime, isRunning]);

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
    localStorage.setItem("startTime", Date.now().toString());
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setRemainingTime(duration);
    setIsRunning(false);
    localStorage.removeItem("startTime");
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
