import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App";
import {NotificationProvider}from "./context/NotificationContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <BrowserRouter>

      {/* TOASTER */}
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <NotificationProvider>
  <App />
</NotificationProvider>

    </BrowserRouter>

  </React.StrictMode>
);