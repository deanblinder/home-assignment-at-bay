export const todosService = {
  getTodos: async (start?: number, limit?: number) => {
    try {
      const response = await fetch("/api/todos/getTodos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ start, limit }),
      });
      if (!response.ok) throw new Error("Failed to fetch todos");

      return response.json();
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  },
  addTodo: async (title: string, userId?: number) => {
    try {
      const response = await fetch("/api/todos/addTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, userId }),
      });
      if (!response.ok) throw new Error("Failed to add todo");

      return response.json();
    } catch (error) {
      console.error("Error adding todo:", error);
      throw error;
    }
  },
  removeTodo: async (id: number) => {
    try {
      const response = await fetch("/api/todos/deleteTodo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to delete todo");

      return response.json();
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  },
  updateTodo: async (id: number, title: string) => {
    try {
      const response = await fetch("/api/todos/updateTodo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, title }),
      });
      if (!response.ok) throw new Error("Failed to update todo");

      return response.json();
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  },
  toggleTodo: async (id: number) => {
    try {
      const response = await fetch("/api/todos/toggleTodo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to toggle todo");

      return response.json();
    } catch (error) {
      console.error("Error toggling todo:", error);
      throw error;
    }
  },
};
