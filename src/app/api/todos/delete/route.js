import connectMongoDB from "../../../../libs/database";
import todos from "../../../model/todoModel";
import { NextResponse } from "next/server";

import { query } from "../../../../libs/database";

// signup
export async function POST(req) {
  const { todoId } = await req.json();
  try {
    // await connectMongoDB();
    // const deleted = await todos.findByIdAndDelete({ _id: todoId });

    // return (
    //   deleted && NextResponse.json({ message: "todoDeleted" }, { status: 201 })
    // );
    const deleteUser = await query({
      query: "DELETE FROM todos WHERE id = ?",
      values: [todoId],
    });
    const result = deleteUser.affectedRows;

    return result && NextResponse.json({ message: "success" }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}
