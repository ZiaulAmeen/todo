"use client";
import s from "../../app/homepage/homepage.module.css";
import { MdOutlineEditCalendar } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const AddingTodo = ({ load, setLoad, setEdit, handleEdit, todos }) => {
  // console.log(todos[0]?.completed);
  async function handleDelete(e) {
    console.log(e);
    try {
      const res = await fetch(`http://localhost:3000/api/todos/delete`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          todoId: e,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      } else {
        alert("Todo Deleted Successfully");
        setLoad(!load);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCheck = async (checked, id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/todos/completed`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          completed: checked,
          completedId: id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      } else {
        if (checked) {
          alert("Todo Completed Successfully");
        } else {
          alert(" Todo Was Incomplete");
        }

        setLoad(!load);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={s.addTodoWrapper}>
      {todos &&
        todos.map((todos, i) => (
          <div className={s.newTodo} key={i}>
            <div className={s.flex}>
              <input
                type="checkbox"
                checked={
                  (todos.completed == 0 && false) ||
                  (todos.completed == 1 && true)
                }
                onClick={(e) => handleCheck(e.target.checked, todos.id)}
              ></input>
              <p className={`${todos.completed == 1 && s.lineThrough}`}>
                {todos.todo}
              </p>
            </div>
            <div className={`${s.flex} ${s.editDelete}`}>
              <MdOutlineEditCalendar
                onClick={() => {
                  handleEdit(i, todos.id);
                  setEdit(true);
                }}
              />
              <AiOutlineDelete onClick={() => handleDelete(todos.id)} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default AddingTodo;
