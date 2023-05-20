import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/Alunos/index";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Perfil from "./pages/Perfil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/perfil/:id",
    element: <Perfil />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
