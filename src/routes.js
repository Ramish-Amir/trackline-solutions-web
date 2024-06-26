import Dashboard from "./pages/dashboard/dashboard";
import Users from "./pages/users/users";
import Vehicles from "./pages/vehicles/vehicles";
import Trips from "./pages/trips/trips";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import RegisterUser from "./components/RegisterUser/RegisterUser";
import RegisterVehicle from "./components/RegisterVehicle/RegisterVehicle";

export const routes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/users",
    children: [
      {
        path: "",
        element: <Users />,
      },
      {
        path: "register",
        element: <RegisterUser />,
      },
    ],
  },
  {
    path: "/vehicles",
    children: [
      {
        path: "",
        element: <Vehicles />,
      },
      {
        path: "register",
        element: <RegisterVehicle />,
      },
    ],
  },
  {
    path: "/trips",
    element: <Trips />,
  },
];

export const authRoutes = [
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/signup",
    element: <Signup />,
  },
];
