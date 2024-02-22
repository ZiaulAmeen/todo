"use client";
import AddingTodo from "@/components/todopage/AddingTodo";
import s from "./homepage.module.css";
import TodoDetails from "@/components/todopage/todoDetails";
import TodoInput from "@/components/todopage/todoInput";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodo } from "../redux/features/todoSlice";
import { useRouter } from "next/navigation";

const homepage = () => {
  const [load, setLoad] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [editingId, setEditingId] = useState("");
  const dispatch = useDispatch();
  const router = useRouter()
  // const [todos, setTodos] = useState([]);

  // async function fetchData() {
  //   try {
  //     const user_id = localStorage.getItem("user_id");
  //     console.log(user_id);
  //     const res = await fetch(`http://localhost:3000/api/todos/get`, {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         user_id: user_id,
  //       }),
  //     });
  //     if (!res.ok) {
  //       throw new Error("Failed to update user");
  //     } else {
  //       const todo = await res.json();
  //       console.log(todo.todos);
  //       setTodos(todo.todos);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const user_id = useSelector((state) => state.localStorage.user_id);

  useEffect(() => {
    if(user_id === ''){
      router.push('/')
    }
    // redux thunk
    dispatch(fetchTodo(user_id));
  }, [load]);

  // redux thunk

  const todos = useSelector((state) => state.todos.todos);

  function handleEdit(i, id) {
    setEditId(i);
    setEditingId(id);
  }

  return (
    <div className={s.container}>
      <div className={s.todoWrapper}>
        <TodoDetails todos={todos} load={load} />
        <TodoInput
          setLoad={setLoad}
          load={load}
          setEdit={setEdit}
          edit={edit}
          editId={editId}
          todos={todos}
          editingId={editingId}
        />
        <AddingTodo
          load={load}
          setLoad={setLoad}
          setEdit={setEdit}
          handleEdit={handleEdit}
          todos={todos}
          // setTodos={setTodos}
        />
      </div>
    </div>
  );
};

export default homepage;
