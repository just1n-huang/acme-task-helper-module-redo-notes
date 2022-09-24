import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTask } from "./store";
import { Link, useLocation } from "react-router-dom";

const Tasks = () => {
  const { tasks } = useSelector((state) => state);
  const dispatch = useDispatch();
  //   const location = useLocation();
  //   console.log(location);
  const { pathname } = useLocation();
  // console.log(pathname);

  let filtered = tasks;
  if (pathname === "/complete") {
    filtered = filtered.filter((task) => task.complete);
  }
  if (pathname === "/pending") {
    filtered = filtered.filter((task) => !task.complete);
  }

  return (
    <ul>
      {filtered.map((task) => {
        return (
          <li key={task.id}>
            <span
              className={task.complete ? "complete" : ""}
              onClick={() => dispatch(toggleTask(task))}
            >
              {" "}
              {task.name}
            </span>
            <Link to={`tasks/${task.id}`}>Edit</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Tasks;
