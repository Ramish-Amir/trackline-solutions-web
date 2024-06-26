import "./App.css";
import { authRoutes } from "./routes";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./layouts/Home/Home";

function App() {
  const auth = useContext(AuthContext);

  return (
    <>
      {/* check if the user is logged in or not */}
      {auth.currentUser ? (
        <Home />
      ) : (
        <Routes>
          {authRoutes?.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            ></Route>
          ))}
        </Routes>
      )}
    </>
  );
}

export default App;
