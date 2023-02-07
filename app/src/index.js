import React from "react";
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,

  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import GlobalProvider from "./GlobalProvider";
import "./index.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GlobalProvider>
        <App />
      </GlobalProvider>
    ),
    errorElement: <Error />,
    children: [{
      index: true,
      element: (
        <Home />
      )
    },
    {
      path: "/login",
      element: (
        <Login />
      )
    }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);