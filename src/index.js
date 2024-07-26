// import "bootstrap/dist/css/bootstrap.min.css";
// import React from "react";
// import ReactDOM from "react-dom/client";
// import Signup from "../src/Componaets/pages/Signup";
// import App from "./Componaets/App";
// import reportWebVitals from "./reportWebVitals";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./Componaets/pages/Home";
// import Login from "./Componaets/pages/Login";
// import Quiz from "./Componaets/pages/Quiz";
// import Result from "./Componaets/pages/Result";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/signup",
//     element: <Signup />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/quiz",
//     element: <Quiz />,
//   },
//   {
//     path: "/result",
//     element: <Result />,
//   },
//   {
//     path: "/home",
//     element: <Home />,
//   },
// ]);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Componaets/App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
