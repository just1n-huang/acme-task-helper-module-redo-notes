import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTask } from "./store";

const TaskCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const save = (ev) => {
    // prevent default behavior
    ev.preventDefault();
    dispatch(createTask({ name }, navigate));
  };
  return (
    <form onSubmit={save}>
      <input
        placeholder="enter name of task"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <button disabled={!name}>Create</button>
    </form>
  );
};

export default TaskCreate;

// prevent default form behavior
// add some local state for what the user enters into input
