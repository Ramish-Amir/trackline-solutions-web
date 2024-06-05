import { Grid } from "@mui/material";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { authRoutes, routes } from "./routes";
import { Routes, Route, useNavigate } from "react-router-dom";
import { colors } from "./assets";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/auth/login");
    } else {
      navigate("/");
    }
  }, [auth.currentUser]);

  return (
    <>
      {/* check if the user is logged in or not */}
      {auth.currentUser ? (
        <Grid container spacing={2} sx={{ bgcolor: colors.background }}>
          <Grid item xs={2.5}>
            <Sidebar />
          </Grid>
          <Grid item xs={9.5} sx={{ p: "15px" }}>
            <Routes>
              {routes?.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.component}
                ></Route>
              ))}
            </Routes>
          </Grid>
        </Grid>
      ) : (
        <Routes>
          {authRoutes?.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.component}
            ></Route>
          ))}
        </Routes>
      )}
    </>
  );
}

export default App;
