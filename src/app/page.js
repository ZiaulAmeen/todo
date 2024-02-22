"use client";
import s from "../components/LoginSignup/LoginSignup.module.css";
import BgImage from "../components/LoginSignup/bgImage";
import Signup from "../components/LoginSignup/Signup";
import { useState } from "react";
import Login from "@/components/LoginSignup/Login";

export default function Home() {
  const [signUp, setSignUp] = useState(false);

  return (
    <div className={s.container}>
      {signUp ? (
        <>
          <Signup setSignUp={setSignUp} />
          <BgImage />
        </>
      ) : (
        <>
          <BgImage />
          <Login setSignUp={setSignUp} />
        </>
      )}
    </div>
  );
}
