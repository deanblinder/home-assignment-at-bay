import { NextResponse } from "next/server";
import { Todo } from "@/app/types";
import { TODOS } from "@/app/constants/todos";

export async function PUT(request: Request) {
  try {
    const { id, title } = await request.json();

    const todoIndex = TODOS.findIndex((t: Todo) => t.id === id);
    if (todoIndex === -1) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    TODOS[todoIndex] = { ...TODOS[todoIndex], title };

    return NextResponse.json(TODOS[todoIndex]);
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}
