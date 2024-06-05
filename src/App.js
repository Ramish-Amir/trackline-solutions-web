import { Grid } from "@mui/material";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { authRoutes, routes } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { colors } from "./assets";

function App() {
  const user = true;
  return (
    <Router>
      {/* check if the user is logged in or not */}
      {user ? (
        <Grid container sx={{ bgcolor: colors.background }}>
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
    </Router>
    // <div className={"main-container"}>
    // <Grid container spacing={2}>
    //   <Grid item xs={2}>
    //     <Sidebar />
    //   </Grid>
    //   <Grid item xs={10}>
    //     <Sidebar />
    //   </Grid>
    // </Grid>
    //   {/* <div className="sidebar-container"></div> */}
    //   {/* <div className="page-container"></div> */}
    // </div>
  );
}

export default App;
