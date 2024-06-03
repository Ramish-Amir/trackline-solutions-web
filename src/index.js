import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Users from "./pages/users/users";
import Vehicles from "./pages/vehicles/vehicles";
import Trips from "./pages/trips/trips";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";

const root = ReactDOM.createRoot(document.getElementById("root"));

const routes = [
  {
    path: "/",
    component: <Dashboard />,
  },
  {
    path: "/users",
    component: <Users />,
  },
  {
    path: "/vehicles",
    component: <Vehicles />,
  },
  {
    path: "/trips",
    component: <Trips />,
  },
  {
    path: "/auth/login",
    component: <Login />,
  },
  {
    path: "/auth/signup",
    component: <Signup />,
  },
];

root.render(
  <React.StrictMode>
    <Router>
      <App />
      <Routes>
        {routes?.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.component}
          ></Route>
        ))}
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
