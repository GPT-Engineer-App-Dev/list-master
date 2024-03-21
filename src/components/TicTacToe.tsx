import React, { useState } from "react";
import { Box, Button, Grid, Heading } from "@chakra-ui/react";

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");

  const handleClick = (index: number) => {
    if (board[index] === null) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setPlayer(player === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        Tic Tac Toe
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        {board.map((cell, index) => (
          <Button key={index} onClick={() => handleClick(index)} height="80px">
            {cell}
          </Button>
        ))}
      </Grid>
      <Button mt={4} onClick={resetGame}>
        Reset
      </Button>
    </Box>
  );
};

export default TicTacToe;