import connectMongoDB from "../../../../libs/database";
import todos from "../../../model/todoModel";
import { NextResponse } from "next/server";

import { query } from "../../../../libs/database";

// signup
export async function POST(req) {
  const { todo, editId } = await req.json();
  try {
    // await connectMongoDB();
    // const Edited = await todos.findByIdAndUpdate({ _id: editId }, { todo });

    const updateTodos = await query({
      query: "UPDATE todos SET todo = ? WHERE id = ?",
      values: [todo, editId],
    });
    const result = updateTodos.affectedRows;
    return (
      result && NextResponse.json({ message: "todoEdited" }, { status: 201 })
    );
  } catch {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}

// export async function GET() {
//   await connectMongoDB();
//   const data = await users.find({});
//   return NextResponse.json({ data });
// }
