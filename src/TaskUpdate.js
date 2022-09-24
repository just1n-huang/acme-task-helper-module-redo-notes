import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateTask } from "./store";

const TaskUpdate = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state);
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const save = (ev) => {
    // prevent default behavior
    ev.preventDefault();
    dispatch(updateTask({ name, id }, navigate));
  };

  useEffect(() => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setName(task.name);
    }
  }, [tasks]); //dependency array

  return (
    <form onSubmit={save}>
      <input
        placeholder="enter name of task"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <button disabled={!name}>Update</button>
    </form>
  );
};

export default TaskUpdate;

// prevent default form behavior
// add some local state for what the user enters into input
