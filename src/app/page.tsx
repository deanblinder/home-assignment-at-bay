"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { todosActions } from "./actions/todos/todosActions";
import { Todo } from "./types";
import TodoItem from "./components/todoItem";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      <h1>Todos: </h1>
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
  );
}
