"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { todosActions } from "./actions/todos/todosActions";
import { Todo } from "./types";
import TodoItem from "./components/todoItem";
import { Button, OutlinedInput } from "@mui/material";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState<string>("");

  const fetchData = async () => {
    const data = await todosActions.getTodos();
    setTodos(data.data);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      <h1>Todos: </h1>
      <div className={styles.inputContainer}>
        <OutlinedInput value={todoTitle} fullWidth onChange={onTitleChange} />
        <Button variant="contained" color="primary" onClick={handleAddTodo}>
          Add
        </Button>
      </div>
      <div className={styles.todoList}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={handleTodoUpdate}
            onToggle={handleTodoToggle}
            onRemove={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
