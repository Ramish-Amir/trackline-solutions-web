import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <LoadScript googleMapsApiKey="AIzaSyAmQ2WFmMKxZI8t7sh79U4Ryy0ZcmXta9s">
        <AuthProvider>
          <App />
        </AuthProvider>
      </LoadScript>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
