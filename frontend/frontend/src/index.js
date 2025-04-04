import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Correct Import for React 18
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; 
import "./index.css";  // or "./App.css" if using App.css


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
