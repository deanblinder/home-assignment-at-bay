import { NextResponse } from "next/server";

import { Todo } from "@/app/types";
import { TODOS } from "@/app/constants/todos";

export async function POST(request: Request) {
  try {
    const { title, userId = 1 } = await request.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const newId =
      TODOS.length > 0 ? Math.max(...TODOS.map((t: Todo) => t.id)) + 1 : 1;

    const newTodo: Todo = {
      userId,
      id: newId,
      title,
      completed: false,
    };

    TODOS.unshift(newTodo);

    return NextResponse.json({ data: newTodo });
  } catch (error) {
    console.error("Error adding todo:", error);
    return NextResponse.json({ error: "Failed to add todo" }, { status: 500 });
  }
}
