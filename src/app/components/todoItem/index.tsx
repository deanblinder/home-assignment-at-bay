"use client";
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import { OutlinedInput } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Todo } from "@/app/types";
import { useTodoItem } from "./useTodoItem";

export type TodoItemProps = {
  todo: Todo;
  onTitleUpdate: (id: number, title: string) => Promise<void>;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
};

const TodoItem = React.memo((props: TodoItemProps) => {
  TodoItem.displayName = "TodoItem";
  const { todo, onRemove } = props;

  const { handleTodoToggle, handleTitleChange } = useTodoItem(props);

  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox checked={todo.completed} onClick={handleTodoToggle} />
      </ListItemIcon>
      <OutlinedInput
        sx={{ width: "100%" }}
        value={todo.title}
        onChange={handleTitleChange}
      />
      <ListItemButton onClick={() => onRemove(todo.id)}>
        <DeleteIcon />
      </ListItemButton>
    </ListItem>
  );
});

export default TodoItem;
