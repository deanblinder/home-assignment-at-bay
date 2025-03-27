"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import { todosActions } from "./actions/todos/todosActions";
import { Todo } from "./types";
import TodoItem from "./components/todoItem";
import { Button, CircularProgress, OutlinedInput, Box } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

const LIMIT = 10;

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true); // New state for pagination
  const [page, setPage] = useState<number>(1); // New state for pagination
  const [total, setTotal] = useState<number>(0); // New state for pagination

  const fetchData = async () => {
    const data = await todosActions.getTodos();
    setTodos(data.data);
    setTotal(data.total);
    setHasMore(todos.length <= total);
  };

  const handleTodoUpdate = async (id: number, title: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    );
    await todosActions.updateTodo(id, title);
  };

  const handleTodoToggle = async (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    await todosActions.toggleTodo(id);
  };

  const handleDelete = async (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    await todosActions.removeTodo(id);
  };

  const handleAddTodo = async () => {
    const todo = await todosActions.addTodo(todoTitle);
    setTodos((prevTodos) => [todo.data, ...prevTodos]);
    setTodoTitle("");
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [todos, searchQuery]
  );

  const onFetchMore = async () => {
    const newPage = page + 1;
    const data = await todosActions.getTodos(newPage, LIMIT);

    setTodos((prevTodos) => [...prevTodos, ...data.data]);
    setPage(newPage);

    setHasMore(todos.length <= total);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      <h1>Todos: </h1>
      <div className={styles.inputsContainer}>
        <OutlinedInput
          value={searchQuery}
          fullWidth
          onChange={onSearchChange}
          placeholder="Search..."
        />
        <div className={styles.inputContainer}>
          <OutlinedInput
            value={todoTitle}
            fullWidth
            onChange={onTitleChange}
            placeholder="Add new todo..."
          />
          <Button variant="contained" color="primary" onClick={handleAddTodo}>
            Add
          </Button>
        </div>
      </div>
      <div className={styles.todoList}>
        <InfiniteScroll
          dataLength={filteredTodos.length}
          next={onFetchMore}
          hasMore={hasMore}
          loader={
            <Box display="flex" justifyContent="center" width="100%" p={2}>
              <CircularProgress />
            </Box>
          }
        >
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={handleTodoUpdate}
              onToggle={handleTodoToggle}
              onRemove={handleDelete}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
