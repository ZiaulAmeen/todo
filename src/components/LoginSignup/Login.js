"use client";
import s from "./LoginSignup.module.css";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { enterUserId } from "../../app/redux/features/localStorageSlice";

export default function Login({ setSignUp }) {
  const [userNotFound, setUserNotFound] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignup = async (inputData) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: inputData.email,
          password: inputData.password,
        }),
      }).then(async (res) => {
        const data = await res.json();
        await dispatch(enterUserId(data.user_id));
        // localStorage.setItem("user_id", data.user_id);
        if (res.status == 201) {
          setUserNotFound(false);

          router.push("/homepage");
        } else {
          setUserNotFound(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formSchema = object({
    email: string()
      .email("*Follow email @ format")
      .required("*Enter email address"),
    password: string()
      .min(8, "Minimum 8 character")
      .required("*Password required"),
  });

  // - > intial user data
  const user_data = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: user_data,
    validationSchema: formSchema,
    onSubmit: (e) => {
      handleSignup(e);
    },
  });

  return (
    <div className={s.signupWrapper}>
      <h1 className={s.title} style={{ textAlign: "center" }}>
        Enter Details To Login
      </h1>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <div className={s.formRow}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></input>
          <span className="errorFormik">{formik.errors.email}</span>
        </div>
        <div className={s.formRow}>
          <label>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></input>
          <span className="errorFormik">
            {userNotFound ? <p>User Not Found</p> : formik.errors.password}
          </span>
        </div>
        <button type="submit">Signup</button>
      </form>
      <p style={{ textWrap: "nowrap", marginTop: "1vh" }}>
        Didn't have an account?{" "}
        <span
          style={{
            fontWeight: "600",
            color: "black",
            cursor: "pointer",
          }}
          onClick={() => setSignUp(true)}
        >
          Signup
        </span>
      </p>
    </div>
  );
}
