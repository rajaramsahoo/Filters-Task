import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Task from "./components/Task";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Task1 from "./components/Task1";
import NewTask from "./components/NewTask";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/task1" element={<Task1 />} />
        <Route path="/newtask" element={<NewTask />} />

        <Route path="/task" element={<Task />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
