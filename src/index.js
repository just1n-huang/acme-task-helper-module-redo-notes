import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import store, { fetchTasks } from "./store";
import { Provider, useSelector, useDispatch } from "react-redux";
import Tasks from "./Tasks";
import TaskCreate from "./TaskCreate";
import { Link, HashRouter, Routes, Route, useLocation } from "react-router-dom";

// useSelector to get the data from the store
// subscription to the store is happening through react-redux
// react-redux also allows dispatching to the store
// take routes closer to the redux store via useEffect
// useDispatch is the only way to change the redux store

const App = () => {
  const { tasks } = useSelector((state) => state);
  const { pathname } = useLocation();
  console.log(pathname);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("fetch tasks");
    dispatch(fetchTasks());
    // create fetchTask in store.js
  }, []);
  return (
    <div>
      <h1>
        Acme Task Helper ({tasks.filter((task) => !task.complete).length}{" "}
        Incomplete)
      </h1>
      <nav>
        <Link to="/" className={pathname === "/" ? "selected" : ""}>
          All
        </Link>
        <Link
          to="/pending"
          className={pathname === "/pending" ? "selected" : ""}
        >
          Pending
        </Link>
        <Link
          to="/complete"
          className={pathname === "/complete" ? "selected" : ""}
        >
          Complete
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Tasks />}></Route>
        <Route path="/complete" element={<Tasks />}></Route>
        <Route path="/pending" element={<Tasks />}></Route>
      </Routes>
      <TaskCreate />
    </div>
  );
};

const root = createRoot(document.querySelector("#root"));

root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
