"use client";
import { useFormik } from "formik";
import { object, string } from "yup";
import s from "../../app/homepage/homepage.module.css";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineEditCalendar } from "react-icons/md";
import { useSelector } from "react-redux";

const todoInput = ({
  setLoad,
  load,
  setEdit,
  edit,
  editId,
  todos,
  editingId, 
}) => {
  const [addTodo, setAddTodo] = useState("");

  const user_id = useSelector((state) => state.localStorage.user_id);
  const handleSubmit = async () => {
    const res = await fetch(`http://localhost:3000/api/todos/add`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        todo: addTodo,
        completed: false,
        user_id: user_id,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to update user");
    } else {
      alert("Todo Added Successfully");
      setAddTodo("");
      setLoad(!load);
    }
  };

  const handleEdit = async () => {
    const res = await fetch(`http://localhost:3000/api/todos/edit`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        todo: addTodo,
        editId: editingId,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to update user");
    } else {
      setAddTodo("");
      alert("Todo Edited Successfully");
      setLoad(!load);
      setEdit(false);
    }
  };

  const handleEditValue = () => {
    if (edit) {
      setAddTodo(todos[editId]?.todo);
    }
  };

  useEffect(() => {
    handleEditValue();
  }, [edit]);

  return (
    <div className={s.inputWrapper}>
      <input
        type="text"
        placeholder="Enter your task"
        id="todo"
        value={addTodo}
        onChange={(e) => setAddTodo(e.target.value)}
        // onBlur={formik.handleBlur}
      ></input>

      {edit ? (
        <div
          className={s.addNew}
          onClick={() => {
            handleEdit();
          }}
          style={{ backgroundColor: "lightgreen", color: "#ff5631" }}
        >
          <MdOutlineEditCalendar />
        </div>
      ) : (
        <div className={s.addNew} onClick={handleSubmit}>
          <FaPlus />
        </div>
      )}
    </div>
  );
};

export default todoInput;
