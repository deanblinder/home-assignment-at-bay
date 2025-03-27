import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Todo } from "@/app/types";

export async function POST(request: Request) {
  try {
    const { title } = await request.json();
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const todosPath = path.join(process.cwd(), "src/app/todos.json");
    const todosData = JSON.parse(fs.readFileSync(todosPath, "utf-8"));

    const newTodo: Todo = {
      userId: 1, // TODO: get user id
      id:
        todosData.length > 0
          ? Math.max(...todosData.map((t: Todo) => t.id)) + 1
          : 1,
      title,
      completed: false,
    };

    todosData.push(newTodo);
    fs.writeFileSync(todosPath, JSON.stringify(todosData, null, 2));

    return NextResponse.json({ data: newTodo });
  } catch (error) {
    console.error("Error adding todo:", error);
    return NextResponse.json({ error: "Failed to add todo" }, { status: 500 });
  }
}
