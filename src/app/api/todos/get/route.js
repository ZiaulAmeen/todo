import connectMongoDB from "../../../../libs/database";
import todos from "../../../model/todoModel";
import { NextResponse } from "next/server";

import { query } from "../../../../libs/database";

// signup
export async function POST(req) {
  const { user_id } = await req.json();
  console.log(user_id);
  try {
    // MONGODB //
    // await connectMongoDB();
    // const todo = await todos.find({});
    // const NewData = todo.map((todo) => {
    //   return {
    //     todo: todo.todo,
    //     id: todo._id,
    //     completed: todo.completed,
    //   };
    // });
    // return NextResponse.json({ todos: NewData }, { status: 201 });

    // MYSQL //
    const users = await query({
      query:
        "SELECT * FROM todos INNER JOIN users ON todos.user_id = users.user_id WHERE users.user_id = ?",
      values: [user_id],
    });

    // let data = JSON.stringify(users);
    return NextResponse.json({ todos: users }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}
