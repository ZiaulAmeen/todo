import s from "../../../src/app/homepage/homepage.module.css";

const todoDetails = ({ todos, load }) => {
  let count = 0;
  const completed = todos?.map((todos) => {
    if (todos.completed == true) {
      count++;
    }
  });

  return (
    <div className={s.todoDetails}>
      <div className={s.todoDone}>
        <h3>TODO DONE</h3>
        <h5>Keep it up</h5>
      </div>
      <div className={s.circle}>{` ${count} / ${todos?.length} `}</div>
    </div>
  );
};

export default todoDetails;
