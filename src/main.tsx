import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import React from "react";
import { createRoot } from "react-dom/client"
import App from "./App";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/home", element: <PrivateRoute><App /></PrivateRoute> },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
