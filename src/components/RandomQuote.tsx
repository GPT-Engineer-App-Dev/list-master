import React, { useState } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

const RandomQuote: React.FC = () => {
  const [quote, setQuote] = useState({ content: "", author: "" });

  const fetchRandomQuote = async () => {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    setQuote({ content: data.content, author: data.author });
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        Random Quote
      </Heading>
      <Text fontSize="xl" mb={4}>
        "{quote.content}"
      </Text>
      <Text fontStyle="italic" mb={4}>
        - {quote.author}
      </Text>
      <Button onClick={fetchRandomQuote} colorScheme="purple">
        Get New Quote
      </Button>
    </Box>
  );
};

export default RandomQuote;