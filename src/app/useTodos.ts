"use client";
import { useEffect, useMemo, useState } from "react";
import { todosActions } from "./actions/todos/todosActions";
import { Todo } from "./types";
import _ from "lodash";

const LIMIT = 10;

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [paginationData, setPaginationData] = useState({
    hasMore: true,
    next: 0,
    isLoading: false,
  });

  const fetchData = async () => {
    setPaginationData({
      ...paginationData,
      isLoading: true,
    });
    const data = await todosActions.getTodos(paginationData.next, LIMIT);
    setTodos(data.data);

    setPaginationData({
      hasMore: data.data.length < data.total,
      next: data.next,
      isLoading: false,
    });
  };

  const debouncedUpdateTitle = useMemo(
    () =>
      _.debounce(async (id: number, title: string) => {
        todosActions.updateTodo(id, title);
      }, 3000),
    []
  );

  useEffect(() => {
    return () => {
      debouncedUpdateTitle.cancel();
    };
  }, [debouncedUpdateTitle]);

  const handleTitleUpdate = async (id: number, title: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    );
    debouncedUpdateTitle(id, title);
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
    if (searchQuery !== "") return;

    setPaginationData({
      ...paginationData,
      isLoading: true,
    });

    const data = await todosActions.getTodos(paginationData.next, LIMIT);

    setTodos((prevTodos) => [...prevTodos, ...data.data]);

    setPaginationData({
      hasMore: todos.length + data.data.length < data.total,
      next: data.next,
      isLoading: false,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("####### todos");

  return {
    isLoading: paginationData.isLoading,
    todos,
    todoTitle,
    searchQuery,
    hasMore: paginationData.hasMore,
    handleTitleUpdate,
    handleTodoToggle,
    handleDelete,
    handleAddTodo,
    onTitleChange,
    onSearchChange,
    onFetchMore,
    filteredTodos,
  };
};
