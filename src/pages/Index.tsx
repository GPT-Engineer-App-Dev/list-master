import { useState } from "react";
import { Box, Heading, Input, Button, List, ListItem, IconButton, Flex, Spacer, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

interface Todo {
  id: number;
  text: string;
}

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
      toast({
        title: "Todo added.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    toast({
      title: "Todo deleted.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <Heading mb={8}>Todo App</Heading>
      <Flex mb={4}>
        <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter a todo" mr={2} />
        <Button onClick={handleAddTodo} colorScheme="blue" px={8}>
          <FaPlus />
        </Button>
      </Flex>
      <List spacing={3}>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <Flex align="center">
              <Box>{todo.text}</Box>
              <Spacer />
              <IconButton icon={<FaTrash />} aria-label="Delete todo" onClick={() => handleDeleteTodo(todo.id)} colorScheme="red" size="sm" />
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;
