import Dashboard from "./pages/dashboard/dashboard";
import Users from "./pages/users/users";
import Vehicles from "./pages/vehicles/vehicles";
import Trips from "./pages/trips/trips";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
<<<<<<< Updated upstream
=======
import RegisterUser from "./components/RegisterUser/RegisterUser";
import RegisterVehicle from "./components/RegisterVehicle/RegisterVehicle";
import TripDetails from "./pages/tripDetails/tripDetails";
import EditVehicle from "./components/EditVehicle/EditVehicle";

>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    component: <Vehicles />,
=======
    children: [
      {
        path: "",
        element: <Vehicles />,
      },
      {
        path: "register",
        element: <RegisterVehicle />,
      },
      {
        path: "edit",
        element: <EditVehicle />
      }
    ],
>>>>>>> Stashed changes
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
