import React, { useState, useEffect } from "react";
import { Box, Button, Text } from "@chakra-ui/react";

interface Quote {
  content: string;
  author: string;
}

const QuoteGenerator: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Random Quote
      </Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : quote ? (
        <>
          <Text mb={2}>{quote.content}</Text>
          <Text fontStyle="italic">- {quote.author}</Text>
        </>
      ) : (
        <Text>Failed to fetch quote.</Text>
      )}
      <Button mt={4} onClick={fetchQuote} isLoading={isLoading}>
        New Quote
      </Button>
    </Box>
  );
};

export default QuoteGenerator;