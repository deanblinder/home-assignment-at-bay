import { NextResponse } from "next/server";
import { Todo } from "@/app/types";
import { TODOS } from "@/app/constants/todos";

export async function PUT(request: Request) {
  try {
    const { id } = await request.json();

    const todoIndex = TODOS.findIndex((t: Todo) => t.id === id);
    if (todoIndex === -1) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    TODOS[todoIndex] = {
      ...TODOS[todoIndex],
      completed: !TODOS[todoIndex].completed,
    };

    return NextResponse.json(TODOS[todoIndex]);
  } catch (error) {
    console.error("Error toggling todo:", error);
    return NextResponse.json(
      { error: "Failed to toggle todo" },
      { status: 500 }
    );
  }
}
