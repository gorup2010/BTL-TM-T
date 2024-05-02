import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DataBaseProvider } from "./context/DatabaseProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataBaseProvider>
      <App />
    </DataBaseProvider>
  </React.StrictMode>
);
