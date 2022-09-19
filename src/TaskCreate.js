import React from "react";
import { useDispatch } from "react-redux";
import { createTask } from "./store";

const TaskCreate = () => {
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(createTask({ name: Math.random() }))}>
      +
    </button>
  );
};

export default TaskCreate;
