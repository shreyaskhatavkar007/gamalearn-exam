import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { createRoot } from "react-dom/client"
import App from "./App";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
