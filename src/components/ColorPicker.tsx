import React, { useState } from "react";
import { Box, Button, Heading, Input, Text, Image } from "@chakra-ui/react";

interface ColorResult {
  name: string;
  hex: string;
  swatchImg: {
    svg: string;
  };
}

const ColorPicker: React.FC = () => {
  const [colorName, setColorName] = useState("");
  const [colorResult, setColorResult] = useState<ColorResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`https://api.color.pizza/v1/names/?name=${colorName}`);
      const data = await response.json();
      if (data.colors && data.colors.length > 0) {
        setColorResult(data.colors[0]);
      } else {
        setError("No matching color found.");
      }
    } catch (error) {
      setError("Failed to fetch color data.");
    }
    setIsLoading(false);
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        Color Picker
      </Heading>
      <Input value={colorName} onChange={(e) => setColorName(e.target.value)} placeholder="Enter a color name" mb={4} />
      <Button onClick={handleSearch} isLoading={isLoading} mb={4}>
        Search
      </Button>
      {error && <Text color="red.500">{error}</Text>}
      {colorResult && (
        <Box>
          <Image src={`data:image/svg+xml;utf8,${encodeURIComponent(colorResult.swatchImg.svg)}`} alt={colorResult.name} mb={2} />
          <Box bg={colorResult.hex} w="100px" h="100px" borderRadius="md" />
        </Box>
      )}
    </Box>
  );
};

export default ColorPicker;
