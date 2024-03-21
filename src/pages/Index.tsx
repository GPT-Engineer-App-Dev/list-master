import { useState } from "react";
import { Box, Heading, Input, Button, List, ListItem, IconButton, Flex, Spacer, useToast, Checkbox, Card, SimpleGrid } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";
import React from "react";
import Sparkles from "../components/Sparkles";
import RandomJokeGenerator from "../components/RandomJokeGenerator";
import PomodoroTimer from "../components/PomodoroTimer";
import Spinner from "../components/Spinner";
import Stopwatch from "../components/Stopwatch";
import QuoteGenerator from "../components/QuoteGenerator";
import Scratchpad from "../components/Scratchpad";
import MusicPlayer from "../components/MusicPlayer";
import TicTacToe from "../components/TicTacToe";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [inputValue, setInputValue] = useState("");

  const handleToggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  const toast = useToast();

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
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
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    toast({
      title: "Todo deleted.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center" bg="gray.100" p={8}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} maxWidth="1200px" width="100%">
        <Card p={6}>
          <Heading mb={8} textAlign="center">
            Todo App
            <React.Suspense fallback={null}>
              <Sparkles />
            </React.Suspense>
          </Heading>
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
                  <Checkbox isChecked={todo.completed} onChange={() => handleToggleTodo(todo.id)} mr={2} />
                  <Box textDecoration={todo.completed ? "line-through" : "none"}>{todo.text}</Box>
                  <Spacer />
                  <IconButton icon={<FaTrash />} aria-label="Delete todo" onClick={() => handleDeleteTodo(todo.id)} colorScheme="red" size="sm" />
                </Flex>
              </ListItem>
            ))}
          </List>
        </Card>
        <Card p={6}>
          <PomodoroTimer />
        </Card>
        <Card p={6}>
          <Heading size="md" mb={4}>
            Spinnin' out of control!
          </Heading>
          <Spinner />
        </Card>
        <Card p={6}>
          <Stopwatch />
        </Card>
        <Card p={6}>
          <QuoteGenerator />
        </Card>
        <Card p={6}>
          <RandomJokeGenerator />
        </Card>
        <Card p={6}>
          <MusicPlayer />
        </Card>
        <Card p={6}>
          <Scratchpad />
        </Card>
        <Card p={6}>
          <TicTacToe />
        </Card>
      </SimpleGrid>
    </Flex>
  );
};

export default Index;
