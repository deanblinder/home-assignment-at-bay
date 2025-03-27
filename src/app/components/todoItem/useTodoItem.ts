import { TodoItemProps } from ".";

export const useTodoItem = (props: TodoItemProps) => {
  const { todo, onToggle, onTitleUpdate } = props;

  const handleTodoToggle = () => {
    onToggle(todo.id);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleUpdate(todo.id, e.target.value);
  };

  return {
    handleTodoToggle,
    handleTitleChange,
  };
};
