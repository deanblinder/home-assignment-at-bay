"use client";
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import { OutlinedInput } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Todo } from "@/app/types";

type TodoProps = {
  todo: Todo;
  onUpdate: (id: number, title: string) => Promise<void>;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
};

export default function TodoItem(props: TodoProps) {
  const { todo, onUpdate, onRemove, onToggle } = props;

  const handleTodoToggle = () => {
    onToggle(todo.id);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(todo.id, e.target.value);
  };

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
}
