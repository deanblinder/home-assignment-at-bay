"use client";
import styles from "./page.module.css";
import TodoItem from "./components/todoItem";
import { Button, CircularProgress, OutlinedInput, Box } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTodos } from "./useTodos";

export default function Home() {
  const {
    filteredTodos,
    todoTitle,
    searchQuery,
    hasMore,
    handleTitleUpdate,
    handleTodoToggle,
    handleDelete,
    handleAddTodo,
    onTitleChange,
    onSearchChange,
    onFetchMore,
    isLoading,
  } = useTodos();

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
          scrollThreshold={0.8}
          loader={undefined}
        >
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onTitleUpdate={handleTitleUpdate}
              onToggle={handleTodoToggle}
              onRemove={handleDelete}
            />
          ))}
        </InfiniteScroll>
        {isLoading && (
          <Box display="flex" justifyContent="center" width="100%" p={2}>
            <CircularProgress />
          </Box>
        )}
      </div>
    </div>
  );
}
