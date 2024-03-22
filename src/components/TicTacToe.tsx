import { useState } from "react";
import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index: number) => (
    <Button h="100px" w="100px" onClick={() => handleClick(index)}>
      {board[index]}
    </Button>
  );

  function calculateWinner(squares: Array<string | null>) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <Box>
      <Text fontSize="xl" mb={4}>
        Tic Tac Toe
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        {Array(9)
          .fill(null)
          .map((_, index) => (
            <GridItem key={index} colSpan={{ base: 3, sm: 1 }}>
              {renderSquare(index)}
            </GridItem>
          ))}
      </Grid>
      {winner && (
        <Text mt={4} fontWeight="bold">
          Winner: {winner}
        </Text>
      )}
    </Box>
  );
};

export default TicTacToe;
