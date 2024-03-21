import React, { useState, useEffect } from "react";
import { Box, Heading, Textarea, Button } from "@chakra-ui/react";

const Scratchpad: React.FC = () => {
  const [text, setText] = useState(() => {
    const storedText = localStorage.getItem("scratchpadText");
    return storedText ? storedText : "";
  });

  useEffect(() => {
    localStorage.setItem("scratchpadText", text);
  }, [text]);

  const handleClear = () => {
    setText("");
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        Scratchpad
      </Heading>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your notes here..."
        minHeight="200px"
        mb={4}
      />
      <Button onClick={handleClear} colorScheme="red">
        Clear
      </Button>
    </Box>
  );
};

export default Scratchpad;