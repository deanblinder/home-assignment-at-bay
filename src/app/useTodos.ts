"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { todosActions } from "./actions/todos/todosActions";
import { Todo } from "./types";
import _ from "lodash";

const LIMIT = 10;

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const isFirstTime = useRef(true);
  const savedTitle = useRef<string>("");

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
    const res = await todosActions.getTodos(paginationData.next, LIMIT);
    setTodos(res.data);

    setPaginationData({
      hasMore: res.data.length < res.total,
      next: res.next,
      isLoading: false,
    });
  };

  const debouncedUpdateTitle = useMemo(
    () =>
      _.debounce(async (id: number, title: string) => {
        try {
          await todosActions.updateTodo(id, title);
        } catch {
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.id === id ? { ...todo, title: savedTitle.current } : todo
            )
          );
        } finally {
          isFirstTime.current = true;
        }
      }, 3000),
    []
  );

  useEffect(() => {
    return () => {
      debouncedUpdateTitle.cancel();
    };
  }, [debouncedUpdateTitle]);

  const handleTitleUpdate = async (id: number, title: string) => {
    if (isFirstTime.current === true) {
      savedTitle.current = todos.find((todo) => todo.id === id)!.title;
      isFirstTime.current = false;
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    );

    await debouncedUpdateTitle(id, title);
  };

  const handleTodoToggle = async (id: number) => {
    const savedTodos = [...todos];
    try {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      await todosActions.toggleTodo(id);
    } catch {
      setTodos(savedTodos);
    }
  };

  const handleDelete = async (id: number) => {
    const savedTodos = [...todos];
    try {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      await todosActions.removeTodo(id);
    } catch {
      setTodos(savedTodos);
    }
  };

  const handleAddTodo = async () => {
    const todo = await todosActions.addTodo(newTodoTitle);
    setTodos((prevTodos) => [todo.data, ...prevTodos]);
    setNewTodoTitle("");
  };

  const onNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
  };

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const res = await todosActions.getTodos(paginationData.next, LIMIT);

    setTodos((prevTodos) => [...prevTodos, ...res.data]);

    setPaginationData({
      hasMore: todos.length + res.data.length < res.total,
      next: res.next,
      isLoading: false,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    isLoading: paginationData.isLoading,
    todos,
    newTodoTitle,
    searchQuery,
    hasMore: paginationData.hasMore,
    handleTitleUpdate,
    handleTodoToggle,
    handleDelete,
    handleAddTodo,
    onNewTodoChange,
    onQueryChange,
    onFetchMore,
    filteredTodos,
  };
};
