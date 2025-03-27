import { NextResponse } from "next/server";
import { TODOS } from "@/app/constants/todos";

export async function POST(request: Request) {
  try {
    const { start = 0, limit = 10 } = await request.json();

    const paginatedTodos = TODOS.slice(start, start + limit);

    return NextResponse.json({
      data: paginatedTodos,
      total: TODOS.length,
      next: start + limit < TODOS.length ? start + limit : null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch todos ${error}` },
      { status: 500 }
    );
  }
}
