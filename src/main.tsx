import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LoadScript } from "@react-google-maps/api";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
      libraries={["places"]}
    >
      <App />
    </LoadScript>
  </React.StrictMode>
);
