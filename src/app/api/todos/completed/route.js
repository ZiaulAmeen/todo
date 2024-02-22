import connectMongoDB from "../../../../libs/database";
import todos from "../../../model/todoModel";
import { NextResponse } from "next/server";

import { query } from "../../../../libs/database";

// signup
export async function PUT(req) {
  const { completed, completedId } = await req.json();
  try {
    // await connectMongoDB();
    // const Edited = await todos.findByIdAndUpdate(
    //   { _id: completedId },
    //   { completed }
    // );

    console.log(completed, completedId);
    const updateTodos = await query({
      query: "UPDATE todos SET completed = ? WHERE id = ?",
      values: [completed, completedId],
    });
    const result = updateTodos.affectedRows;
    // let message = "";
    // if (result) {
    //   message = "todoCompleted";
    // } else {
    //   message = "error";
    // }

    return (
      result && NextResponse.json({ message: "todoCompleted" }, { status: 201 })
    );
  } catch {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}
