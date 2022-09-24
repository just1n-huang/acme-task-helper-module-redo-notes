import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import axios from "axios";

// reducer must be a PURE function
// whatever you pass in does not get mutated
// no axios calls in here
const tasks = (state = [], action) => {
  if (action.type === "SET_TASKS") {
    state = action.tasks;
  }
  if (action.type === "UPDATE_TASK") {
    state = state.map((task) =>
      task.id === action.task.id ? action.task : task
    );
  }
  if (action.type === "CREATE_TASK") {
    state = [...state, action.task];
  }
  return state;
};

const reducer = combineReducers({
  tasks,
});

// update - toggle task
// this gets passed a task
export const toggleTask = (task) => {
  return async (dispatch) => {
    // closure allows us to access 'task'
    // console.log("update task", task);
    // axios.put to make updates
    const response = await axios.put(`/api/tasks/${task.id}`, {
      complete: !task.complete,
    });
    dispatch({ type: "UPDATE_TASK", task: response.data });
  };
};

export const createTask = (task, navigate) => {
  return async (dispatch) => {
    const response = await axios.post("/api/tasks/", task);
    dispatch({ type: "CREATE_TASK", task: response.data });
    navigate("/pending");
  };
};

export const updateTask = (task, navigate) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/tasks/${task.id}`, task);
    dispatch({ type: "UPDATE_TASK", task: response.data });
    navigate("/");
  };
};

// build the initial list
export const fetchTasks = () => {
  // thunks pattern
  // - call a function (to send data to it)
  // - pass some data in
  // - which returns another function which ends up being called
  // we need thunks for this to work - error: objects must be plain objects
  // thunks allow us to dispatch asynchronously & guides us to move logic closer to storern is a function that returns another function
  return async (dispatch) => {
    // console.log('get tasks and dispatch to store')
    const response = await axios.get("/api/tasks");
    dispatch({ type: "SET_TASKS", tasks: response.data });
    // console.log(response.data);
  };
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
