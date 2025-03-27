import { NextResponse } from "next/server";
import { TODOS } from "@/app/constants/todos";

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const todoIndex = TODOS.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return NextResponse.json(
        { error: `Todo with id ${id} not found` },
        { status: 404 }
      );
    }

    TODOS.splice(todoIndex, 1);

    return NextResponse.json({
      message: "Todo deleted successfully",
      data: TODOS,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete todo: ${error}` },
      { status: 500 }
    );
  }
}
