import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import PlanYourTrip from "./Components/PlanYourTrip.js";
import Home from "./Components/Home.js";
import Event from "./Components/Event.js";
import eventData from "./data/events.json";

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
        element:<Event props={eventData}/>
      },
      {
        path:"/plan-your-trip",
        element:<PlanYourTrip/>
      }
        
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={appRouter}>
  </RouterProvider>
);
