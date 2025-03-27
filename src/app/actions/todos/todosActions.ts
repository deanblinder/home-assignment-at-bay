import { todosService } from "@/app/services/todos/todosServices";

export const todosActions = {
  getTodos: async (start?: number, limit?: number) => {
    return await todosService.getTodos(start, limit);
  },
  updateTodo: async (id: number, title: string) => {
    return await todosService.updateTodo(id, title);
  },
  toggleTodo: async (id: number) => {
    return await todosService.toggleTodo(id);
  },
  removeTodo: async (id: number) => {
    return await todosService.removeTodo(id);
  },
  addTodo: async (title: string, userId?: number) => {
    return await todosService.addTodo(title, userId);
  },
};
