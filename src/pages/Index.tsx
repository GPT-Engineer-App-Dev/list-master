import React from "react";
import { VStack, Card } from "@chakra-ui/react";
import PomodoroTimer from "../components/PomodoroTimer";

const Index: React.FC = () => {
  return (
    <VStack spacing={8}>
      <Card>
        <PomodoroTimer />
      </Card>
    </VStack>
  );
};

export default Index;
