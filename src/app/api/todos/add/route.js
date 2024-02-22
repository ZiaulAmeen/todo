// import connectMongoDB from "../../../../libs/database";
import { query } from "../../../../libs/database";
// import todos from "../../../model/todoModel";
import { NextResponse } from "next/server";

// signup
export async function POST(req) {
  const { todo, completed, user_id } = await req.json();
  try {
    // await connectMongoDB();
    // await todos.create({ todo, completed });
    // return NextResponse.json({ message: "todoAdded" }, { status: 201 });
    const updateTodos = await query({
      query: "INSERT INTO todos (todo,completed,user_id) VALUES (?, ?, ?)",
      values: [todo, completed, user_id],
    });
    const result = updateTodos.affectedRows;
    let message = "";
    if (result) {
      message = "success";
    } else {
      message = "error";
    }

    return NextResponse.json({ message: message }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}
