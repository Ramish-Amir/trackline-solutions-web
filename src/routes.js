import Dashboard from "./pages/dashboard/dashboard";
import Users from "./pages/users/users";
import Vehicles from "./pages/vehicles/vehicles";
import Trips from "./pages/trips/trips";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";

export const routes = [
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
];

export const authRoutes = [
  {
    path: "/auth/login",
    component: <Login />,
  },
  {
    path: "/auth/signup",
    component: <Signup />,
  },
];
