import bcrypt from "bcrypt";
// const bcrypt = require("bcrypt");
// import connectMongoDB from "../../../../libs/database";
import users from "../../../model/userModel";
import { NextResponse } from "next/server";

import { query } from "../../../../libs/database";

// signup
export async function POST(req) {
  const { name, email, password } = await req.json();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // await connectMongoDB();
    // await users.create({ name, email, password: hashedPassword });
    // return NextResponse.json({ message: "userAdded" }, { status: 201 });
    const updateUsers = await query({
      query: "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      values: [name, email, hashedPassword],
    });
    const result = updateUsers.affectedRows;

    return (
      result && NextResponse.json({ message: "userAdded" }, { status: 201 })
    );
  } catch {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}
