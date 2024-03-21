import { useState } from "react";
import { Box, Heading, Input, Button, List, ListItem, IconButton, Flex, Spacer, useToast, Checkbox, Card, VStack } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";
import React from "react";
import Sparkles from "../components/Sparkles";
import PomodoroTimer from "../components/PomodoroTimer";
import Spinner from "../components/Spinner";
import Stopwatch from "../components/Stopwatch";

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
    <Flex minHeight="100vh" alignItems="center" justifyContent="center" bg="gray.100">
      <VStack spacing={8} maxWidth="400px" width="100%">
        <Card p={8} width="100%">
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
        <Card p={8} width="100%">
          <PomodoroTimer />
        </Card>
        <Card p={8} width="100%">
          <Heading size="md" mb={4}>
            Spinnin' out of control!
          </Heading>
          <Spinner />
        </Card>
        <Card p={8} width="100%">
          <Stopwatch />
        </Card>
      </VStack>
    </Flex>
  );
};

export default Index;
