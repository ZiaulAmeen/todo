"use client";
import s from "./LoginSignup.module.css";
import { useFormik } from "formik";
import { object, string } from "yup";

const Signup = ({ setSignUp }) => {
  const handleSignup = async (inputData) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: inputData.name,
          email: inputData.email,
          password: inputData.password,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      } else {
        setSignUp(false);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(inputData);
  };

  const formSchema = object({
    name: string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid name")
      .min(5, "Minimum 5 characters")
      .required("*Enter name"),
    email: string()
      .email("*Follow email @ format")
      .required("*Enter email address"),
    password: string()
      .min(8, "Minimum 8 character")
      .required("*Password required"),
  });

  // - > intial user data
  const user_data = {
    name: "",
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
      <h1 className={s.title}>Get Started Now</h1>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <div className={s.formRow}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></input>
          <span className="errorFormik"> {formik.errors.name}</span>
        </div>
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
          <span className="errorFormik"> {formik.errors.password}</span>
        </div>
        <button type="submit">Signup</button>
      </form>
      <p style={{ textWrap: "nowrap", marginTop: "1vh" }}>
        Already have account?{" "}
        <span
          style={{
            fontWeight: "600",
            color: "black",
            cursor: "pointer",
          }}
          onClick={() => setSignUp(false)}
        >
          Log in
        </span>
      </p>
    </div>
  );
};

export default Signup;
