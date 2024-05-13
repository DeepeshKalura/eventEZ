import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from "./Components/Home.js";
import Event from "./Components/Event.js";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/events",
        element:<Event/>
      }
        
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={appRouter}>
  </RouterProvider>
);
