import bcrypt from "bcrypt";
// import connectMongoDB from "../../../../libs/database";
// import users from "../../../model/userModel";
import { NextResponse } from "next/server";
import { query } from "../../../../libs/database";

// signup
export async function POST(req, res) {
  const { email, password } = await req.json();
  // await connectMongoDB();
  // const checkUser = await users.findOne({ email });
  const getPassword = await query({
    query: "SELECT * FROM users WHERE email = ?",
    values: [email],
  });
  const storedPassword = getPassword[0];

  const isMatch = await bcrypt.compare(
    password,
    storedPassword.password.toString()
  );

  if (isMatch) {
    return NextResponse.json(
      { message: "verified", user_id: storedPassword.user_id },
      { status: 201 }
    );
  } else {
    return NextResponse.json({ message: "userNotFound" }, { status: 400 });
  }
}
